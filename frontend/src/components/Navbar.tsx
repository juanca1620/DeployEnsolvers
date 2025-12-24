import React from 'react';

interface NavbarProps {
    user: { name: string } | null;
    onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
    return (
        <nav className="bg-primary px-8 py-4 text-white flex justify-between items-center shadow-md">
            <div className="text-xl font-bold font-sans tracking-tight">
                Notes App
            </div>

            {user && (
                <div className="flex items-center gap-6">
                    <span className="font-medium">Welcome, {user.name}</span>
                    <button
                        onClick={onLogout}
                        className="bg-transparent border border-white/30 text-white px-4 py-2 rounded text-sm hover:bg-white/10 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
