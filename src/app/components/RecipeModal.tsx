import { X, Clock, Users, Heart } from 'lucide-react';

interface RecipeDetails {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  summary: string;
  instructions: string;
  extendedIngredients: { name: string; amount: number; unit: string }[];
}

interface RecipeModalProps {
  recipe: RecipeDetails | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function RecipeModal({ recipe, onClose, isFavorite, onToggleFavorite }: RecipeModalProps) {
  if (!recipe) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header image */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h2 className="text-3xl font-bold text-white mb-2">{recipe.title}</h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Meta info */}
            <div className="flex items-center gap-6 mb-6 pb-6 border-b">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span>{recipe.readyInMinutes} minutes</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-5 h-5" />
                <span>{recipe.servings} servings</span>
              </div>

              <button
                onClick={onToggleFavorite}
                className="ml-auto flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
                  }`}
                />
                <span className="font-medium">
                  {isFavorite ? 'Saved' : 'Save Recipe'}
                </span>
              </button>
            </div>

            {/* Summary */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">About</h3>
              <p className="text-gray-600 leading-relaxed">{recipe.summary}</p>
            </div>

            {/* Ingredients */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Ingredients</h3>
              <div className="bg-orange-50 rounded-lg p-4">
                <ul className="space-y-2">
                  {recipe.extendedIngredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                      <span className="w-2 h-2 bg-orange-600 rounded-full" />
                      <span className="font-medium">
                        {ingredient.amount} {ingredient.unit}
                      </span>
                      <span>{ingredient.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Instructions */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Instructions</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {recipe.instructions}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
