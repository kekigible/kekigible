//SPDX-License-Identifier: GPL-2.0
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";
// import "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import "@openzeppelin/contracts/utils/Context.sol";

contract KekAccessControl is Context, AccessControl {
    /**
     * @dev KekAccessControl
     * Plan is to put ERC2771 here, since this will be at the tip of
     * Inheritance tree for most of the contracts, since almost all 
     * Contracts will need the following functions
     */
    bytes32 public constant MINTER = keccak256("MINTER");
    bytes32 public constant PAUSER = keccak256("PAUSER");
    bytes32 public constant BANNED = keccak256("BANNED");

    constructor(){
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setupRole(MINTER, _msgSender());
        _setupRole(PAUSER, _msgSender());
        // not needed, but an official way to put banned role in state mem
        // not needed, I Believe. a possible TODO to save gas
        _setRoleAdmin(BANNED, DEFAULT_ADMIN_ROLE);
    }

    //////////////////////////modifiers/////////////////////////////

    /**
     * @dev modifier to make sure that caller is admin
     */
    modifier onlyAdmin {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "Kekigible: Not an admin");
        _;
    }

    /**
     * @dev modifier to make sure that caller is pauser
     */
    modifier onlyPauser {
        require(hasRole(PAUSER, _msgSender()), "Kekigible: Not an pauser");
        _;
    }

    /**
     * @dev modifier to make sure that caller is minter
     */
    modifier onlyMinter {
        require(hasRole(MINTER, _msgSender()), "Kekigible: Not an minter");
        _;
    }

    /**
     * @dev modifier to make sure that caller is not banned
     */
    modifier onlyNonBanned {
        require(!hasRole(BANNED, _msgSender()), "Kekigible: Banned");
        _;
    }
}