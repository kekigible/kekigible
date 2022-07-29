//SPDX-License-Identifier: GPL-2.0
pragma solidity ^0.8.9;

// import "./mixins/KekAccessControl.sol";
import "./KekToken.sol";
import "./KioskERC1155.sol";

/**
 * @title Kekigible Protocol Kiosk Smart Contract
 * @author Shatabarto Bhattacharya
 * Purpose of this smart contract is basically to
 * 1) create slave smart contracts for each sale that can be disabled when sale is up
 * 2) maintain the economy of the whole system. (i.e. loyalty tokens will be published by this contract)
 * 3) keep track of loyalty tokens published (KEK)
 *  3.1) Keeping constant minting for now, although not valid irl, since price would decrease
 */



contract Factory is KekAccessControl {
    address[] public kiosks;

    function create(bool _soulbound, bool _voidWhenSold, uint256 _supply, uint256 _BuyBlock, uint256 _price, int _times, bool _decay, uint _timedelta, address _trustedForwarder) onlyAdmin public virtual returns(address) {
        KioskERC1155 newKiosk = new KioskERC1155(
            _soulbound,
            _voidWhenSold,
            _supply,
            _BuyBlock,
            _price,
            _times,
            _decay,
            _timedelta,
            _trustedForwarder
        );
        kiosks.push(address(newKiosk));
        return address(newKiosk);
    }

    /**
     * @dev Pump money into the contract so more contracts can be generated for sale
     */
    receive() external payable {}

}