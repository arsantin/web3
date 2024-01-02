//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Santin {
    string message = "Ola";

    function get_message() public view returns (string memory) {
        return message;
    }

    function changeMessage(
        string memory _message
    ) public returns (string memory) {
        return message = _message;
    }
}
