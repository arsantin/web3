//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract BuyMeACoffee {
    //Event to emit when a Memo is created
    event NewMemo(address from, uint256 timestamp, string name, string message);

    //Memo struct
    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    //List of all memos received from friends
    Memo[] memos;

    //Owner address
    address payable owner;

    //Deploy logic
    constructor() {
        owner = payable(msg.sender);
    }

    function buyCoffee(
        string memory _name,
        string memory _message
    ) public payable {
        require(msg.value > 0, "Not enought ethers to send a coffee.");

        //Add a memo to storage
        memos.push(Memo(msg.sender, block.timestamp, _name, _message));

        //Emit a log event when a new memo is created!
        emit NewMemo(msg.sender, block.timestamp, _name, _message);
    }

    //Balance
    function withdrawTips() public {
        address(this).balance;
        require(owner.send(address(this).balance));
    }

    //donations received
    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }
}
