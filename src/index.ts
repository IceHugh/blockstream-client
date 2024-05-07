import type {
  Transaction,
  TransactionStatus,
  Address,
  MempoolBacklog,
  Block,
  BlockStatus,
  FeeEstimates,
  Asset,
  Utxo,
  BLockstreamNetwork,
  TransactionOutputSpending,
} from './type';
import { fetch } from './fetch';

class BlockstreamClient {
  private apiUrl: string;
  private network: BLockstreamNetwork = 'mainnet';
  private mainnetHost: string = 'https://blockstream.info/api/';
  private testnetHost: string = 'https://blockstream.info/testnet/api/';
  private liquidHost: string = 'https://blockstream.info/liquid/api/';
  private liquidTestnetHost: string =
    'https://blockstream.info/liquidtestnet/api/';
  constructor({
    network = 'mainnet',
    apiUrl = '',
  }: {
    network: BLockstreamNetwork;
    apiUrl?: string;
  }) {
    if (apiUrl) {
      this.apiUrl = apiUrl;
    } else {
      this.network = network;
      switch (network) {
        case 'testnet':
          this.apiUrl = this.testnetHost;
          break;
        case 'liquid':
          this.apiUrl = this.liquidHost;
          break;
        case 'liquidtestnet':
          this.apiUrl = this.liquidTestnetHost;
          break;
        default:
          this.apiUrl = this.mainnetHost;
          break;
      }
    }
  }
  private generateUrl(endpoint: string): string {
    return `${this.apiUrl}/${endpoint}`;
  }

  /**
   * Get information about a transaction
   * @param txid Transaction ID
   * @returns Transaction
   */
  async getTransaction(txid: string): Promise<Transaction> {
    const url = this.generateUrl(`tx/${txid}`);
    const response = await fetch(url);
    const data = await response.json();
    return data as Transaction;
  }

  /**
   * Get the transaction confirmation status
   * @param txid Transaction ID
   * @returns TransactionStatus
   */
  async getTransactionStatus(txid: string): Promise<TransactionStatus> {
    const url = this.generateUrl(`tx/${txid}/status`);
    const response = await fetch(url);
    const data = await response.json();
    return data as TransactionStatus;
  }

  /**
   * Get the raw transaction in hex or as binary data
   * @param txid Transaction ID
   * @returns string | Buffer
   */
  async getTransactionHex(txid: string): Promise<string> {
    const url = this.generateUrl(`tx/${txid}/hex`);
    const response = await fetch(url);
    const data = await response.text();
    return data;
  }

  async getTransactionRaw(txid: string): Promise<Buffer> {
    const url = this.generateUrl(`tx/${txid}/raw`);
    const response = await fetch(url);
    const data = await response.arrayBuffer();
    return Buffer.from(data);
  }

  /**
   * Get a merkle inclusion proof for the transaction
   * @param txid Transaction ID
   * @returns string
   */
  async getTransactionMerkleProof(txid: string): Promise<string> {
    const url = this.generateUrl(`tx/${txid}/merkle-proof`);
    const response = await fetch(url);
    const data = await response.text();
    return data;
  }

  /**
   * Get the spending status of a transaction output
   * @param txid Transaction ID
   * @param vout Output index
   * @returns TransactionOutputSpending
   */
  async getTransactionOutspend(
    txid: string,
    vout: number,
  ): Promise<TransactionOutputSpending> {
    const url = this.generateUrl(`tx/${txid}/outspend/${vout}`);
    const response = await fetch(url);
    const data = await response.json();
    return data as TransactionOutputSpending;
  }

  /**
   * Get the spending status of all transaction outputs
   * @param txid Transaction ID
   * @returns TransactionStatus[]
   */
  async getTransactionOutspends(txid: string): Promise<TransactionStatus[]> {
    const url = this.generateUrl(`tx/${txid}/outspends`);
    const response = await fetch(url);
    const data = await response.json();
    return data as TransactionStatus[];
  }

  /**
   * Broadcast a raw transaction to the network
   * @param tx Raw transaction in hex
   * @returns string
   */
  async broadcastTransaction(tx: string): Promise<string> {
    const url = this.generateUrl(`tx`);
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: tx,
    });
    const data = await response.text();
    return data;
  }

  /**
   * Get information about an address or script hash
   * @param address Address or script hash
   * @returns Address
   */
  async getAddressInfo(address: string): Promise<Address> {
    const url = this.generateUrl(`address/${address}`);
    const response = await fetch(url);
    const data = await response.json();
    return data as Address;
  }

  /**
   * Get transaction history for an address or script hash
   * @param address Address or script hash
   * @returns Transaction[]
   */
  async getAddressTransactions(address: string): Promise<Transaction[]> {
    const url = this.generateUrl(`address/${address}/txs`);
    const response = await fetch(url);
    const data = await response.json();
    return data as Transaction[];
  }

  /**
   * Get unconfirmed transaction history for an address or script hash
   * @param address Address or script hash
   * @returns Transaction[]
   */
  async getAddressMempoolTransactions(address: string): Promise<Transaction[]> {
    const url = this.generateUrl(`address/${address}/txs/mempool`);
    const response = await fetch(url);
    const data = await response.json();
    return data as Transaction[];
  }

  /**
   * Get the list of unspent transaction outputs associated with an address or script hash
   * @param address Address or script hash
   * @returns Utxo[]
   */
  async getAddressUtxos(address: string): Promise<Utxo[]> {
    const url = this.generateUrl(`address/${address}/utxo`);
    const response = await fetch(url);
    const data = await response.json();
    return data as Utxo[];
  }

  /**
   * Search for addresses beginning with a prefix
   * @param prefix Address prefix
   * @returns string[]
   */
  async searchAddresses(prefix: string): Promise<string[]> {
    const url = this.generateUrl(`address-prefix/${prefix}`);
    const response = await fetch(url);
    const data = await response.json();
    return data as string[];
  }

  /**
   * Get information about a block
   * @param hash Block hash
   * @returns Block
   */
  async getBlock(hash: string): Promise<Block> {
    const url = this.generateUrl(`block/${hash}`);
    const response = await fetch(url);
    const data = await response.json();
    return data as Block;
  }

  /**
   * Get the block header in hex
   * @param hash Block hash
   * @returns string
   */
  async getBlockHeader(hash: string): Promise<string> {
    const url = this.generateUrl(`block/${hash}/header`);
    const response = await fetch(url);
    const data = await response.text();
    return data;
  }

  /**
   * Get the block status
   * @param hash Block hash
   * @returns BlockStatus
   */
  async getBlockStatus(hash: string): Promise<BlockStatus> {
    const url = this.generateUrl(`block/${hash}/status`);
    const response = await fetch(url);
    const data = await response.json();
    return data as BlockStatus;
  }

  /**
   * Get a list of transactions in a block
   * @param hash Block hash
   * @param startIndex Start index (optional)
   * @returns Transaction[]
   */
  async getBlockTransactions(
    hash: string,
    startIndex?: number,
  ): Promise<Transaction[]> {
    const url = this.generateUrl(
      `block/${hash}/txs${startIndex ? `/${startIndex}` : ''}`,
    );
    const response = await fetch(url);
    const data = await response.json();
    return data as Transaction[];
  }

  /**
   * Get a list of all txids in the block.
   * @param hash Block hash
   * @returns string[]
   */
  async getBlockTxids(hash: string): Promise<string[]> {
    const url = this.generateUrl(`block/${hash}/txids`);
    const response = await fetch(url);
    const data = await response.json();
    return data as string[];
  }

  /**
   * Get the transaction at index :index within the specified block.
   * @param hash Block hash
   * @param index Index of transaction within block
   * @returns string[]
   */
  async getBlockByTxIndex(hash: string, index: number): Promise<string> {
    const url = this.generateUrl(`block/${hash}/txid/${index}`);
    const response = await fetch(url);
    const data = await response.text();
    return data as string;
  }

  /**
   * Get the raw block representation in binary
   * @param hash Block hash
   * @returns Buffer
   */
  async getBlockRaw(hash: string): Promise<Buffer> {
    const url = this.generateUrl(`block/${hash}/raw`);
    const response = await fetch(url);
    const data = await response.arrayBuffer();
    return Buffer.from(data);
  }

  /**
   * Get the hash of the block currently at a certain height
   * @param height Block height
   * @returns string
   */
  async getBlockHeight(height: number): Promise<string> {
    const url = this.generateUrl(`block-height/${height}`);
    const response = await fetch(url);
    const data = await response.text();
    return data;
  }

  /**
   * Get the 10 newest blocks starting at the tip or at a certain height
   * @param startHeight Start height (optional)
   * @returns Block[]
   */
  async getBlocks(startHeight?: number): Promise<Block[]> {
    const url = this.generateUrl(
      `blocks${startHeight ? `/${startHeight}` : ''}`,
    );
    const response = await fetch(url);
    const data = await response.json();
    return data as Block[];
  }

  /**
   * Get the height of the last block
   * @returns number
   */
  async getBlockTipHeight(): Promise<number> {
    const url = this.generateUrl(`blocks/tip/height`);
    const response = await fetch(url);
    const data = await response.json();
    return data as number;
  }

  /**
   * Get the hash of the last block
   * @returns string
   */
  async getBlockTipHash(): Promise<string> {
    const url = this.generateUrl(`blocks/tip/hash`);
    const response = await fetch(url);
    const data = await response.text();
    return data;
  }

  /**
   * Get mempool backlog statistics
   * @returns MempoolStats
   */
  async getMempoolStats(): Promise<MempoolBacklog> {
    const url = this.generateUrl(`mempool`);
    const response = await fetch(url);
    const data = await response.json();
    return data as MempoolBacklog;
  }

  /**
   * Get the full list of txids in the mempool
   * @returns string[]
   */
  async getMempoolTxids(): Promise<string[]> {
    const url = this.generateUrl(`mempool/txids`);
    const response = await fetch(url);
    const data = await response.json();
    return data as string[];
  }

  /**
   * Get a list of the last 10 transactions to enter the mempool
   * @returns Transaction[]
   */
  async getMempoolRecent(): Promise<Transaction[]> {
    const url = this.generateUrl(`mempool/recent`);
    const response = await fetch(url);
    const data = await response.json();
    return data as Transaction[];
  }
  /**

Get fee estimates
@returns FeeEstimates
*/
  async getFeeEstimates(): Promise<FeeEstimates> {
    const url = this.generateUrl(`fee-estimates`);
    const response = await fetch(url);
    const data = await response.json();
    return data as FeeEstimates;
  }
  /**

  Get information about an asset
  @param assetId Asset ID
  @returns Asset
  */
  async getAsset(assetId: string): Promise<Asset> {
    const url = this.generateUrl(`asset/${assetId}`);
    const response = await fetch(url);
    const data = await response.json();
    return data as Asset;
  }
  /**

  Get transactions associated with an asset
  @param assetId Asset ID
  @returns Transaction[]
  */
  async getAssetTransactions(assetId: string): Promise<Transaction[]> {
    const url = this.generateUrl(`asset/${assetId}/txs`);
    const response = await fetch(url);
    const data = await response.json();
    return data as Transaction[];
  }
  /**

  Get the supply of an asset
  @param assetId Asset ID
  @returns number
  */
  async getAssetSupply(assetId: string): Promise<number> {
    const url = this.generateUrl(`asset/${assetId}/supply`);
    const response = await fetch(url);
    const data = await response.json();
    return data as number;
  }
  /**

  Get the supply of an asset in decimal
  @param assetId Asset ID
  @returns number
  */
  async getAssetSupplyDecimal(assetId: string): Promise<number> {
    const url = this.generateUrl(`asset/${assetId}/supply/decimal`);
    const response = await fetch(url);
    const data = await response.json();
    return data as number;
  }
  /**

  Get the asset registry
  @returns Asset[]
  */
  async getAssetsRegistry(): Promise<Asset[]> {
    const url = this.generateUrl(`assets/registry`);
    const response = await fetch(url);
    const data = await response.json();
    return data as Asset[];
  }
}

export default BlockstreamClient;
