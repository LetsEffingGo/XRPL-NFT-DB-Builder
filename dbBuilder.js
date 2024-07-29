const xrpl = require('xrpl');
const { MongoClient } = require('mongodb');
const axios = require('axios');

// XRP Ledger and MongoDB Configuration
const JSON_RPC_URL = "https://s1.ripple.com:51234/";
const issuerAddress = "[ISSUER_ADDRESS_HERE]";
const taxon = [COLLECTION_TAXON_HERE];
const mongoUri = "mongodb://localhost:27017/";
const dbName = "nft_db";
const collectionName = "nft_collection";

async function fetchNftMetadata(uri) {
  try {
    const response = await axios.get(uri);
    return response.data;
  } catch (error) {
    console.error(`Error fetching metadata from ${uri}:`, error);
    return {};
  }
}

async function fetchAndStoreNFTs() {
  // Connect to MongoDB
  const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  // Connect to XRPL
  const xrplClient = new xrpl.Client(JSON_RPC_URL);
  await xrplClient.connect();

  // Fetch NFTs
  const nftsResponse = await xrplClient.request({
    command: "account_nfts",
    account: issuerAddress
  });

  const nfts = nftsResponse.result.account_nfts;

  for (const nft of nfts) {
    if (nft.NFTokenTaxon === taxon) {
      const tokenID = nft.NFTokenID;
      const owner = nft.Issuer;
      const uri = nft.URI ? Buffer.from(nft.URI, 'hex').toString('utf8') : null;
      const metadata = uri ? await fetchNftMetadata(uri) : {};

      // Insert into MongoDB
      const document = { NFTokenID: tokenID, owner, URI: uri, metadata };
      await collection.insertOne(document);
      console.log(`Inserted NFT ${tokenID} into the collection.`);
    }
  }

  // Close connections
  await xrplClient.disconnect();
  await client.close();
}

// Execute the function
fetchAndStoreNFTs().catch(console.error);
