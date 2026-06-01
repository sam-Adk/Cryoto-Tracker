import { TrendingUp, TrendingDown, Star } from 'lucide-react';

interface Crypto {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  sparkline_in_7d?: { price: number[] };
}

interface CryptoCardProps {
  crypto: Crypto;
  isWatchlisted: boolean;
  onToggleWatchlist: (id: string) => void;
  onClick: () => void;
}

export function CryptoCard({ crypto, isWatchlisted, onToggleWatchlist, onClick }: CryptoCardProps) {
  const isPositive = crypto.price_change_percentage_24h >= 0;

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
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 hover:border-purple-500 transition-all cursor-pointer">
      <div className="flex items-center gap-4">
        {/* Crypto info */}
        <div className="flex items-center gap-4 flex-1" onClick={onClick}>
          <img src={crypto.image} alt={crypto.name} className="w-12 h-12 rounded-full" />

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-white text-lg">{crypto.name}</h3>
              <span className="text-gray-400 text-sm uppercase">{crypto.symbol}</span>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <span className="text-gray-400">Market Cap: {formatMarketCap(crypto.market_cap)}</span>
              <span className="text-gray-400">
                Vol: {formatMarketCap(crypto.total_volume)}
              </span>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="text-right" onClick={onClick}>
          <div className="text-2xl font-bold text-white mb-1">{formatPrice(crypto.current_price)}</div>

          <div
            className={`flex items-center gap-1 justify-end font-semibold ${
              isPositive ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>
              {isPositive ? '+' : ''}
              {crypto.price_change_percentage_24h.toFixed(2)}%
            </span>
          </div>
        </div>

        {/* Watchlist button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWatchlist(crypto.id);
          }}
          className="p-3 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Star
            className={`w-6 h-6 ${
              isWatchlisted ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'
            }`}
          />
        </button>
      </div>

      {/* 24h High/Low */}
      <div className="mt-4 pt-4 border-t border-gray-700" onClick={onClick}>
        <div className="flex items-center justify-between text-sm">
          <div>
            <span className="text-gray-400">24h Low: </span>
            <span className="text-red-400 font-semibold">{formatPrice(crypto.low_24h)}</span>
          </div>
          <div>
            <span className="text-gray-400">24h High: </span>
            <span className="text-green-400 font-semibold">{formatPrice(crypto.high_24h)}</span>
          </div>
        </div>

        {/* Price range bar */}
        <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
            style={{
              width: `${
                ((crypto.current_price - crypto.low_24h) / (crypto.high_24h - crypto.low_24h)) *
                100
              }%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
