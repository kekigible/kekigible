//SPDX-License-Identifier: GPL-2.0
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Kekigible is ERC1155("localhost:8000/product/{id}.json"), AccessControl {
    //using Roles for Roles.Role;

    // TODO:
    // - figure out memory/storage optimisations
    // - warranty boolean
    // - sell to each other boolean (soulbound) (part of warranty struct)
    // - modify `safeTransferFrom` according to warranty boolean, ban checks, decaying NFT
    // - Create struct represting warranty
    // - decaying NFT
    //   - How many times can warranty be availed?
    //   - Details of times when warranty was availed (should be in backend ig???)
    //     - Backend should be checking blockchain as source of truth so ig so
    // - public functions to external, when done
    
    // apparently solidity works better with 256, using smaller datatype leads to more cost
    // uint256 public constant LOYALTY_TOKEN = 0; //ID of loyalty token, only token that is non-fungible
    mapping (uint256 => NFTMetadata) public Warranties; // ID -> NFTMetadata

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIDs;

    bytes32 public constant MINTER = keccak256("MINTER");
    bytes32 public constant BANNED = keccak256("BANNED");

    struct NFTMetadata {
        int times; //negative means no longer valid
        bool decay; //should NFT be also invalid if warranty is decayed?
        uint timestamp; //timestamp till which warranty valid
        bool voidWhenSold;
        bool soulBound;
        bool applied;  //don't know if needed or not
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

    function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes memory data) public virtual override(ERC1155) {
        // is there any internal before mint function?
        require(!(Warranties[id].soulBound), "Cannot be transferred since this is a soulBound NFT!");
        require(!(Warranties[id].applied), "Cannot transfer when applied for warranty");
        if(Warranties[id].voidWhenSold){
            Warranties[id].times = -1;  // no longer valid
        }
        if(Warranties[id].decay){
            require(block.timestamp < Warranties[id].timestamp, "Your NFT has decayed!");
        }
        super.safeTransferFrom(from, to, id, amount, data);
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
        ) payable public onlyMinters {
            require(!(hasRole(BANNED, account)), "Address is banned!");
            _tokenIDs.increment();
            uint256 id = _tokenIDs.current();
            Warranties[id] = NFTMetadata(
                times,
                decay,
                timestamp,
                voidWhenSold,
                soulBound,
                false  //no one would apply for warranty service during buy
            );

            _mint(account, id, 1, data);    
    }

    // function reward(address account, uint256 amount, bytes memory data) public {
    //     require(!(hasRole(BANNED, account)), "Address is banned!");
    //     _mint(account, LOYALTY_TOKEN, amount, data);
    // }
}
