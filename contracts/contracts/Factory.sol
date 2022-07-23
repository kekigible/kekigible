//SPDX-License-Identifier: GPL-2.0
pragma solidity ^0.8.9;

/**
 * @title Kekigible Protocol Kiosk Smart Contract
 * @author Shatabarto Bhattacharya
 * Purpose of this smart contract is basically to
 * 1) create slave smart contracts for each sale that can be disabled when sale is up
 * 2) maintain the economy of the whole system. (i.e. loyalty tokens will be published by this contract)
 * 3) keep track of loyalty tokens published (KEK)
 *  3.1) Keeping constant minting for now, although not valid irl, since price would decrease
 */

import "./mixins/KekToken.sol";

contract Factory is KekToken {
    constructor(uint256 supply) KekToken(supply) {
        // Nothing here yet
    }

    // function create() onlyRole(keccak256('DEFAULT_ADMIN_ROLE')) public {}

    /**
     * @dev Pump money into the contract so more contracts can be generated for sale
     */
    function receive() external payable {}
}