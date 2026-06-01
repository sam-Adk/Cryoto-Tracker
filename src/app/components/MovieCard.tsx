import { Star } from 'lucide-react';

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    poster_path: string | null;
    vote_average: number;
    release_date: string;
  };
  onClick: () => void;
}

export function MovieCard({ movie, onClick }: MovieCardProps) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer transition-transform duration-300 hover:scale-105"
    >
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        <img
          src={imageUrl}
          alt={movie.title}
          className="w-full h-[450px] object-cover"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h3 className="text-white font-semibold text-lg mb-2">{movie.title}</h3>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-white text-sm">{movie.vote_average.toFixed(1)}</span>
            </div>

            {movie.release_date && (
              <span className="text-gray-300 text-sm">
                {new Date(movie.release_date).getFullYear()}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
