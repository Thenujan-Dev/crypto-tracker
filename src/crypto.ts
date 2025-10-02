export type HistoricalDataItem = [number, number];

export interface HistoricalData {
  prices: HistoricalDataItem[];
  market_caps: HistoricalDataItem[];
  total_volumes: HistoricalDataItem[];
}
