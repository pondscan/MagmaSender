# MagmaSender

MagmaSender is a smart contract suite for multi-sending native tokens (LAVA) and ERC-20 tokens on the Magma network (currently in testnet). This tool is designed for efficient and safe bulk transactions.

## Demo

Explore MagmaSender with our live demo:

[Visit MagmaSender](https://www.magmasender.com)

## Key Features

- **Bulk Token Dispersal**: Send ERC-20 tokens to multiple recipients in a single transaction.
- **LAVA Distribution**: Safely distribute LAVA to multiple addresses.

## Quick Start

Visit our website to easily airdrop tokens or lava.

## Sample Code

Here's a quick look at how MagmaSender disperses ERC-20 tokens:

```solidity
function disperseTokens(IERC20 token, address[] calldata recipients, uint256 amount) external {
    require(amount > 0, "Amount must be greater than 0");
    require(recipients.length > 0, "Recipients list is empty");

    for (uint256 i = 0; i < recipients.length; i++) {
        require(token.transferFrom(msg.sender, recipients[i], amount), "Token transfer failed");
    }
}
