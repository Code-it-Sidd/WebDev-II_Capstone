import { useEffect, useMemo, useCallback, lazy, Suspense } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDestinations } from '../store/destinationsSlice';
import { setSearch } from '../store/filtersSlice';
import { useAutoRefresh } from '../hooks';
import { CardSkeleton } from '../components/Skeleton';
import RefreshIndicator from '../components/RefreshIndicator';

const DestinationCard = lazy(() => import('../components/DestinationCard'));

const STATS = [
  { value: '200+', label: 'Destinations', icon: '🗺️' },
  { value: '50K+', label: 'Happy Travelers', icon: '😊' },
  { value: '4.9★', label: 'Average Rating', icon: '⭐' },
  { value: '15+', label: 'Years Experience', icon: '🏆' },
];

const CATEGORIES = [
  { id: 'beach', label: 'Beaches', icon: '🏖️', color: '#3b97f2' },
  { id: 'culture', label: 'Culture', icon: '🏛️', color: '#8b5cf6' },
  { id: 'adventure', label: 'Adventure', icon: '🧗', color: '#10b981' },
  { id: 'wildlife', label: 'Wildlife', icon: '🦁', color: '#f59e0b' },
  { id: 'scenic', label: 'Scenic', icon: '🏔️', color: '#ef4444' },
];

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading, lastUpdated } = useSelector(s => s.destinations);

  const loadData = useCallback(() => {
    dispatch(fetchDestinations({}));
  }, [dispatch]);

  useEffect(() => { loadData(); }, [loadData]);

  const { refresh } = useAutoRefresh(loadData, 60000);

  const featured = useMemo(() =>
    items.filter(d => d.featured).slice(0, 3),
    [items]
  );

  const trending = useMemo(() =>
    items.filter(d => d.trending && !d.featured).slice(0, 3),
    [items]
  );

  const handleSearch = (e) => {
    e.preventDefault();
    const q = e.target.querySelector('input').value;
    dispatch(setSearch(q));
    navigate('/explore');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden grain-overlay">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=80"
            alt="Travel hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(15,13,10,0.85) 0%, rgba(15,13,10,0.4) 60%, transparent 100%)' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-on-load stagger-1"
              style={{ background: 'rgba(208,136,48,0.2)', border: '1px solid rgba(208,136,48,0.4)', color: '#e8a040' }}>
              ✈️ Discover the world's finest destinations
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-black text-white leading-tight mb-6 animate-on-load stagger-2">
              Life is Short,{' '}
              <span style={{ color: 'var(--accent)' }}>Travel</span>{' '}
              More
            </h1>

            <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed animate-on-load stagger-3 max-w-xl">
              From sun-drenched Greek islands to misty Andean peaks — we craft journeys that transform ordinary days into extraordinary memories.
            </p>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="flex gap-3 mb-8 animate-on-load stagger-4">
              <div className="flex-1 flex items-center gap-3 px-5 py-4 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                <svg className="w-5 h-5 text-white/60 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Where do you want to go?"
                  className="bg-transparent text-white placeholder-white/50 outline-none flex-1 text-base"
                />
              </div>
              <button type="submit" className="btn-primary px-8 rounded-2xl font-semibold shrink-0">
                Search
              </button>
            </form>

            {/* Quick category pills */}
            <div className="flex flex-wrap gap-2 animate-on-load stagger-5">
              {CATEGORIES.map(cat => (
                <Link
                  key={cat.id}
                  to={`/explore?category=${cat.id}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white transition-all duration-200 hover:scale-105"
                  style={{ background: `${cat.color}25`, border: `1px solid ${cat.color}40` }}
                >
                  <span>{cat.icon}</span>{cat.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16" style={{ background: 'var(--accent)' }}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <div key={i} className="text-center text-white">
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="font-display text-3xl font-black">{s.value}</div>
              <div className="text-white/70 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>
              Handpicked for you
            </p>
            <h2 className="section-title text-4xl font-black">Featured Destinations</h2>
          </div>
          <div className="flex items-center gap-4">
            <RefreshIndicator lastUpdated={lastUpdated} onRefresh={refresh} loading={loading} />
            <Link to="/explore" className="btn-ghost text-sm hidden sm:block">
              View all →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Suspense fallback={[1,2,3].map(i => <CardSkeleton key={i} />)}>
            {loading && featured.length === 0
              ? [1,2,3].map(i => <CardSkeleton key={i} />)
              : featured.map((d, i) => <DestinationCard key={d.id} destination={d} index={i} />)
            }
          </Suspense>
        </div>
      </section>

      {/* Trending */}
      {(trending.length > 0 || loading) && (
        <section className="py-20" style={{ background: 'var(--bg-secondary)' }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>
                  🔥 What's hot
                </p>
                <h2 className="section-title text-4xl font-black">Trending Now</h2>
              </div>
              <Link to="/explore" className="btn-ghost text-sm hidden sm:block">
                Explore more →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Suspense fallback={[1,2,3].map(i => <CardSkeleton key={i} />)}>
                {loading && trending.length === 0
                  ? [1,2,3].map(i => <CardSkeleton key={i} />)
                  : trending.map((d, i) => <DestinationCard key={d.id} destination={d} index={i} />)
                }
              </Suspense>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, var(--accent) 0%, #b86f22 100%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
          <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-4">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Join 50,000+ travelers who have discovered their dream destinations with us.
          </p>
          <Link to="/explore" className="inline-block px-10 py-4 rounded-full bg-white font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{ color: 'var(--accent)' }}>
            Start Exploring
          </Link>
        </div>
      </section>
    </div>
  );
}
