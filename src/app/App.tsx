import { useState, useEffect } from 'react';
import { TrendingUp, Search, Star, Loader2, RefreshCw } from 'lucide-react';
import { CryptoCard } from './components/CryptoCard';
import { PriceChart } from './components/PriceChart';
import { MarketStats } from './components/MarketStats';

// CoinGecko API - Free, no API key required!
const API_BASE = 'https://api.coingecko.com/api/v3';

interface Crypto {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  circulating_supply: number;
  high_24h: number;
  low_24h: number;
  sparkline_in_7d?: { price: number[] };
}

export default function App() {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [filteredCryptos, setFilteredCryptos] = useState<Crypto[]>([]);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState<Crypto | null>(null);
  const [loading, setLoading] = useState(true);
  const [showWatchlist, setShowWatchlist] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Load watchlist from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('crypto-watchlist');
    if (saved) {
      setWatchlist(JSON.parse(saved));
    }
  }, []);

  // Save watchlist to localStorage
  useEffect(() => {
    localStorage.setItem('crypto-watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  // Fetch crypto data
  const fetchCryptos = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h`
      );
      const data = await response.json();
      setCryptos(data);
      setFilteredCryptos(data);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error fetching crypto data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchCryptos();
  }, []);

  // Auto-refresh every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchCryptos();
    }, 60000); // 60 seconds

    return () => clearInterval(interval);
  }, []);

  // Filter cryptos based on search and watchlist
  useEffect(() => {
    let filtered = cryptos;

    if (searchQuery) {
      filtered = filtered.filter(
        (crypto) =>
          crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (showWatchlist) {
      filtered = filtered.filter((crypto) => watchlist.includes(crypto.id));
    }

    setFilteredCryptos(filtered);
  }, [searchQuery, showWatchlist, cryptos, watchlist]);

  const toggleWatchlist = (cryptoId: string) => {
    setWatchlist((prev) =>
      prev.includes(cryptoId) ? prev.filter((id) => id !== cryptoId) : [...prev, cryptoId]
    );
  };

  const formatLastUpdate = () => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - lastUpdate.getTime()) / 1000);

    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  // Calculate market stats
  const totalMarketCap = cryptos.reduce((sum, crypto) => sum + crypto.market_cap, 0);
  const total24hVolume = cryptos.reduce((sum, crypto) => sum + crypto.total_volume, 0);
  const gainers = cryptos.filter((c) => c.price_change_percentage_24h > 0).length;
  const losers = cryptos.filter((c) => c.price_change_percentage_24h < 0).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Header */}
      <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-10 h-10 text-purple-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">Crypto Tracker</h1>
                <p className="text-gray-400 text-sm">Live prices • Updated {formatLastUpdate()}</p>
              </div>
            </div>

            <button
              onClick={fetchCryptos}
              disabled={loading}
              className="p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cryptocurrencies..."
              className="w-full pl-12 pr-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all"
            />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {/* Market stats */}
        <MarketStats
          totalMarketCap={totalMarketCap}
          total24hVolume={total24hVolume}
          gainers={gainers}
          losers={losers}
        />

        {/* Filter buttons */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setShowWatchlist(false)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              !showWatchlist
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            All Cryptos ({cryptos.length})
          </button>
          <button
            onClick={() => setShowWatchlist(true)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              showWatchlist
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <Star className={`w-4 h-4 ${showWatchlist ? 'fill-white' : ''}`} />
            Watchlist ({watchlist.length})
          </button>
        </div>

        {/* Loading state */}
        {loading && cryptos.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-16 h-16 text-purple-400 animate-spin mb-4" />
            <p className="text-white text-lg">Loading crypto data...</p>
          </div>
        )}

        {/* Crypto list */}
        {!loading && filteredCryptos.length > 0 && (
          <div className="space-y-3">
            {filteredCryptos.map((crypto) => (
              <CryptoCard
                key={crypto.id}
                crypto={crypto}
                isWatchlisted={watchlist.includes(crypto.id)}
                onToggleWatchlist={toggleWatchlist}
                onClick={() => setSelectedCrypto(crypto)}
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && filteredCryptos.length === 0 && (
          <div className="text-center py-20">
            <Star className="w-24 h-24 text-gray-600 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-white mb-4">
              {showWatchlist ? 'No cryptocurrencies in watchlist' : 'No results found'}
            </h2>
            <p className="text-gray-400">
              {showWatchlist
                ? 'Click the star icon on any cryptocurrency to add it to your watchlist'
                : 'Try a different search term'}
            </p>
          </div>
        )}
      </main>

      {/* Price chart modal */}
      {selectedCrypto && (
        <PriceChart crypto={selectedCrypto} onClose={() => setSelectedCrypto(null)} />
      )}
    </div>
  );
}