import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';

interface MarketStatsProps {
  totalMarketCap: number;
  total24hVolume: number;
  gainers: number;
  losers: number;
}

export function MarketStats({ totalMarketCap, total24hVolume, gainers, losers }: MarketStatsProps) {
  const formatLargeNumber = (num: number) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toLocaleString()}`;
  };

  const stats = [
    {
      icon: DollarSign,
      label: 'Total Market Cap',
      value: formatLargeNumber(totalMarketCap),
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Activity,
      label: '24h Volume',
      value: formatLargeNumber(total24hVolume),
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: TrendingUp,
      label: 'Gainers',
      value: gainers.toString(),
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: TrendingDown,
      label: 'Losers',
      value: losers.toString(),
      color: 'from-red-500 to-orange-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-purple-500 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>

            <div>
              <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
