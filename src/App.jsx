import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const Explore = lazy(() => import('./pages/Explore'));
const DestinationDetail = lazy(() => import('./pages/DestinationDetail'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const Bookings = lazy(() => import('./pages/Bookings'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 rounded-full border-4 animate-spin"
        style={{ borderColor: 'var(--border)', borderTopColor: 'var(--accent)' }} />
      <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Loading...</p>
    </div>
  </div>
);

function AppLayout() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/destination/:id" element={<DestinationDetail />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center pt-24">
              <div className="text-center">
                <div className="text-8xl mb-6">🌍</div>
                <h2 className="font-display text-3xl font-black mb-2" style={{ color: 'var(--text-primary)' }}>
                  Page Not Found
                </h2>
                <a href="/" className="btn-primary inline-block mt-6">Go Home</a>
              </div>
            </div>
          } />
        </Routes>
      </Suspense>

      {/* Footer */}
      <footer className="py-12 border-t" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="font-display text-2xl font-black mb-3" style={{ color: 'var(--text-primary)' }}>
            Wanderlust
          </div>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            © 2026 Wanderlust Travel & Tourism. Crafted with ❤️ for explorers everywhere.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}
