import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl p-8 max-w-lg w-[90%] shadow-xl transform transition-all scale-100">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-primary m-0">{title}</h2>
                    <button
                        onClick={onClose}
                        className="bg-none border-none text-2xl cursor-pointer text-gray-500 hover:text-dark transition-colors"
                        aria-label="Close"
                    >
                        &times;
                    </button>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
