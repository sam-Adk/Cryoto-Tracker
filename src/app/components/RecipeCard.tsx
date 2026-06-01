import { Heart, Clock } from 'lucide-react';

interface Recipe {
  id: number;
  title: string;
  image: string;
  usedIngredientCount: number;
  missedIngredientCount: number;
  likes: number;
}

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onClick: () => void;
}

export function RecipeCard({ recipe, isFavorite, onToggleFavorite, onClick }: RecipeCardProps) {
  const matchPercentage = Math.round(
    (recipe.usedIngredientCount / (recipe.usedIngredientCount + recipe.missedIngredientCount)) *
      100
  );

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      {/* Image */}
      <div className="relative h-48 overflow-hidden cursor-pointer" onClick={onClick}>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />

        {/* Match percentage badge */}
        <div className="absolute top-2 left-2 bg-green-500 text-white px-3 py-1 rounded-full font-semibold text-sm">
          {matchPercentage}% Match
        </div>

        {/* Favorite button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(recipe.id);
          }}
          className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 cursor-pointer" onClick={onClick}>
        <h3 className="font-semibold text-gray-800 text-lg mb-2 line-clamp-2">
          {recipe.title}
        </h3>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <span className="text-green-600 font-medium">
              {recipe.usedIngredientCount} ingredients
            </span>
            <span>you have</span>
          </div>

          {recipe.missedIngredientCount > 0 && (
            <span className="text-orange-600">
              +{recipe.missedIngredientCount} missing
            </span>
          )}
        </div>

        <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-1 text-gray-500">
            <Heart className="w-4 h-4" />
            <span className="text-sm">{recipe.likes} likes</span>
          </div>

          <button className="text-orange-600 hover:text-orange-700 font-medium text-sm">
            View Recipe →
          </button>
        </div>
      </div>
    </div>
  );
}
