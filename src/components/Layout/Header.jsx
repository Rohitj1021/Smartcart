import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { logout } from '../../services/auth';
import toast from 'react-hot-toast';

export default function Header() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out');
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-green-600">
          🛒 SmartCart
        </Link>
        {currentUser && (
          <nav className="space-x-4">
            <Link to="/" className="hover:text-green-600">Dashboard</Link>
            <Link to="/pantry" className="hover:text-green-600">Pantry</Link>
            <Link to="/shopping-list" className="hover:text-green-600">Shopping</Link>
            <Link to="/recipes" className="hover:text-green-600">Recipes</Link>
            <Link to="/meal-planner" className="hover:text-green-600">Meal Planner</Link>
            <Link to="/analytics" className="hover:text-green-600">Analytics</Link>
            <button onClick={handleLogout} className="text-red-500 hover:text-red-700">
              Logout
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}