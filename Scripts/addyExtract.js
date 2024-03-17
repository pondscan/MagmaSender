const fs = require('fs');
const readline = require('readline');

const csvFilePath = 'list.csv'; // Update this to the path of your CSV file
const newAddressesFile = 'newAddresses.txt';

const readStream = fs.createReadStream(csvFilePath);
const writeStream = fs.createWriteStream(newAddressesFile);

const lineReader = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity
});

lineReader.on('line', (line) => {
    // Split the line by commas and iterate over each value
    line.split(',').forEach(value => {
        // Remove leading/trailing whitespace and quotes
        const trimmedValue = value.trim().replace(/^"|"$/g, '');
        // Validate Ethereum address (starts with 0x and is 42 characters long)
        if (/^0x[a-fA-F0-9]{40}$/.test(trimmedValue)) {
            writeStream.write(trimmedValue + '\n');
        }
    });
});

lineReader.on('close', () => {
    console.log('All addresses have been extracted to ' + newAddressesFile);
    writeStream.end();
});
