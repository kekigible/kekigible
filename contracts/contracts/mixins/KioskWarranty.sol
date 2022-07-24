//SPDX-License-Identifier: GPL-2.0
pragma solidity ^0.8.9;
import "./KekAccessControl.sol";

abstract contract KioskWarranty is KekAccessControl {
    
    /////////////////////////Events//////////////////////////////////
    event UpdatedWarranty(uint256 indexed id, int times, uint timestamp);
    event RequestWarranty(uint256 indexed id, address indexed requester);
    event RespondWarranty(uint256 indexed id);
    event CloseWarranty(uint256 indexed id, address indexed closer, int newTimes);
    
    // Is the product soulbound
    bool public immutable soulbound;
    // Will the warranty be void if product is resold?
    bool public immutable voidWhenSold;

    /**
     * @dev Struct to store metadata of each NFT
     */
    struct NFTMetadata {
        int times; //-1 = not valid, -2 = (times = infinity)
        bool decay; //should NFT be also invalid if warranty is decayed?
        uint timestamp; //timestamp till which warranty valid
        bool applied;  //don't know if needed or not
        // address minter; //probably not needed
    }

    mapping (uint256 => NFTMetadata) public Warranties; // ID -> NFTMetadata

    constructor(bool _soulbound, bool _voidWhenSold){
        soulbound = _soulbound;
        voidWhenSold = _voidWhenSold;
    }

    /**
     * @dev Update warranty parameters, like the new timestamp or the number of times one can avail
     */
    function updateWarranty(uint256 id, int times, uint timestamp) payable public onlyMinter {
        // BAN CHECK DONE IN BACKEND
        Warranties[id].times = times;
        Warranties[id].timestamp = timestamp;
        emit UpdatedWarranty(id, times, timestamp);
    }

    /**
     * @dev Update warranty parameters, like the new timestamp or the number of times one can avail
     * CHECK IF THE CONTRACT CALLING THIS ACTUALLY OWNS THE TOKEN OR NOT
     */
    function requestWarranty(uint256 id) public onlyNonBanned {
        // Not operator friendly
        // Check in the calling smart contract if _msgSender() actually owns this ID or not
        require(Warranties[id].times > 0 || Warranties[id].times == -1, "Cannot avail warranty service!");
        require(block.timestamp < Warranties[id].timestamp, "Your NFT has decayed!");
        Warranties[id].applied = true;
        emit RequestWarranty(id, msg.sender);
    }

    /**
     * @dev Respond and update to a warranty ticket
     */
    function respondWarranty(uint256 id) public onlyMinter {
        require(Warranties[id].applied, "Customer hasn't applied for NFT yet!");
        emit RespondWarranty(id);
    }

    /**
     * @dev Close the warranty ticket (by the user)
     * CHECK IF THE CONTRACT CALLING THIS ACTUALLY OWNS THE TOKEN OR NOT
     */
    function closeWarranty(uint256 id) public onlyNonBanned {
        // is this function operator friendly?
        // Check in the calling smart contract if _msgSender() actually owns this ID or not
        require(Warranties[id].times != -1, "Warranty expired!");
        require(Warranties[id].applied, "You haven't applied for NFT yet!");
        if(Warranties[id].times != -2){
            Warranties[id].times--;
        }
        emit CloseWarranty(id, msg.sender, Warranties[id].times);
    }


}