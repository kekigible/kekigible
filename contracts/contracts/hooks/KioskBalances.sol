//SPDX-License-Identifier: GPL-2.0
pragma solidity ^0.8.9;

import "../mixins/KekAccessControl.sol";

/**
 * @dev This contract is an independent contract that will be used to keep track
 * of balances of different kiosks. Will be very easy for API related stuff and
 * for future expansion of the protocol.
 * Note: should be deployed independently
 */
contract KioskBalances is KekAccessControl {
    
}