//SPDX-License-Identifier: GPL-2.0
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract Kekigible is ERC1155("localhost:8000/product/{id}.json") {

    // TODO:
    // - figure out memory/storage optimisations
    // - warranty boolean
    // - modify `safeTransferFrom` according to warranty boolean, ban checks, decaying NFT
    // - decaying NFT
    //   - How many times can warranty be availed?
    //   - Details of times when warranty was availed (should be in backend ig???)
    //     - Backend should be checking blockchain as source of truth so ig so
    
    // apparently solidity works better with 256, using smaller datatype leads to more cost
    uint256 public LoyaltyToken = 0; //ID of loyalty token, only token that is non-fungible
    mapping (address => bool) public Admins;
    mapping (address => bool) public CertifiedMinters;
    mapping (address => bool) public BannedAccounts; // could be both company/user

    constructor(){
        Admins[msg.sender] = true;
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

    ////////////////////////////////////////////////////////////////////////////

    function test() onlyAdmin public view returns(bool){
        return true;
    }

}
