import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
    return (
        <div className="flex flex-col gap-2 mb-4 w-full">
            {label && (
                <label className="text-sm font-semibold text-primary">
                    {label}
                </label>
            )}
            <input
                className={`
          w-full p-3 rounded-md border border-primary/20 bg-white font-sans text-base outline-none
          focus:ring-2 focus:ring-primary/50 focus:border-primary
          placeholder:text-gray-400 transition-all duration-200
          ${error ? 'border-accent focus:ring-accent/50 focus:border-accent' : ''}
          ${className}
        `}
                {...props}
            />
            {error && (
                <span className="text-accent text-xs">
                    {error}
                </span>
            )}
        </div>
    );
};

export default Input;
