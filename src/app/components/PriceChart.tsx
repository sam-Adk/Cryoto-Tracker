import { X, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface Crypto {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  circulating_supply: number;
  sparkline_in_7d?: { price: number[] };
}

interface PriceChartProps {
  crypto: Crypto;
  onClose: () => void;
}

export function PriceChart({ crypto, onClose }: PriceChartProps) {
  const isPositive = crypto.price_change_percentage_24h >= 0;

  // Transform sparkline data for chart
  const chartData =
    crypto.sparkline_in_7d?.price.map((price, index) => ({
      time: index,
      price: price,
    })) || [];

  const formatPrice = (price: number) => {
    if (price < 0.01) return `$${price.toFixed(6)}`;
    if (price < 1) return `$${price.toFixed(4)}`;
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`;
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
    return `$${marketCap.toLocaleString()}`;
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-gray-900 border border-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <div className="flex items-center gap-4">
              <img src={crypto.image} alt={crypto.name} className="w-16 h-16 rounded-full" />
              <div>
                <h2 className="text-3xl font-bold text-white">{crypto.name}</h2>
                <p className="text-gray-400 uppercase">{crypto.symbol}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          {/* Price info */}
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-end gap-4 mb-6">
              <div className="text-5xl font-bold text-white">
                {formatPrice(crypto.current_price)}
              </div>

              <div
                className={`flex items-center gap-2 text-xl font-semibold mb-2 ${
                  isPositive ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {isPositive ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />}
                <span>
                  {isPositive ? '+' : ''}
                  {crypto.price_change_percentage_24h.toFixed(2)}%
                </span>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-1">Market Cap</p>
                <p className="text-white text-xl font-semibold">
                  {formatMarketCap(crypto.market_cap)}
                </p>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-1">Circulating Supply</p>
                <p className="text-white text-xl font-semibold">
                  {crypto.circulating_supply.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}{' '}
                  {crypto.symbol.toUpperCase()}
                </p>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="p-6">
            <h3 className="text-xl font-semibold text-white mb-4">7 Day Price Chart</h3>

            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={isPositive ? '#10b981' : '#ef4444'}
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor={isPositive ? '#10b981' : '#ef4444'}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" hide />
                  <YAxis
                    domain={['auto', 'auto']}
                    hide
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                    formatter={(value: number) => [formatPrice(value), 'Price']}
                  />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke={isPositive ? '#10b981' : '#ef4444'}
                    strokeWidth={2}
                    fill="url(#colorPrice)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-20 text-gray-400">
                Chart data not available
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
