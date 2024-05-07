import { expect, test, describe, beforeEach } from 'bun:test';
import BlockstreamClient from '../src/index';

const NETWORK = 'testnet';
const TXID = 'a9c07a4a509607a9f8f5ff8eb597c29b322e59b03152deae01704552cdde7997';
const ADDRESS =
  'tb1pttjr9292tea2nr28ca9zswgdhz0dasnz6n3v58mtg9cyf9wqr49sv8zjep';
const BLOCK_HASH =
  '0000000000000240128b208e5a99b5733dfb1e6126db48175afba5a3b7b9c7bb';
const ASSET_ID = 'asset_id_example';

describe('BlockstreamClient', () => {
  let client: BlockstreamClient;

  beforeEach(() => {
    client = new BlockstreamClient({ network: NETWORK });
  });

  test('getTransaction', async () => {
    const response = await client.getTransaction(TXID);
    expect(response).toBeInstanceOf(Object);
    expect(response.txid).toBe(TXID);
  });

  test('getTransactionStatus', async () => {
    const response = await client.getTransactionStatus(TXID);
    expect(response).toBeInstanceOf(Object);
    expect(response.confirmed).toBeBoolean();
  });

  test('getTransactionHex', async () => {
    const response = await client.getTransactionHex(TXID);
    expect(response).toBeString();
  });

  test('getTransactionRaw', async () => {
    const response = await client.getTransactionRaw(TXID);
    expect(response).toBeInstanceOf(Buffer);
  });

  test('getTransactionMerkleProof', async () => {
    const response = await client.getTransactionMerkleProof(TXID);
    expect(response).toBeString();
  });

  test('getTransactionOutspend', async () => {
    const response = await client.getTransactionOutspend(TXID, 0);
    expect(response).toBeInstanceOf(Object);
    expect(response.spent).toBeBoolean();
  });

  test('getTransactionOutspends', async () => {
    const response = await client.getTransactionOutspends(TXID);
    expect(response).toBeInstanceOf(Array);
    expect(response[0]).toBeInstanceOf(Object);
  });

  // test('broadcastTransaction', async () => {
  //   const tx = 'tx_example';
  //   const response = await client.broadcastTransaction(tx);
  //   expect(response).toBeString();
  // });

  test('getAddressInfo', async () => {
    const response = await client.getAddressInfo(ADDRESS);
    expect(response).toBeInstanceOf(Object);
    expect(response.address).toBe(ADDRESS);
  });

  test('getAddressTransactions', async () => {
    const response = await client.getAddressTransactions(ADDRESS);
    expect(response).toBeInstanceOf(Array);
    expect(response[0]).toBeInstanceOf(Object);
  });

  test('getAddressMempoolTransactions', async () => {
    const response = await client.getAddressMempoolTransactions(ADDRESS);
    expect(response).toBeInstanceOf(Array);
  });

  test('getAddressUtxos', async () => {
    const response = await client.getAddressUtxos(ADDRESS);
    expect(response).toBeInstanceOf(Array);
    expect(response[0]).toBeInstanceOf(Object);
  });

  test('searchAddresses', async () => {
    const prefix = 'tb1ptt';
    const response = await client.searchAddresses(prefix);
    expect(response).toBeInstanceOf(Array);
    expect(response[0]).toBeString();
  });

  test('getBlock', async () => {
    const response = await client.getBlock(BLOCK_HASH);
    expect(response).toBeInstanceOf(Object);
    expect(response.tx_count).toBeNumber();
  });

  test('getBlockHeader', async () => {
    const response = await client.getBlockHeader(BLOCK_HASH);
    expect(response).toBeString();
  });

  test('getBlockStatus', async () => {
    const response = await client.getBlockStatus(BLOCK_HASH);
    expect(response).toBeInstanceOf(Object);
    expect(response.in_best_chain).toBeBoolean();
  });

  test('getBlockTransactions', async () => {
    const response = await client.getBlockTransactions(BLOCK_HASH);
    expect(response).toBeInstanceOf(Array);
    expect(response[0]).toBeInstanceOf(Object);
  });

  test('getBlockTxids', async () => {
    const response = await client.getBlockTxids(BLOCK_HASH);
    expect(response).toBeInstanceOf(Array);
    expect(response[0]).toBeString();
  });

  test('getBlockByTxIndex', async () => {
    const response = await client.getBlockByTxIndex(BLOCK_HASH, 0);
    expect(response).toBeString();
  });

  test('getBlockRaw', async () => {
    const response = await client.getBlockRaw(BLOCK_HASH);
    expect(response).toBeInstanceOf(Buffer);
  });

  test('getBlockHeight', async () => {
    const height = 123;
    const response = await client.getBlockHeight(height);
    expect(response).toBeString();
  });

  test('getBlocks', async () => {
    const response = await client.getBlocks();
    expect(response).toBeInstanceOf(Array);
    expect(response[0]).toBeInstanceOf(Object);
  });

  test('getBlockTipHeight', async () => {
    const response = await client.getBlockTipHeight();
    expect(response).toBeNumber();
  });

  test('getBlockTipHash', async () => {
    const response = await client.getBlockTipHash();
    expect(response).toBeString();
  });

  test('getMempoolStats', async () => {
    const response = await client.getMempoolStats();
    expect(response).toBeInstanceOf(Object);
    expect(response.count).toBeNumber();
  });

  test('getMempoolTxids', async () => {
    const response = await client.getMempoolTxids();
    expect(response).toBeInstanceOf(Array);
    expect(response[0]).toBeString();
  });

  test('getMempoolRecent', async () => {
    const response = await client.getMempoolRecent();
    expect(response).toBeInstanceOf(Array);
    expect(response[0]).toBeInstanceOf(Object);
  });

  test('getFeeEstimates', async () => {
    const response = await client.getFeeEstimates();
    expect(response).toBeInstanceOf(Object);
    expect(response['1']).toBeNumber();
  });

  // test('getAsset', async () => {
  //   const response = await client.getAsset(ASSET_ID);
  //   expect(response).toBeInstanceOf(Object);
  //   expect(response.asset_id).toBe(ASSET_ID);
  // });

  // test('getAssetTransactions', async () => {
  //   const response = await client.getAssetTransactions(ASSET_ID);
  //   expect(response).toBeInstanceOf(Array);
  //   expect(response[0]).toBeInstanceOf(Object);
  // });

  // test('getAssetSupply', async () => {
  //   const response = await client.getAssetSupply(ASSET_ID);
  //   expect(response).toBeNumber();
  // });

  // test('getAssetSupplyDecimal', async () => {
  //   const response = await client.getAssetSupplyDecimal(ASSET_ID);
  //   expect(response).toBeNumber();
  // });

  // test('getAssetsRegistry', async () => {
  //   const response = await client.getAssetsRegistry();
  //   expect(response).toBeInstanceOf(Array);
  //   expect(response[0]).toBeInstanceOf(Object);
  // });
});
