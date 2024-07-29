# NFT Fetcher and MongoDB Storage

This project fetches Non-Fungible Tokens (NFTs) issued by a specified project on the XRP Ledger and stores them in a MongoDB collection. The stored data includes the NFTokenID, owner address, URI pointing to the metadata file, and the contents of the metadata file.

## Features

- Fetch NFTs from the XRP Ledger using `xrpl.js`.
- Retrieve and store metadata associated with each NFT.
- Store NFT data in a MongoDB database.

## Prerequisites

- Node.js (version 14 or higher)
- MongoDB (local or remote instance)

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/LetsEffingGo/XRPL-NFT-DB-Builder.git
cd XRPL-NFT-DB-Builder
```

### 2. Install Dependencies

```bash
npm install
```

This command installs the required packages, including `xrpl`, `mongodb`, and `axios`.

### 3. Configure the Environment

Ensure you have a MongoDB instance running. You can either use a local MongoDB instance or a remote instance like MongoDB Atlas.

### 4. Run the Script

```bash
node index.js
```

This script fetches NFTs issued by the specified XRP Ledger account and taxon, retrieves the metadata, and stores the data in MongoDB.

## Configuration

- **XRPL Settings:** Update the `issuerAddress` and `taxon` in the script (`index.js`) to match your project's details.
- **MongoDB Connection:** Modify the `mongoUri`, `dbName`, and `collectionName` as needed.

```javascript
const JSON_RPC_URL = "https://s1.ripple.com:51234/";
const issuerAddress = "[ISSUER_ADDRESS_HERE]";
const taxon = [COLLECTION_TAXON_HERE];
const mongoUri = "mongodb://localhost:27017/";
const dbName = "nft_db";
const collectionName = "nft_collection";
```

## Usage

1. **Ensure MongoDB is Running:**
   - For a local instance, ensure the MongoDB service (`mongod`) is running.
   - For a remote instance, make sure you have the correct connection string and access credentials.

2. **Fetch and Store NFTs:**
   - Run the script as described above to fetch NFTs and store them in MongoDB.

## Troubleshooting

- **Connection Issues:** Ensure that the MongoDB connection string is correct and that your MongoDB server is running.
- **Fetching Metadata:** If there are issues with fetching metadata, check the URI format and ensure the data is accessible.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or issues, please open an issue on the GitHub repository.
