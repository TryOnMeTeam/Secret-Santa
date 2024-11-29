import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './services/context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/auth/login/LoginPage';
import RegisterPage from './pages/auth/register/RegisterPage';
import HomePage from './pages/HomePage';
import AlertComponent from './components/Alert/AlertComponent';
import { AlertProvider } from './services/context/AlertContext';
import SecretSantaChat from './features/SecretSantaChat';
import Dashboard from "./pages/dashboard/Dashboard";
import WishlistPage from './pages/dashboard/join-game/WishlistPage';
import GamePlay from '../src/pages/join-game/GamePlay';
import "./App.css";
import GameStatus from './pages/dashboard/game-status/GameStatus';

const App = () => {
  return (
    <AlertProvider>  {/* Wrap AlertProvider */}
      <Router>  {/* Wrap the entire app with Router */}
        <AuthProvider>  {/* Wrap AuthProvider inside Router */}
          <AlertComponent />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/secret-santa"
              element={<ProtectedRoute element={<Dashboard />} />}
            />
            <Route path="/dashboard" element = {<Dashboard />}/>
            <Route path="/game" element = {<GamePlay />}/>
            <Route path="/wishlist" element = {<WishlistPage />} />
            <Route path="/chat" element = {<SecretSantaChat />} />
            <Route path="/gameStatus" element = {<GameStatus />} />
          </Routes>
        </AuthProvider>
      </Router>
    </AlertProvider>
  );
};

export default App;
