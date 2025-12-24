import React from 'react';
import type { Category } from '../services/categoriesService';

interface CategoryBadgeProps {
    category: Category;
    onRemove?: () => void;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, onRemove }) => {
    return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary text-white rounded-full text-xs font-medium">
            {category.name}
            {onRemove && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove();
                    }}
                    className="bg-transparent border-none text-white cursor-pointer p-0 flex items-center text-sm hover:text-red-200 transition-colors"
                    aria-label={`Remove ${category.name}`}
                >
                    &times;
                </button>
            )}
        </span>
    );
};

export default CategoryBadge;
