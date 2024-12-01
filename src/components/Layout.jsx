import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-black">
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-xl">Logo</div>
          <div className="flex gap-4">
            <button className="text-white/80 hover:text-white transition-colors">
              Menu
            </button>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
