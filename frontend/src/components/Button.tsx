import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    isLoading,
    className = '',
    disabled,
    ...props
}) => {
    const baseStyles = "px-6 py-3 rounded-lg font-semibold transition-all duration-200 inline-flex items-center justify-center gap-2 font-sans";

    const variants = {
        primary: "bg-primary text-white shadow-sm hover:bg-opacity-90",
        secondary: "bg-brown text-white shadow-sm hover:bg-opacity-90",
        danger: "bg-accent text-white shadow-sm hover:bg-opacity-90",
        ghost: "bg-transparent text-primary hover:bg-primary/10 p-2"
    };

    const disabledStyles = "opacity-60 cursor-not-allowed transform-none";
    const activeStyles = "transform active:scale-95";

    return (
        <button
            className={`
        ${baseStyles}
        ${variants[variant]}
        ${(disabled || isLoading) ? disabledStyles : activeStyles}
        ${className}
      `}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                </span>
            ) : children}
        </button>
    );
};

export default Button;
