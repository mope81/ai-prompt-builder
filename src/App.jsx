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
          <div className="min-h-screen bg-[#0B0F17] text-white flex flex-col overflow-x-hidden">
            <Navbar />
            <Suspense fallback={<GlobalLoadingIndicator />}>
              <div className="flex-1 flex flex-col">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/prompt" element={<Prompt />} />
                  <Route path="/learn" element={<Learn />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </Suspense>
          </div>
        </LoadingProvider>
      </ErrorBoundary>
    </Router>
  );
}

export default App;