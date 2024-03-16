const Web3 = require('web3');
const fs = require('fs-extra');

// Web3 initialization with your RPC URL
const web3 = new Web3('https://turbo.magma-rpc.com/');

// Set up your account using the private key
const account = web3.eth.accounts.privateKeyToAccount('YOUR_PRIVATE_KEY'); // Replace with your private, WARNING: ONLY USE THIS LOCALLY!
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

// Contract addresses and ABI
const tokenContractAddress = 'YOUR_TOKEN_ADDRESS'; // Replace with the token you wish to airdrop
const magmaSenderContractAddress = '0xc10685ff28e298e72ce3cc7c7ef3306de685326a'; // MagmaSender Contract Address
const magmaSenderAbi = [
    {
        "inputs": [
            {"internalType": "contract IERC20", "name": "token", "type": "address"},
            {"internalType": "address[]", "name": "recipients", "type": "address[]"},
            {"internalType": "uint256", "name": "amount", "type": "uint256"}
        ],
        "name": "disperseTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

// Initialize MagmaSender contract
const magmaSenderContract = new web3.eth.Contract(magmaSenderAbi, magmaSenderContractAddress);

// Files
const addressesFile = 'addresses.txt';
const progressFile = 'sendProgress.json';
const batchSize = 800; // Adjust based on testing and network conditions

async function readAddresses() {
    const addresses = await fs.readFile(addressesFile, 'utf8');
    return addresses.split('\n').filter(Boolean);
}

async function sendBatchTokens(batch, tokenAmount) {
    const data = magmaSenderContract.methods.disperseTokens(tokenContractAddress, batch, tokenAmount).encodeABI();
    const gas = await magmaSenderContract.methods.disperseTokens(tokenContractAddress, batch, tokenAmount).estimateGas({from: account.address});
    const gasPrice = await web3.eth.getGasPrice();

    return web3.eth.sendTransaction({
        from: account.address,
        to: magmaSenderContractAddress,
        data: data,
        gas: gas,
        gasPrice: gasPrice
    });
}

// Helper function to introduce a delay
function delay(duration) {
    return new Promise(resolve => setTimeout(resolve, duration));
}

async function sendTokens() {
    const recipients = await readAddresses();
    console.log(`Total recipients: ${recipients.length}`);

    let progress = { lastIndex: 0 };
    if (await fs.pathExists(progressFile)) {
        progress = await fs.readJson(progressFile);
    }

    const tokenAmount = web3.utils.toWei("1", "ether");
    for (let i = progress.lastIndex; i < recipients.length; i += batchSize) {
        const batch = recipients.slice(i, i + batchSize);
        console.log(`Sending tokens to batch starting at index ${i}`);

        try {
            const receipt = await sendBatchTokens(batch, tokenAmount);
            console.log(`Batch sent successfully. Transaction hash: ${receipt.transactionHash}`);

            progress.lastIndex = i + batch.length - 1;
            await fs.writeJson(progressFile, progress);

            // Introduce a delay before proceeding to the next batch, Adjust Based on Testing Results
            console.log("Waiting 3 seconds...");
            await delay(3000);

        } catch (error) {
            console.error(`Error sending batch starting at index ${i}:`, error);
            break; // Stop the loop on error
        }
    }

    console.log('Completed sending tokens to all recipients.');
    await fs.remove(progressFile); // Cleanup progress file after completion
}

sendTokens().catch(console.error);
