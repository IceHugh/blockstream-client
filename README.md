**Blockstream Client Library**
=============================

The Blockstream Client Library is a JavaScript library that provides a simple and intuitive way to interact with the Blockstream API. The library allows you to retrieve information about transactions, blocks, addresses, and assets, as well as broadcast transactions to the network.

**Getting Started**
---------------
### Installation

To install the library, you can use npm:
```bash
npm install blockstream-client
```

### Usage
To use the library, you need to create an instance of the `BlockstreamClient` class, passing in the network and API URL as options. For example:
```js
import BlockstreamClient from 'blockstream-client';
const client = new BlockstreamClient({ network:'mainnet'});
```

**Methods**
----------

The library provides the following methods:

### Transactions

* `getTransaction(txid: string): Promise<Transaction>`: Get information about a transaction
* `getTransactionStatus(txid: string): Promise<TransactionStatus>`: Get the transaction confirmation status
* `getTransactionHex(txid: string): Promise<string>`: Get the raw transaction in hex
* `getTransactionRaw(txid: string): Promise<Buffer>`: Get the raw transaction as binary data
* `getTransactionMerkleProof(txid: string): Promise<string>`: Get a merkle inclusion proof for the transaction
* `getTransactionOutspend(txid: string, vout: number): Promise<TransactionOutputSpending>`: Get the spending status of a transaction output
* `getTransactionOutspends(txid: string): Promise<TransactionStatus[]>`: Get the spending status of all transaction outputs
* `broadcastTransaction(tx: string): Promise<string>`: Broadcast a raw transaction to the network

### Addresses

* `getAddressInfo(address: string): Promise<Address>`: Get information about an address or script hash
* `getAddressTransactions(address: string): Promise<Transaction[]>`: Get transaction history for an address or script hash
* `getAddressMempoolTransactions(address: string): Promise<Transaction[]>`: Get unconfirmed transaction history for an address or script hash
* `getAddressUtxos(address: string): Promise<Utxo[]>`: Get the list of unspent transaction outputs associated with an address or script hash
* `searchAddresses(prefix: string): Promise<string[]>`: Search for addresses beginning with a prefix

### Blocks

* `getBlock(hash: string): Promise<Block>`: Get information about a block
* `getBlockHeader(hash: string): Promise<string>`: Get the block header in hex
* `getBlockStatus(hash: string): Promise<BlockStatus>`: Get the block status
* `getBlockTransactions(hash: string, startIndex?: number): Promise<Transaction[]>`: Get a list of transactions in a block
* `getBlockTxids(hash: string): Promise<string[]>`: Get a list of all txids in the block
* `getBlockByTxIndex(hash: string, index: number): Promise<string>`: Get the transaction at index `index` within the specified block
* `getBlockRaw(hash: string): Promise<Buffer>`: Get the raw block representation in binary
* `getBlockHeight(height: number): Promise<string>`: Get the hash of the block currently at a certain height
* `getBlocks(startHeight?: number): Promise<Block[]>`: Get the 10 newest blocks starting at the tip or at a certain height
* `getBlockTipHeight(): Promise<number>`: Get the height of the last block
* `getBlockTipHash(): Promise<string>`: Get the hash of the last block

### Mempool

* `getMempoolStats(): Promise<MempoolBacklog>`: Get mempool backlog statistics
* `getMempoolTxids(): Promise<string[]>`: Get the full list of txids in the mempool
* `getMempoolRecent(): Promise<Transaction[]>`: Get a list of the last 10 transactions to enter the mempool

### Fees

* `getFeeEstimates(): Promise<FeeEstimates>`: Get fee estimates

### Assets

* `getAsset(assetId: string): Promise<Asset>`: Get information about an asset
* `getAssetTransactions(assetId: string): Promise<Transaction[]>`: Get transactions associated with an asset
* `getAssetSupply(assetId: string): Promise<number>`: Get the supply of an asset
* `getAssetSupplyDecimal(assetId: string): Promise<number>`: Get the supply of an asset in decimal
* `getAssetsRegistry(): Promise<Asset[]>`: Get the asset registry

**License**
-------

The Blockstream Client Library is licensed under the MIT License.

**Contributing**
------------

Contributions are welcome! Please open a pull request on GitHub to submit your changes.

**Acknowledgments**
---------------

The Blockstream Client Library is built on top of the Blockstream API. We would like to thank the Blockstream team for providing a robust and reliable API.