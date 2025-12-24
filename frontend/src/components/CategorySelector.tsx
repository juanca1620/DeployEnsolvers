import React, { useEffect, useState } from 'react';
import { type Category, categoriesService } from '../services/categoriesService';

interface CategorySelectorProps {
    onSelect: (categoryId: number) => void;
    excludeCategoryIds?: number[];
    selectedCategoryId?: number;
}

const CategorySelector: React.FC<CategorySelectorProps> = (props) => {
    const { onSelect, excludeCategoryIds = [] } = props;
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const data = await categoriesService.getAll();
            setCategories(data);
            return data;
        } catch (error) {
            console.error("Failed to load categories", error);
            return [];
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchCategories();
            setSearchTerm('');
        }
    }, [isOpen]);

    const handleCreate = async () => {
        const trimmedTerm = searchTerm.trim();
        if (!trimmedTerm) return;

        setIsCreating(true);
        try {
            // Check if already exists locally (case insensitive)
            const existing = categories.find(c => c.name.toLowerCase() === trimmedTerm.toLowerCase());
            if (existing) {
                onSelect(existing.id);
            } else {
                await categoriesService.create(trimmedTerm);
                // Since backend doesn't return the object, we re-fetch
                const updatedCategories = await fetchCategories();
                const newCat = updatedCategories.find(c => c.name.toLowerCase() === trimmedTerm.toLowerCase());
                if (newCat) {
                    onSelect(newCat.id);
                }
            }
            setIsOpen(false);
        } catch (error) {
            console.error("Failed to create category", error);
        } finally {
            setIsCreating(false);
        }
    };

    // Filter available categories by exclusion list AND search term
    const availableCategories = categories.filter(c =>
        !excludeCategoryIds.includes(c.id) &&
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative inline-block">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-transparent border border-dashed border-primary text-primary rounded-full px-3 py-1 cursor-pointer text-xs flex items-center gap-1 hover:bg-primary hover:text-white transition-colors"
                title="Manage Categories"
            >
                {/* Simple logic: if used as filter, we might want to show selected but CategorySelector is generic 'picker' */}
                {/* The user issue is likely about the FILTER selector not showing what's picked. */}
                {/* For the 'add tag' feature, '+ Add Category' is fine. */}
                {/* For filter, we need to pass 'selectedId' and show name. */}
                <span>{props.selectedCategoryId ? categories.find(c => c.id === props.selectedCategoryId)?.name : '+ Add/Select Category'}</span>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl p-2 min-w-[200px] z-50 border border-gray-100 animate-in fade-in zoom-in-95 duration-100">
                    <div className="mb-2 px-1">
                        <input
                            type="text"
                            placeholder="Search or create..."
                            className="w-full text-xs p-1.5 border border-gray-200 rounded focus:border-primary focus:outline-none bg-gray-50 text-dark"
                            autoFocus
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleCreate();
                                }
                            }}
                        />
                    </div>

                    {loading ? (
                        <div className="p-2 text-gray-500 text-sm italic">Loading...</div>
                    ) : (
                        <div className="flex flex-col gap-1 max-h-48 overflow-y-auto">
                            {availableCategories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => {
                                        onSelect(cat.id);
                                        setIsOpen(false);
                                    }}
                                    className="text-left p-2 bg-transparent border-none rounded cursor-pointer hover:bg-cream transition-colors text-dark text-sm flex justify-between items-center group"
                                >
                                    <span>{cat.name}</span>
                                    <span className="text-[10px] text-primary opacity-0 group-hover:opacity-100 transition-opacity">Select</span>
                                </button>
                            ))}

                            {/* Show create option if search term exists and doesn't exactly match an existing available category 
                                (or even if it matches a hidden one, we might want to just select it, but logic above handles exact match on create)
                            */}
                            {searchTerm.trim() && !availableCategories.find(c => c.name.toLowerCase() === searchTerm.trim().toLowerCase()) && (
                                <button
                                    onClick={handleCreate}
                                    disabled={isCreating}
                                    className="text-left p-2 bg-primary/5 border-none rounded cursor-pointer hover:bg-primary/10 transition-colors text-primary text-sm font-medium mt-1"
                                >
                                    {isCreating ? 'Creating...' : `+ Create "${searchTerm}"`}
                                </button>
                            )}

                            {availableCategories.length === 0 && !searchTerm && (
                                <div className="p-2 text-gray-400 text-xs text-center">No other categories</div>
                            )}
                        </div>
                    )}

                    <div className="mt-2 pt-2 border-t border-gray-100 flex justify-end">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="bg-transparent border-none text-xs text-gray-500 hover:text-dark cursor-pointer font-medium"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategorySelector;
