import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { noteSchema, type NoteForm as NoteFormType } from '../validators/noteValidators';
import Button from './Button';
import Input from './Input';

interface NoteFormProps {
    defaultValues?: NoteFormType;
    onSubmit: (data: NoteFormType) => Promise<boolean>;
    onCancel: () => void;
    isLoading?: boolean;
}

const NoteForm: React.FC<NoteFormProps> = ({ defaultValues, onSubmit, onCancel, isLoading }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<NoteFormType>({
        resolver: zodResolver(noteSchema),
        defaultValues: defaultValues || { title: '', content: '' }
    });

    const handleFormSubmit = async (data: NoteFormType) => {
        await onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
            <Input
                label="Title"
                {...register('title')}
                error={errors.title?.message}
                placeholder="Enter note title..."
            />

            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-primary">
                    Content
                </label>
                <textarea
                    {...register('content')}
                    className="w-full p-3 rounded-md border border-primary/20 bg-white font-sans text-base min-h-[150px] outline-none resize-y focus:ring-2 focus:ring-primary/50 focus:border-primary placeholder:text-gray-400 transition-all"
                    placeholder="Enter note content..."
                />
                {errors.content && (
                    <span className="text-accent text-xs">
                        {errors.content.message}
                    </span>
                )}
            </div>

            <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-100">
                <Button type="button" variant="ghost" onClick={onCancel} disabled={isLoading}>
                    Cancel
                </Button>
                <Button type="submit" isLoading={isLoading}>
                    {defaultValues ? 'Update Note' : 'Create Note'}
                </Button>
            </div>
        </form>
    );
};

export default NoteForm;
