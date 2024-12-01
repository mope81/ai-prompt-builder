import React, { Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Prompt from './pages/Prompt';
import Learn from './pages/Learn';
import Community from './pages/Community';
import GlobalLoadingIndicator from './components/GlobalLoadingIndicator';
import ErrorBoundaryFallback from './components/ErrorBoundaryFallback';
import { LoadingProvider } from './contexts/LoadingContext';
import NotFound from './components/NotFound';
import TestErrorHandling from './components/TestErrorHandling';

function AppContent() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // 模拟初始化过程
    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (!isInitialized) {
    return <GlobalLoadingIndicator />;
  }

  return (
    <div className="min-h-screen bg-[#0B0F17] text-white">
      <Navbar />
      <Suspense fallback={<GlobalLoadingIndicator />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prompt" element={<Prompt />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/community" element={<Community />} />
          <Route path="/test" element={<TestErrorHandling />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
      <LoadingProvider>
        <Router>
          <AppContent />
        </Router>
      </LoadingProvider>
    </ErrorBoundary>
  );
}