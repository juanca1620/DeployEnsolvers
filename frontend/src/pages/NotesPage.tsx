import { useAuth } from '../hooks/useAuth';
import { useNotes } from '../hooks/useNotes';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NoteCard from '../components/NoteCard';
import NoteForm from '../components/NoteForm';
import Modal from '../components/Modal';
import Button from '../components/Button';
import CategorySelector from '../components/CategorySelector';
import { type NoteResponseDto } from '../services/notesService';
import { type NoteForm as NoteFormType } from '../validators/noteValidators';
import { useState } from 'react';

const NotesPage: React.FC = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const {
        notes, loading, error,
        createNote, updateNote, deleteNote, toggleArchive,
        setFilterActive, setFilterCategory, filterCategory,
        attachCategory, removeCategory
    } = useNotes(isAuthenticated);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingNote, setEditingNote] = useState<NoteResponseDto | null>(null);

    const handleCreate = () => {
        setEditingNote(null);
        setIsModalOpen(true);
    };

    const handleEdit = (note: NoteResponseDto) => {
        setEditingNote(note);
        setIsModalOpen(true);
    };

    const handleSubmit = async (data: NoteFormType) => {
        let success = false;
        if (editingNote) {
            success = await updateNote(editingNote.id, data.title, data.content);
        } else {
            success = await createNote(data.title, data.content);
        }

        if (success) {
            setIsModalOpen(false);
        }
        return success;
    };

    return (
        <div className="min-h-screen bg-cream">
            <Navbar user={user} onLogout={handleLogout} />

            <main className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-primary mb-2">My Notes</h1>
                        <div className="flex gap-4 text-sm font-medium">
                            <button
                                onClick={() => setFilterActive(undefined)}
                                className="text-primary hover:text-primary/80 underline decoration-2 underline-offset-4 cursor-pointer bg-transparent border-none p-0"
                            >
                                All
                            </button>
                            <button
                                onClick={() => setFilterActive(true)}
                                className="text-gray-600 hover:text-primary cursor-pointer bg-transparent border-none p-0 transition-colors"
                            >
                                Active
                            </button>
                            <button
                                onClick={() => setFilterActive(false)}
                                className="text-gray-600 hover:text-primary cursor-pointer bg-transparent border-none p-0 transition-colors"
                            >
                                Archived
                            </button>
                        </div>

                        <div className="mt-4 flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-600">Filter by Category:</span>
                            <div className="flex items-center gap-2">
                                <CategorySelector
                                    selectedCategoryId={filterCategory}
                                    onSelect={(id) => setFilterCategory(id)}
                                />
                                <button
                                    onClick={() => setFilterCategory(undefined)}
                                    className="text-xs text-primary underline hover:text-primary/80 cursor-pointer bg-transparent border-none"
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                    </div>

                    <Button onClick={handleCreate} className="shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                        + New Note
                    </Button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-accent text-white p-4 rounded-lg mb-8 shadow-md flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </div>
                )}

                {/* Loading State */}
                {loading && notes.length === 0 ? (
                    <div className="text-center py-20 text-gray-400">
                        <div className="animate-pulse flex flex-col items-center">
                            <div className="h-4 w-32 bg-gray-300 rounded mb-4"></div>
                            <div className="h-4 w-24 bg-gray-300 rounded"></div>
                        </div>
                    </div>
                ) : (
                    /* Notes Grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {notes.map(note => (
                            <NoteCard
                                key={note.id}
                                note={note}
                                onEdit={handleEdit}
                                onDelete={deleteNote}
                                onArchive={toggleArchive}
                                onAttachCategory={attachCategory}
                                onRemoveCategory={removeCategory}
                            />
                        ))}

                        {notes.length === 0 && !loading && (
                            <div className="col-span-full text-center py-16 text-gray-500 border-2 border-dashed border-primary/20 rounded-xl bg-white/50">
                                <p className="text-lg mb-2">No notes found</p>
                                <p className="text-sm">Create one to get started!</p>
                            </div>
                        )}
                    </div>
                )}
            </main>

            {/* Create/Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingNote ? 'Edit Note' : 'Create New Note'}
            >
                <NoteForm
                    defaultValues={editingNote ? { title: editingNote.title, content: editingNote.content } : undefined}
                    onSubmit={handleSubmit}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </div>
    );
};

export default NotesPage;
