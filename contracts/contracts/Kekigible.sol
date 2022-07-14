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
    // - msg.sender to _msg.sender
    
    // apparently solidity works better with 256, using smaller datatype leads to more cost
    uint256 public constant LOYALTY_TOKEN = 0; //ID of loyalty token, only token that is non-fungible
    mapping (uint256 => NFTMetadata) public Warranties; // ID -> NFTMetadata

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIDs;

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
        //uint256 id,
        bytes memory data,
        int times,
        bool decay,
        string memory productName,
        string memory productDescription,
        uint timestamp,
        bool voidWhenSold,
        bool soulBound,
        bool applied
        ) payable public onlyMinters {
            require(!(hasRole(BANNED, account)), "Address is banned!");
            _tokenIDs.increment();
            uint256 id = _tokenIDs.current();
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

            _mint(account, id, 1, data);    
    }

    function reward(address account, uint256 amount, bytes memory data) public {
        require(!(hasRole(BANNED, account)), "Address is banned!");
        _mint(account, LOYALTY_TOKEN, amount, data);
    }

    // function mintWithReward(
    //     address account,
    //     // uint256 id,
    //     bytes memory data,
    //     int times,
    //     bool decay,
    //     string memory productName,
    //     string memory productDescription,
    //     uint timestamp,
    //     bool voidWhenSold,
    //     bool soulBound,
    //     bool applied,
    //     uint256 rewardAmount
    //     ) payable public onlyMinters {
    //         require(!(hasRole(BANNED, account)), "Address is banned!");
    //         _tokenIDs.increment();
    //         uint256 id = _tokenIDs.current();
    //         Warranties[id] = NFTMetadata(
    //             times,
    //             decay,
    //             productName,
    //             productDescription,
    //             timestamp,
    //             voidWhenSold,
    //             soulBound,
    //             applied
    //         );

    //         // _mint(account, id, amount, data);    
    //         uint256[] storage IDs;
    //         uint256[] storage AMOUNTS;
    //         IDs.push(LOYALTY_TOKEN);
    //         IDs.push(id);
    //         AMOUNTS.push(rewardAmount);
    //         AMOUNTS.push(1);
    //         _mintBatch(account, IDs, AMOUNTS, data);
    // }



    ////////////////////////////////////////////////////////////////////////////

    function test() onlyAdmin public view returns(bool){
        return true;
    }

}
