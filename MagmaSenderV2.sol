// SPDX-License-Identifier: MIT
// ███    ███  █████   ██████  ███    ███  █████  ███████ ███████ ███    ██ ██████  ███████ ██████
// ████  ████ ██   ██ ██       ████  ████ ██   ██ ██      ██      ████   ██ ██   ██ ██      ██   ██
// ██ ████ ██ ███████ ██   ███ ██ ████ ██ ███████ ███████ █████   ██ ██  ██ ██   ██ █████   ██████
// ██  ██  ██ ██   ██ ██    ██ ██  ██  ██ ██   ██      ██ ██      ██  ██ ██ ██   ██ ██      ██   ██
// ██      ██ ██   ██  ██████  ██      ██ ██   ██ ███████ ███████ ██   ████ ██████  ███████ ██   ██ v2
// by @pondscan

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract MagmaSender {
    // Event to emit for each dispersement for better tracking
    event EthDispersed(address indexed recipient, uint256 amount);

    // Function to disperse ETH to multiple recipients
    function disperseETH(address payable[] calldata recipients, uint256 amount) external payable {
        require(amount > 0, "Amount must be greater than 0");
        require(recipients.length > 0, "Recipients list is empty");
        require(msg.value == amount * recipients.length, "Sent value not correct");

        for (uint256 i = 0; i < recipients.length; i++) {
            // Send the specified amount of ETH to each recipient
            (bool sent, ) = recipients[i].call{value: amount}("");
            require(sent, "Failed to send Ether");

            emit EthDispersed(recipients[i], amount);
        }

        // Refund any leftover ETH back to the sender (useful in case too much ETH was sent)
        uint256 balance = address(this).balance;
        if (balance > 0) {
            (bool refunded, ) = msg.sender.call{value: balance}("");
            require(refunded, "Failed to refund Ether");
        }
    }

    // Function to receive ETH when someone sends ETH directly to the contract's address
    receive() external payable {}
}
