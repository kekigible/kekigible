//SPDX-License-Identifier: GPL-2.0
pragma solidity ^0.8.9;

import "../mixins/KekAccessControl.sol";

/**
 * @dev This contract is an independent contract that will be used to keep track
 * of balances of different kiosks. Will be very easy for API related stuff and
 * for future expansion of the protocol.
 * Note: should be deployed independently, also, I don't think this contract needs
 * to be aware of the factory contract
 */

 // Needs reentrancy
contract KioskBalances is KekAccessControl {
    /**
     * @dev this mapping would store kiosk -> buyer -> token IDs he owns
     */
    mapping(address => mapping(address => uint256[])) public ERC1155Records;
    address[] private kiosks;

    event ERC1155RecordUpdated(address indexed kiosk, address indexed buyer, uint256 indexed tokenID);
    event ShopRecord(address indexed kiosk);

    function addERC1155Record(address kiosk, address buyer, uint256 tokenID) onlyAdmin public {
        ERC1155Records[kiosk][buyer].push(tokenID);
        emit ERC1155RecordUpdated(kiosk, buyer, tokenID);
    }

    function addKiosk(address kiosk) onlyAdmin public {
        kiosks.push(kiosk);
        emit ShopRecord(kiosk);
    }

}