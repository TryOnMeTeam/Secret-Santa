import React, { useEffect } from 'react';
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
import { LoadingProvider } from "./services/context/LoadingContext";
import "./App.css";
import GameStatus from './pages/dashboard/game-status/GameStatus';
import { setupInterceptors } from './services/axionsInstance';
import Spinner from './pages/spinner/spinner';
import { useLoading } from './services/context/LoadingContext';

const App = () => {
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    setupInterceptors(startLoading, stopLoading);
  }, [startLoading, stopLoading]);

  return (
    <LoadingProvider>
      <AlertProvider>
        <Router>
          <AuthProvider>
            <Spinner />
            <AlertComponent />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/secret-santa"
                element={<ProtectedRoute element={<Dashboard />} />}
              />
              <Route
                path="/game"
                element={<ProtectedRoute element={<GamePlay />} />}
              />
              <Route
                path="/wishlist"
                element={<ProtectedRoute element={<WishlistPage />} />}
              />
              <Route
                path="/chat"
                element={<ProtectedRoute element={<SecretSantaChat />} />}
              />
              <Route
                path="/gameStatus"
                element={<ProtectedRoute element={<GameStatus />} />}
              />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/game" element={<GamePlay />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/chat" element={<SecretSantaChat />} />
              <Route path="/gameStatus" element={<GameStatus />} />
            </Routes>
          </AuthProvider>
        </Router>
      </AlertProvider>
    </LoadingProvider>
  );
};


export default App;
