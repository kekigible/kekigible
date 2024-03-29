//SPDX-License-Identifier: GPL-2.0
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import "./mixins/KioskWarranty.sol";
import "./mixins/KioskForceBalance.sol";

/**
 * @dev This contract right here will be the backbone of the kiosk
 * kiosk is essentially a minting contract, hence either erc721 or
 * erc1155. With additional facilities for managing warranty
 */
contract KioskERC1155 is ERC2771Context, ERC1155, KioskWarranty, KioskForceBalance, ReentrancyGuard {

    using ECDSA for bytes32;
    // Number of NFTs minted
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIDs;
    // Counters.Counter private _sold;
    uint256 public price;

    // address public immutable FactoryAddress;
    uint256 public supply;

    constructor(bool _soulbound, bool _voidWhenSold, uint256 _supply, uint256 _BuyBlock, uint256 _price, int _times, bool _decay, uint _timedelta, address _trustedForwarder)
        ERC2771Context(_trustedForwarder)
        ERC1155("localhost:8000/product/{id}.json")
        KioskWarranty(_soulbound, _voidWhenSold, _times, _decay, _timedelta)
        KioskForceBalance(_BuyBlock) {
        supply = _supply;
        BuyBlock = _BuyBlock;
        price = _price;
    }

    function _msgSender() internal view virtual override(ERC2771Context, Context) returns (address) {
        return ERC2771Context._msgSender();
    }

    function _msgData() internal view virtual override(ERC2771Context, Context) returns (bytes calldata) {
        return ERC2771Context._msgData();
    }

    function mint() canBuy(_msgSender()) onlyNonBanned nonReentrant payable public {
        require(_tokenIDs.current() < supply, "All sold out");
        require(msg.value >= price, "Not enough to buy");
        _tokenIDs.increment();
        uint256 id = _tokenIDs.current();
        Warranties[id].timestamp = block.timestamp + Warranties[id].timestamp;
        _mint(_msgSender(), id, 1, '0x00');
        _updateBuy(_msgSender());
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function humanFirst(bytes32 hash, bytes memory signature) public view returns(bool) {
        return hash.recover(signature) == _msgSender();
    }

    
    /**
     * @dev Implementation of `_beforeTokenTransfer` hook for ERC1155. OpenZeppelin calls this function before any kind of transaction
     * and even minting. The only tweak I can do to make sure that minting happens without any checks is making sure that it's not from
     * 0x0000...
     */
    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) internal virtual override(ERC1155) {
        if(from != 0x0000000000000000000000000000000000000000){
            for(uint i = 0; i < ids.length ; i++) {
                require(!(soulbound), "Cannot be transferred since this is a soulBound NFT!");
                require(!(Warranties[ids[i]].applied), "Cannot transfer when applied for warranty");
                if(Warranties[ids[i]].decay){
                    require(block.timestamp < Warranties[ids[i]].timestamp, "Your NFT has decayed!");
                }
                if(voidWhenSold){
                    Warranties[ids[i]].times = -1;  // no longer valid
                    emit UpdatedWarranty(ids[i], -1, Warranties[ids[i]].timestamp);
                }
            }
        }
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
    /**
     * @dev Pump money into the contract so more contracts can be generated for sale
     */
    receive() external payable {}
}