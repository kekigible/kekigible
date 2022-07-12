//SPDX-License-Identifier: GPL-2.0
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
//import "@openzeppelin/contracts/access/Roles.sol";

contract Kekigible is ERC1155("localhost:8000/product/{id}.json") {
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
    // - msg.sender to _msgSender()
    
    // apparently solidity works better with 256, using smaller datatype leads to more cost
    uint256 public constant LoyaltyToken = 0; //ID of loyalty token, only token that is non-fungible
    mapping (address => bool) public Admins;
    mapping (address => bool) public CertifiedMinters;
    mapping (address => bool) public BannedAccounts; // could be both company/user
    mapping (uint256 => NFTMetadata) public Warranties; // ID -> NFTMetadata

    //Roles.Role private _minters;
    //Roles.Role private _bannedAccounts;

    struct NFTMetadata {
        int times; //negative means no longer valid
        string productName;
        string productDescription;
        uint timestamp; //timestamp till which warranty valid
        bool voidWhenSold;
        bool soulBound;
        bool applied;  //don't know if needed or not
    }


    constructor(){
        Admins[msg.sender] = true;
        CertifiedMinters[msg.sender] = true;
    }

    /////////////////////////////////Modifiers////////////////////////////////

    modifier onlyAdmin{
        require(Admins[msg.sender], "This is Admin Only!");
        _;
    }

    modifier onlyNonBanned{
        require(!(BannedAccounts[msg.sender]), "You have been banned, contact admin!");
        _;
    }

    modifier onlyCertifiedMinters{
        require(CertifiedMinters[msg.sender], "You are not certified to mint!");
        _;
    }

    ///////////////////////////////Utility Functions//////////////////////////

    function isAdmin(address _query) public view returns(bool) {
        return Admins[_query];
    }

    function isBanned(address _query) public view returns(bool) {
        return BannedAccounts[_query];
    }

    function isCertifiedMinter(address _query) public view returns(bool) {
        return CertifiedMinters[_query];
    }

    function addAdmin(address newAdmin) onlyAdmin public {
        Admins[newAdmin] = true;
    }

    function addCertifiedMinter(address newMinter) onlyAdmin public {
        CertifiedMinters[newMinter] = true;
    }

    function ban(address someDude) onlyAdmin public {
        BannedAccounts[someDude] = true;
    }

    ///////////////////////////////extension of ERC-1199 functions//////////////////

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data,
        int times,
        string memory productName,
        string memory productDescription,
        uint timestamp,
        bool voidWhenSold,
        bool soulBound,
        bool applied
        ) public onlyCertifiedMinters {
            Warranties[id] = NFTMetadata(
                times,
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
