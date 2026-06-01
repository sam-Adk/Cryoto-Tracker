import { useState } from 'react';
import { Plus } from 'lucide-react';

interface IngredientInputProps {
  onAddIngredient: (ingredient: string) => void;
}

export function IngredientInput({ onAddIngredient }: IngredientInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAddIngredient(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add an ingredient (e.g., chicken, tomato, pasta...)"
        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
      />
      <button
        type="submit"
        disabled={!input.trim()}
        className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
      >
        <Plus className="w-5 h-5" />
        Add
      </button>
    </form>
  );
}
