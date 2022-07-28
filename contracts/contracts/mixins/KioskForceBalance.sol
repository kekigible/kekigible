//SPDX-License-Identifier: GPL-2.0
pragma solidity ^0.8.9;

/**
 * @dev purpose of this contract is to make sure
 * a user only gets to buy a certain number of tokens
 */
abstract contract KioskForceBalance {
    /**
     * @dev BuyBlock as the name suggests is the block
     * placed on the user. mapping keeps count of number of buys
     */
    uint256 public BuyBlock;
    mapping(address => uint256) public KeepCount;

    constructor(uint256 _BuyBlock) {
        BuyBlock = _BuyBlock;
    }

    function _updateBuy(address buyer) internal {
        // NOTE: INTERNAL FUNCTION CALL ONLY AFTER CHECKING
        KeepCount[buyer] = KeepCount[buyer]+1;
    }

    modifier canBuy(address buyer) {
        require(KeepCount[buyer]+1 <= BuyBlock, "Buy Block");
        _;
    }
}