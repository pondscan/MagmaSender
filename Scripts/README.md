# Magma Testnet Address Fetcher

This Node.js script is designed to fetch and store all addresses from the Magma testnet that hold the native token LAVA. It utilizes the REST API provided by `magmascan.org` to access the addresses and paginates through the results to compile a complete list. The script saves the fetched addresses into a text file and maintains a progress file to allow for graceful interruption and resumption.

## Prerequisites

Before you run this script, ensure you have the following installed:
- Node.js (Download and install from [nodejs.org](https://nodejs.org/))
- npm (Comes with Node.js)

## Setup

1. Clone this repository or download the script to your local machine.

2. Navigate to the directory containing the script in your terminal.

3. Install the required npm packages by running:
   ```sh
   npm install axios fs-extra

## Usage

To fetch and store addresses from the Magma testnet, follow these steps:

1. **Run the Script**: Start the address fetching process by executing the script with Node.js from your terminal:

    ```bash
    node fetchAddresses.js
    ```

    This command initiates the script, which begins to fetch addresses from the Magma testnet that hold the native token LAVA.

2. **Monitoring Progress**: The script provides console logs to keep you updated on its progress. It will log each batch of addresses fetched from the API and inform you when they're saved to the `addresses.txt` file.

3. **Resuming**: If the script is interrupted or stopped, you don't need to worry about starting over. The script automatically saves its progress in `progress.json`. To resume, simply run the script again, and it will pick up where it left off:

    ```bash
    node fetchAddresses.js
    ```

4. **Completion**: Once all addresses have been fetched, the script will log a completion message and automatically clean up the progress file. The fetched addresses will be stored in `addresses.txt` within the same directory as the script.

### Features

- **Pagination Handling**: The script efficiently navigates through paginated API responses, ensuring all available addresses are fetched without missing any data.

- **Progress Tracking**: Progress is saved in a JSON file, allowing the script to resume fetching from the last saved point in case of interruption. This ensures no duplication of effort or data.

- **Graceful Interruption**: You can safely stop the script at any time by pressing `Ctrl+C`. The script saves the current state, allowing for a smooth resumption later without starting over.

- **Address Storage**: All fetched addresses are stored in a text file (`addresses.txt`), providing an easy way to access and utilize the data for further processing or analysis.

### Resuming Fetching

In case the script is interrupted, you can resume the fetching process without starting from scratch. The script automatically detects the last saved progress from the `progress.json` file and continues fetching from where it left off:

```sh
node fetchAddresses.js

### Cleaning Up

Once the script has successfully fetched all addresses, it will automatically remove the `progress.json` file used for tracking progress. If you wish to start the fetching process anew, simply delete the `addresses.txt` file and run the script again:

```sh
node fetchAddresses.js

### Contributing

Your contributions are welcome! If you have suggestions for improving this script or want to contribute to its development, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Make your changes.
4. Submit a pull request with a clear description of the changes.

Feel free to open issues or suggest enhancements through the GitHub repository issue tracker.

For support or questions, reach out to [@pondscan on X](https://x.com/pondscan).
