// SPDX-License-Identifier: MIT
// ███    ███  █████   ██████  ███    ███  █████  ███████ ███████ ███    ██ ██████  ███████ ██████
// ████  ████ ██   ██ ██       ████  ████ ██   ██ ██      ██      ████   ██ ██   ██ ██      ██   ██
// ██ ████ ██ ███████ ██   ███ ██ ████ ██ ███████ ███████ █████   ██ ██  ██ ██   ██ █████   ██████
// ██  ██  ██ ██   ██ ██    ██ ██  ██  ██ ██   ██      ██ ██      ██  ██ ██ ██   ██ ██      ██   ██
// ██      ██ ██   ██  ██████  ██      ██ ██   ██ ███████ ███████ ██   ████ ██████  ███████ ██   ██
// by @pondscan

pragma solidity ^0.8.0;

interface IERC20 {
    function transferFrom(
        address from,
        address to,
        uint256 value
    ) external returns (bool);

    function transfer(address recipient, uint256 amount)
        external
        returns (bool);
}

contract MagmaSender {
    // Multi-send ERC20 tokens to multiple recipients with the same amount per recipient
    function disperseTokens(
        IERC20 token,
        address[] calldata recipients,
        uint256 amount
    ) external {
        require(amount > 0, "Amount must be greater than 0");
        require(recipients.length > 0, "Recipients list is empty");

        for (uint256 i = 0; i < recipients.length; i++) {
            require(
                token.transferFrom(msg.sender, recipients[i], amount),
                "Token transfer failed"
            );
        }
    }
}
