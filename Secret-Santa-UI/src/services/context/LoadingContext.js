import React, { createContext, useContext, useState, useEffect } from "react";
import { setupInterceptors } from '../axionsInstance';

// Create Context
const LoadingContext = createContext();

// Create Provider Component
export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = (show) => {
    if (show) {
      setIsLoading(true);
    }
  };

  const stopLoading = (show) => {
    if (show) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setupInterceptors(startLoading, stopLoading);
  }, []);

  return (
    <LoadingContext.Provider value={{ startLoading, stopLoading, isLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};


// Custom Hook to Use Loading Context
export const useLoading = () => {
  const context = useContext(LoadingContext);
  console.log('LoadingContext:', context);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
