export type BLockstreamNetwork =
  | 'mainnet'
  | 'testnet'
  | 'liquid'
  | 'liquidtestnet';
  
export interface Transaction {
  txid: string;
  version: number;
  locktime: number;
  size: number;
  weight: number;
  fee: number;
  vin: Vin[];
  vout: Vout[];
  status: TransactionStatus;
}
export interface Utxo {
  txid: string;
  vout: number;
  status: TransactionStatus;
  value: number;
}
export interface Vin {
  txid: string;
  vout: number;
  is_coinbase: boolean;
  scriptsig: string;
  scriptsig_asm: string;
  inner_redeemscript_asm: string;
  inner_witnessscript_asm: string;
  sequence: number;
  witness: Witness[];
  prevout: Prevout;
  is_pegin: boolean;
  issuance: Issuance | null;
}

export interface Vout {
  scriptpubkey: string;
  scriptpubkey_asm: string;
  scriptpubkey_type: string;
  scriptpubkey_address: string;
  value: number;
  valuecommitment: string;
  asset: string;
  assetcommitment: string;
  pegout: Pegout | null;
}
export interface TransactionOutputSpending {
  spent: boolean;
  txid?: string;
  vin?: number;
  status?: TransactionStatus;
}
export interface TransactionStatus {
  confirmed: boolean;
  block_height: number | null;
  block_hash: string | null;
  block_time: number | null;
}

export interface Address {
  address: string;
  chain_stats: ChainStats;
  mempool_stats: MempoolStats;
}

export interface ChainStats {
  tx_count: number;
  funded_txo_count: number;
  funded_txo_sum: number;
  spent_txo_count: number;
  spent_txo_sum: number;
}

export interface MempoolStats {
  tx_count: number;
  funded_txo_count: number;
  funded_txo_sum: number;
  spent_txo_count: number;
  spent_txo_sum: number;
}

export interface Block {
  id: string;
  height: number;
  version: number;
  timestamp: number;
  mediantime: number;
  bits: number;
  nonce: number;
  merkle_root: string;
  tx_count: number;
  size: number;
  weight: number;
  previousblockhash: string;
}

export interface BlockStatus {
  in_best_chain: boolean;
  next_best: string | null;
}

export interface MempoolBacklog {
  count: number;
  vsize: number;
  total_fee: number;
  fee_histogram: FeeHistogram[];
}

export interface FeeHistogram {
  feerate: number;
  vsize: number;
}

export interface FeeEstimates {
  [propname: string]: number;
}

export interface Asset {
  asset_id: string;
  chain_stats: ChainStats;
  mempool_stats: MempoolStats;
  issuance_txin: IssuanceTxin;
  issuance_prevout: IssuancePrevout;
  reissuance_token: string;
  contract_hash: string;
  status: TransactionStatus;
}

export interface IssuanceTxin {
  txid: string;
  vin: number;
}

export interface IssuancePrevout {
  txid: string;
  vout: number;
}

export interface Pegout {
  genesis_hash: string;
  scriptpubkey: string;
  scriptpubkey_asm: string;
  scriptpubkey_address: string;
}

export interface Witness {
  txid: string;
  vin: number;
  scriptsig: string;
  scriptsig_asm: string;
  inner_redeemscript_asm: string;
  inner_witnessscript_asm: string;
  sequence: number;
}

export interface Prevout {
  txid: string;
  vout: number;
  scriptpubkey: string;
  scriptpubkey_asm: string;
  scriptpubkey_type: string;
  scriptpubkey_address: string;
  value: number;
}

export interface Issuance {
  asset_id: string;
  is_reissuance: boolean;
  asset_blinding_nonce: string;
  asset_entropy: string;
  contract_hash: string;
  assetamount: number;
  tokenamount: number;
}
