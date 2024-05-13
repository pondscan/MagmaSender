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
```

And here's how you can distribute LAVA:

```solidity
function disperseLAVA(address payable[] calldata recipients, uint256 amount) external payable {
    require(amount > 0, "Amount must be greater than 0");
    require(recipients.length > 0, "Recipients list is empty");
    require(msg.value == amount * recipients.length, "Sent value not correct");

    for (uint256 i = 0; i < recipients.length; i++) {
        (bool sent, ) = recipients[i].call{value: amount}("");
        require(sent, "Failed to send LAVA");

        emit LAVADispersed(recipients[i], amount);
    }
}
```

## Support

Contact [@pondscan](https://x.com/pondscan) on X for support.
