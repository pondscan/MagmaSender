const axios = require('axios');
const fs = require('fs-extra');

const apiUrlBase = 'https://magmascan.org/api/v2/addresses';
const addressesFile = 'addresses.txt';
const progressFile = 'progress.json';

// Function to fetch addresses with pagination
async function fetchAddresses(nextPageParams = {}) {
    try {
        const response = await axios.get(apiUrlBase, { params: nextPageParams });
        if (response.data && response.data.items && response.data.items.length) {
            const addresses = response.data.items.map(addrObj => addrObj.hash);
            console.log(`Fetched ${addresses.length} addresses...`);
            
            // Append addresses to file
            await fs.appendFile(addressesFile, addresses.join('\n') + '\n');
            console.log(`Addresses saved to ${addressesFile}`);

            // Save progress for resuming
            if (response.data.next_page_params) {
                await fs.writeJson(progressFile, response.data.next_page_params);
                console.log(`Progress saved. To resume, start the script again.`);
                
                // Fetch next page
                await fetchAddresses(response.data.next_page_params);
            } else {
                console.log('All addresses fetched.');
                await fs.remove(progressFile); // Cleanup progress file after completion
            }
        }
    } catch (error) {
        console.error('Error fetching addresses:', error);
    }
}

// Main function to control flow
async function main() {
    try {
        // Check for existing progress and resume if available
        if (await fs.pathExists(progressFile)) {
            const progress = await fs.readJson(progressFile);
            console.log('Resuming from saved progress...');
            await fetchAddresses(progress);
        } else {
            await fetchAddresses();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
