const fs = require('fs');
const readline = require('readline');

const csvFilePath = 'list.csv'; // Update this to the path of your CSV file
const newAddressesFile = 'newAddresses.txt';

// Create a read stream for the CSV file
const readStream = fs.createReadStream(csvFilePath);

// Create a write stream for the new addresses file
const writeStream = fs.createWriteStream(newAddressesFile);

const lineReader = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity
});

lineReader.on('line', (line) => {
    // Extract the Ethereum address from the CSV line
    // Assuming the address is always in the first column and double-quoted
    const match = line.match(/"([^"]+)"/);
    if (match) {
        const address = match[1];
        if (address.startsWith('0x')) {
            // Write the extracted address to the newAddresses.txt file
            writeStream.write(address + '\n');
        }
    }
});

lineReader.on('close', () => {
    console.log('All addresses have been extracted to ' + newAddressesFile);
    writeStream.end();
});
