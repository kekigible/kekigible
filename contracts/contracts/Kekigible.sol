//SPDX-License-Identifier: GPL-2.0
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
//import "@openzeppelin/contracts/access/Roles.sol";

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
    // - msg.sender to _msg.sender
    
    // apparently solidity works better with 256, using smaller datatype leads to more cost
    uint256 public constant LoyaltyToken = 0; //ID of loyalty token, only token that is non-fungible
    // mapping (address => bool) public Admins;
    // mapping (address => bool) public CertifiedMinters;
    // mapping (address => bool) public BannedAccounts; // could be both company/user
    mapping (uint256 => NFTMetadata) public Warranties; // ID -> NFTMetadata

    //Roles.Role private _minters;
    //Roles.Role private _bannedAccounts;

    bytes32 public constant MINTER = keccak256("MINTER");
    bytes32 public constant BANNED = keccak256("BANNED");

    struct NFTMetadata {
        int times; //negative means no longer valid
        bool decay; //should NFT be also invalid if warranty is decayed?
        string productName;
        string productDescription;
        uint timestamp; //timestamp till which warranty valid
        bool voidWhenSold;
        bool soulBound;
        bool applied;  //don't know if needed or not
    }


    constructor(){
        // Admins[msg.sender] = true;
        // CertifiedMinters[msg.sender] = true;

        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(MINTER, msg.sender);
        _setRoleAdmin(BANNED, MINTER); //minters can ban people
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    /////////////////////////////////Modifiers////////////////////////////////

    modifier onlyAdmin{
        // require(Admins[msg.sender], "This is Admin Only!");
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
        uint256 id,
        uint256 amount,
        bytes memory data,
        int times,
        bool decay,
        string memory productName,
        string memory productDescription,
        uint timestamp,
        bool voidWhenSold,
        bool soulBound,
        bool applied
        ) public onlyMinters {
            require(!(hasRole(BANNED, account)), "Address is banned!");
            Warranties[id] = NFTMetadata(
                times,
                decay,
                productName,
                productDescription,
                timestamp,
                voidWhenSold,
                soulBound,
                applied
            );

            _mint(account, id, amount, data);    
    }

    ////////////////////////////////////////////////////////////////////////////

    function test() onlyAdmin public view returns(bool){
        return true;
    }

}
