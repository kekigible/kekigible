//SPDX-License-Identifier: GPL-2.0
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
// import "hardhat/console.sol";

contract Kekigible is ERC1155("localhost:8000/product/{id}.json"), AccessControl {
    //using Roles for Roles.Role;

    // TODO:
    // - figure out memory/storage optimisations
    // x sell to each other boolean (soulbound) (part of warranty struct)
    // x modify `safeTransferFrom` according to warranty boolean, ban checks, decaying NFT
    // x Create struct represting warranty
    // x decaying NFT
    //   x How many times can warranty be availed?
    //   x Details of times when warranty was availed (should be in backend ig???)
    //     x Backend should be checking blockchain as source of truth so ig so
    // - public functions to external, when done

    // x function to buy warranty time and warranty times
    // x Only customer can set applied to true and false, company can only detect custom event
    // x Company can however call a function that will trigger events to let user know that something was done (source of truth)
    
    // apparently solidity works better with 256, using smaller datatype leads to more cost
    mapping (uint256 => NFTMetadata) public Warranties; // ID -> NFTMetadata

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIDs;

    bytes32 public constant MINTER = keccak256("MINTER");
    bytes32 public constant BANNED = keccak256("BANNED");

    struct NFTMetadata {
        int times; //-1 = not valid, -2 = (times = infinity)
        bool decay; //should NFT be also invalid if warranty is decayed?
        uint timestamp; //timestamp till which warranty valid
        bool voidWhenSold;
        bool soulBound;
        bool applied;  //don't know if needed or not
        address minter;
    }


    constructor(){
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(MINTER, msg.sender);
        _setRoleAdmin(BANNED, MINTER); //minters can ban people
    }

    ///////////////////////////Overrides////////////////////////////////////

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) internal virtual override(ERC1155) {
        if(from != 0x0000000000000000000000000000000000000000){
            for(uint i = 0; i < ids.length ; i++) {
                require(!(Warranties[ids[i]].soulBound), "Cannot be transferred since this is a soulBound NFT!");
                require(!(Warranties[ids[i]].applied), "Cannot transfer when applied for warranty");
                if(Warranties[ids[i]].decay){
                    require(block.timestamp < Warranties[ids[i]].timestamp, "Your NFT has decayed!");
                }
                if(Warranties[ids[i]].voidWhenSold){
                    Warranties[ids[i]].times = -1;  // no longer valid
                    emit UpdatedWarranty(ids[i], -1, Warranties[ids[i]].timestamp);
                }
            }
        }
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    /////////////////////////////////Modifiers////////////////////////////////

    modifier onlyAdmin{
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "This is Admin Only!");
        _;
    }

    modifier onlyNonBanned{
        require(!(hasRole(BANNED, msg.sender)), "You have been banned, contact admin!");
        _;
    }

    modifier onlyMinters{
        require(hasRole(MINTER, msg.sender), "You are not certified to mint!");
        _;
    }


    function mint(
        address account,
        bytes memory data,
        int times,
        bool decay,
        uint timestamp,
        bool voidWhenSold,
        bool soulBound
        ) payable public onlyMinters returns(uint256) {
            require(!(hasRole(BANNED, account)), "Address is banned!");
            _tokenIDs.increment();
            uint256 id = _tokenIDs.current();
            Warranties[id] = NFTMetadata(
                times,
                decay,
                timestamp,
                voidWhenSold,
                soulBound,
                false,  //no one would apply for warranty service during buy
                msg.sender
            );

            _mint(account, id, 1, data);    
            emit UpdatedWarranty(id, times, timestamp);
            return id;
    }

    // Remove onlyMinters to save gas???
    function updateWarranty(uint256 id, int times, uint timestamp) payable public onlyMinters {
        // BAN CHECK DONE IN BACKEND
        require(Warranties[id].minter == msg.sender, "Only the minter of the NFT can call this function");
        Warranties[id].times = times;
        Warranties[id].timestamp = timestamp;
        emit UpdatedWarranty(id, times, timestamp);
    }

    function requestWarranty(uint256 id) public onlyNonBanned {
        // is this function operator friendly?
        require(balanceOf(msg.sender, id) > 0 , "Not owner of said token!");
        require(Warranties[id].times > 0 || Warranties[id].times == -1, "Cannot avail warranty service!");
        require(block.timestamp < Warranties[id].timestamp, "Your NFT has decayed!");
        Warranties[id].applied = true;
        emit RequestWarranty(id, msg.sender);
    }

    // Remove onlyMinters to save gas???
    function respondWarranty(uint256 id) public onlyMinters {
        require(Warranties[id].minter == msg.sender, "Only minter of the token can call this!");
        require(Warranties[id].applied, "Customer hasn't applied for NFT yet!");
        emit RespondWarranty(id);
    }

    function closeWarranty(uint256 id) public onlyNonBanned {
        // is this function operator friendly?
        require(balanceOf(msg.sender, id) > 0 , "Not owner of said token!");
        require(Warranties[id].times != -1, "Warranty expired!");
        require(Warranties[id].applied, "You haven't applied for NFT yet!");
        if(Warranties[id].times != -2){
            Warranties[id].times--;
        }
        emit CloseWarranty(id, msg.sender, Warranties[id].times);
    }

    /////////////////////////Events//////////////////////////////////
    event UpdatedWarranty(uint256 indexed id, int times, uint timestamp);
    event RequestWarranty(uint256 indexed id, address indexed requester);
    event RespondWarranty(uint256 indexed id);
    event CloseWarranty(uint256 indexed id, address indexed closer, int newTimes);
}
