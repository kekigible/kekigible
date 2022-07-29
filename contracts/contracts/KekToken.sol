//SPDX-License-Identifier: GPL-2.0
pragma solidity ^0.8.9;

import "./mixins/KekAccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";

/**
 * @dev KekToken
 * This is a token that will be used as loyalty tokens in the kekigible network.
 * It has Context (eventual overriding by gas station network) and some other
 * OpenZeppelin goodies
 */
contract KekToken is KekAccessControl, ERC20Pausable {


    constructor() ERC20("KekToken", "KEK") {
    }

    ///////////////////////////////Pause Related stuff/////////////////////////////////
    /**
     * @dev Pauses all token transfers.
     */
    function pause() onlyPauser public virtual {
        _pause();
    }

    /**
     * @dev Unpauses all token transfers.
     */
    function unpause() onlyPauser public virtual {
        _unpause();
    }

    //////////////////////Mint Related Stuff////////////////////////////////////////////

    /**
     * @dev function mints tokens to the `to` address
     */
    function mint(address to, uint256 amount) onlyMinter public virtual {
        _mint(to, amount);
    }

    // Don't mess with the overriden functions below, they were changed in their parent contracts
    // function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual override(IERC20, ERC20Pausable) {
    //     super._beforeTokenTransfer(from, to, amount);
    // }

    // function _mint(address account, uint256 amount) internal virtual override(ERC20, ERC20Capped) {
    //     super._mint(account, amount);
    // }

}