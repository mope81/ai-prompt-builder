import React, { Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
        <LoadingProvider>
          <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col">
            <Navbar />
            <Suspense fallback={<GlobalLoadingIndicator />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/prompt" element={<Prompt />} />
                <Route path="/learn" element={<Learn />} />
                <Route path="/community" element={<Community />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
        </LoadingProvider>
      </ErrorBoundary>
    </Router>
  );
}

export default App;