import { useState, memo } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from '../context/ThemeContext';
import { useScrollPosition } from '../hooks';

const Navbar = memo(() => {
  const { isDark, toggle } = useTheme();
  const scrollY = useScrollPosition();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const wishlistCount = useSelector(s => s.bookings.wishlist.length);
  const isScrolled = scrollY > 60;

  const links = [
    { to: '/', label: 'Home' },
    { to: '/explore', label: 'Explore' },
    { to: '/wishlist', label: 'Wishlist' },
    { to: '/bookings', label: 'My Trips' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-3 bg-card backdrop-blur-md border-b border-theme shadow-lg'
          : 'py-5 bg-transparent'
      }`}
      style={{ background: isScrolled ? 'var(--card-bg)' : 'transparent', borderColor: isScrolled ? 'var(--border)' : 'transparent' }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold"
            style={{ background: 'var(--accent)' }}>
            W
          </div>
          <span className="font-display text-xl font-bold hidden sm:block" style={{ color: 'var(--text-primary)' }}>
            Wanderlust
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive ? 'text-white' : 'text-muted hover:text-primary'
                }`
              }
              style={({ isActive }) => isActive ? { background: 'var(--accent)', color: '#fff' } : { color: 'var(--text-secondary)' }}
            >
              {l.label}
              {l.to === '/wishlist' && wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white text-xs flex items-center justify-center"
                  style={{ background: '#ef4444', fontSize: '10px' }}>
                  {wishlistCount}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Dark mode toggle */}
          <button
            onClick={toggle}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <svg className="w-5 h-5" style={{ color: 'var(--accent)' }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>

          <button
            onClick={() => navigate('/explore')}
            className="hidden sm:block btn-primary text-sm py-2"
          >
            Plan Trip
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="md:hidden w-10 h-10 rounded-full flex flex-col items-center justify-center gap-1.5"
            style={{ background: 'var(--bg-secondary)' }}
          >
            <span className={`block h-0.5 w-5 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
              style={{ background: 'var(--text-primary)' }} />
            <span className={`block h-0.5 w-5 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
              style={{ background: 'var(--text-primary)' }} />
            <span className={`block h-0.5 w-5 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
              style={{ background: 'var(--text-primary)' }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ background: 'var(--card-bg)', borderTop: menuOpen ? '1px solid var(--border)' : 'none' }}>
        <div className="px-6 py-4 flex flex-col gap-1">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-3 rounded-xl text-sm font-medium transition-colors"
              style={({ isActive }) => ({
                background: isActive ? 'var(--accent)' : 'transparent',
                color: isActive ? '#fff' : 'var(--text-secondary)',
              })}
            >
              {l.label}
              {l.to === '/wishlist' && wishlistCount > 0 && ` (${wishlistCount})`}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';
export default Navbar;
