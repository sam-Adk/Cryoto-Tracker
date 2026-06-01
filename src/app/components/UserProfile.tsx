import { MapPin, Link as LinkIcon, Twitter, Building, Calendar, Users, UserPlus } from 'lucide-react';

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  location: string;
  blog: string;
  twitter_username: string;
  company: string;
  created_at: string;
}

interface UserProfileProps {
  user: GitHubUser;
}

export function UserProfile({ user }: UserProfileProps) {
  const joinDate = new Date(user.created_at).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden">
      <div className="relative h-32 bg-gradient-to-r from-purple-600 to-blue-600" />

      <div className="px-6 pb-6">
        {/* Avatar */}
        <div className="relative -mt-16 mb-4">
          <img
            src={user.avatar_url}
            alt={user.name}
            className="w-32 h-32 rounded-full border-4 border-gray-800 shadow-xl"
          />
        </div>

        {/* User info */}
        <div className="mb-4">
          <h2 className="text-3xl font-bold text-white mb-1">{user.name || user.login}</h2>
          <a
            href={`https://github.com/${user.login}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 text-lg"
          >
            @{user.login}
          </a>
        </div>

        {user.bio && <p className="text-gray-300 mb-4 text-lg">{user.bio}</p>}

        {/* Meta information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          {user.company && (
            <div className="flex items-center gap-2 text-gray-300">
              <Building className="w-5 h-5 text-gray-400" />
              <span>{user.company}</span>
            </div>
          )}

          {user.location && (
            <div className="flex items-center gap-2 text-gray-300">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span>{user.location}</span>
            </div>
          )}

          {user.blog && (
            <div className="flex items-center gap-2 text-gray-300">
              <LinkIcon className="w-5 h-5 text-gray-400" />
              <a
                href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-400 truncate"
              >
                {user.blog}
              </a>
            </div>
          )}

          {user.twitter_username && (
            <div className="flex items-center gap-2 text-gray-300">
              <Twitter className="w-5 h-5 text-gray-400" />
              <a
                href={`https://twitter.com/${user.twitter_username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-400"
              >
                @{user.twitter_username}
              </a>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 pt-4 border-t border-gray-700">
          <div className="flex items-center gap-2 text-gray-300">
            <Users className="w-5 h-5 text-gray-400" />
            <span className="font-semibold text-white">{user.followers}</span>
            <span className="text-sm">followers</span>
          </div>

          <div className="flex items-center gap-2 text-gray-300">
            <UserPlus className="w-5 h-5 text-gray-400" />
            <span className="font-semibold text-white">{user.following}</span>
            <span className="text-sm">following</span>
          </div>

          <div className="flex items-center gap-2 text-gray-300">
            <Calendar className="w-5 h-5 text-gray-400" />
            <span className="text-sm">Joined {joinDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
