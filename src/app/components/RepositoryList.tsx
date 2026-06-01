import { Star, GitFork, Code, ExternalLink, Clock } from 'lucide-react';

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

interface RepositoryListProps {
  repos: Repository[];
  username: string;
}

const languageColors: Record<string, string> = {
  JavaScript: 'bg-yellow-400',
  TypeScript: 'bg-blue-500',
  Python: 'bg-blue-600',
  Java: 'bg-red-500',
  Go: 'bg-cyan-500',
  Rust: 'bg-orange-600',
  Ruby: 'bg-red-600',
  PHP: 'bg-purple-500',
  C: 'bg-gray-600',
  'C++': 'bg-pink-500',
  'C#': 'bg-green-600',
  HTML: 'bg-orange-500',
  CSS: 'bg-blue-400',
  Shell: 'bg-green-500',
};

export function RepositoryList({ repos, username }: RepositoryListProps) {
  if (repos.length === 0) {
    return (
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 text-center">
        <p className="text-gray-400">No public repositories found</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Updated today';
    if (diffDays === 1) return 'Updated yesterday';
    if (diffDays < 30) return `Updated ${diffDays} days ago`;
    if (diffDays < 365) return `Updated ${Math.floor(diffDays / 30)} months ago`;
    return `Updated ${Math.floor(diffDays / 365)} years ago`;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Recent Repositories</h2>
        <a
          href={`https://github.com/${username}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-400 hover:text-purple-300 flex items-center gap-2"
        >
          View all
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      <div className="grid gap-4">
        {repos.map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-purple-500 transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-purple-400" />
                <h3 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors">
                  {repo.name}
                </h3>
              </div>

              <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
            </div>

            {repo.description && (
              <p className="text-gray-400 mb-4">{repo.description}</p>
            )}

            <div className="flex items-center gap-6 text-sm text-gray-400">
              {repo.language && (
                <div className="flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      languageColors[repo.language] || 'bg-gray-500'
                    }`}
                  />
                  <span>{repo.language}</span>
                </div>
              )}

              <div className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                <span>{repo.stargazers_count.toLocaleString()}</span>
              </div>

              <div className="flex items-center gap-1">
                <GitFork className="w-4 h-4" />
                <span>{repo.forks_count.toLocaleString()}</span>
              </div>

              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{formatDate(repo.updated_at)}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
