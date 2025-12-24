import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import NotesPage from './pages/NotesPage';
// import { useAuth } from './hooks/useAuth'; // Unused
// import './App.css'; // Removed as we use Tailwind now

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // const { isAuthenticated } = useAuth(); // Unused
  const storedUser = localStorage.getItem('user');

  if (!storedUser) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/login" element={<Navigate to="/auth/login" replace />} />
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <NotesPage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/notes" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
