import { Star } from 'lucide-react';

interface FiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  minRating: number;
  onMinRatingChange: (rating: number) => void;
}

const categories = ['All', 'Electronics', 'Clothing', 'Home & Garden', 'Books', 'Sports'];

export function Filters({
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  minRating,
  onMinRatingChange,
}: FiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Filters</h2>

      {/* Category filter */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-3">Category</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Price range filter */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-3">Price Range</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Min:</span>
            <input
              type="range"
              min="0"
              max="500"
              step="10"
              value={priceRange[0]}
              onChange={(e) =>
                onPriceRangeChange([Number(e.target.value), priceRange[1]])
              }
              className="flex-1"
            />
            <span className="text-sm font-semibold text-gray-800 w-12">
              ${priceRange[0]}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Max:</span>
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={priceRange[1]}
              onChange={(e) =>
                onPriceRangeChange([priceRange[0], Number(e.target.value)])
              }
              className="flex-1"
            />
            <span className="text-sm font-semibold text-gray-800 w-12">
              ${priceRange[1]}
            </span>
          </div>

          <div className="text-center text-sm text-gray-600 bg-gray-50 rounded p-2">
            ${priceRange[0]} - ${priceRange[1]}
          </div>
        </div>
      </div>

      {/* Rating filter */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-3">Minimum Rating</h3>
        <div className="space-y-2">
          {[0, 3, 4, 4.5].map((rating) => (
            <button
              key={rating}
              onClick={() => onMinRatingChange(rating)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                minRating === rating
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {rating === 0 ? (
                'All Ratings'
              ) : (
                <>
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  {rating}+ Stars
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Reset filters button */}
      <button
        onClick={() => {
          onCategoryChange('All');
          onPriceRangeChange([0, 1000]);
          onMinRatingChange(0);
        }}
        className="w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
      >
        Reset Filters
      </button>
    </div>
  );
}
