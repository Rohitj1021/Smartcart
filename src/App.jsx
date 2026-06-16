import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { PantryProvider } from './contexts/PantryContext';
import PrivateRoute from './components/Common/PrivateRoute';
import Layout from './components/Layout/Layout';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Pantry from './pages/Pantry';
import ShoppingListPage from './pages/ShoppingListPage';
import RecipesPage from './pages/RecipesPage';
import MealPlannerPage from './pages/MealPlannerPage';
import AnalyticsPage from './pages/AnalyticsPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PantryProvider>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoute />}>
              <Route element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/pantry" element={<Pantry />} />
                <Route path="/shopping-list" element={<ShoppingListPage />} />
                <Route path="/recipes" element={<RecipesPage />} />
                <Route path="/meal-planner" element={<MealPlannerPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
              </Route>
            </Route>
          </Routes>
        </PantryProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;