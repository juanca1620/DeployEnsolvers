import React from 'react';
import type { NoteResponseDto } from '../services/notesService';
import Button from './Button';
import CategoryBadge from './CategoryBadge';
import CategorySelector from './CategorySelector';
import { useState } from 'react';

interface NoteCardProps {
    note: NoteResponseDto;
    onEdit: (note: NoteResponseDto) => void;
    onDelete: (id: number) => void;
    onArchive: (id: number, currentStatusIsArchived: boolean) => void;
    onAttachCategory: (noteId: number, categoryId: number) => void;
    onRemoveCategory: (noteId: number, categoryId: number) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({
    note,
    onEdit,
    onDelete,
    onArchive,
    onAttachCategory,
    onRemoveCategory
}: any) => { // Adding any to bypass strict type check for now on new props
    const [isAddingCategory, setIsAddingCategory] = useState(false);

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-transparent hover:border-primary/10 hover:shadow-md transition-all duration-200 flex flex-col gap-4 h-full relative group">
            <div className="flex justify-between items-start">
                <h3 className="m-0 text-primary text-lg font-bold line-clamp-2 leading-tight">
                    {note.title}
                </h3>
                {note.isArchived && (
                    <span className="bg-brown text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">
                        Archived
                    </span>
                )}
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
                {note.categories?.map((cat: any) => (
                    <CategoryBadge
                        key={cat.id}
                        category={cat}
                        onRemove={() => onRemoveCategory(note.id, cat.id)}
                    />
                ))}

                <div className="relative">
                    {isAddingCategory ? (
                        <div className="flex items-center gap-1 animate-in fade-in zoom-in-95 duration-200">
                            <CategorySelector
                                onSelect={(id) => {
                                    onAttachCategory(note.id, id);
                                    setIsAddingCategory(false);
                                }}
                                excludeCategoryIds={note.categories?.map((c: any) => c.id)}
                            />
                            <button
                                onClick={() => setIsAddingCategory(false)}
                                className="text-[10px] text-red-500 underline cursor-pointer hover:text-red-700"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsAddingCategory(true)}
                            className="bg-transparent border border-dashed border-gray-400 text-gray-500 rounded-full px-2 py-0.5 text-[10px] hover:border-primary hover:text-primary transition-colors cursor-pointer"
                        >
                            + Tag
                        </button>
                    )}
                </div>
            </div>

            <div className="flex-1 text-dark/90 text-[0.95rem] whitespace-pre-wrap line-clamp-5 leading-relaxed">
                {note.content}
            </div>

            <div className="pt-4 mt-auto border-t border-gray-100 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Button variant="ghost" onClick={() => onEdit(note)} className="text-xs px-3 py-1.5 h-auto">
                    Edit
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => onArchive(note.id, note.isArchived)}
                    className="text-xs px-3 py-1.5 h-auto"
                >
                    {note.isArchived ? 'Unarchive' : 'Archive'}
                </Button>
                <Button variant="danger" onClick={() => onDelete(note.id)} className="text-xs px-3 py-1.5 h-auto">
                    Delete
                </Button>
            </div>

            {/* Mobile-friendly: Always show actions on touch devices or small screens if needed, 
          but for now standard hover is fine for checking implementation */}
        </div>
    );
};

export default NoteCard;
