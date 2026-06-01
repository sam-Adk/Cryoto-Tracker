import { FolderGit2, Star, GitFork, Code } from 'lucide-react';

interface GitHubUser {
  public_repos: number;
}

interface Repository {
  stargazers_count: number;
  forks_count: number;
  language: string;
}

interface StatsCardsProps {
  user: GitHubUser;
  repos: Repository[];
}

export function StatsCards({ user, repos }: StatsCardsProps) {
  // Calculate total stars across all repos
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

  // Calculate total forks across all repos
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

  // Find most used language
  const languageCounts: Record<string, number> = {};
  repos.forEach((repo) => {
    if (repo.language) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
    }
  });

  const mostUsedLanguage = Object.entries(languageCounts).sort(
    ([, a], [, b]) => b - a
  )[0]?.[0] || 'N/A';

  const stats = [
    {
      icon: FolderGit2,
      label: 'Public Repos',
      value: user.public_repos.toLocaleString(),
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Star,
      label: 'Total Stars',
      value: totalStars.toLocaleString(),
      color: 'from-yellow-500 to-orange-600',
    },
    {
      icon: GitFork,
      label: 'Total Forks',
      value: totalForks.toLocaleString(),
      color: 'from-blue-500 to-cyan-600',
    },
    {
      icon: Code,
      label: 'Top Language',
      value: mostUsedLanguage,
      color: 'from-green-500 to-emerald-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-purple-500 transition-all"
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
