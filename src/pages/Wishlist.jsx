import { useMemo, lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DESTINATIONS } from '../utils/api';
import { CardSkeleton } from '../components/Skeleton';

const DestinationCard = lazy(() => import('../components/DestinationCard'));

export default function Wishlist() {
  const wishlist = useSelector(s => s.bookings.wishlist);

  const destinations = useMemo(() =>
    DESTINATIONS.filter(d => wishlist.includes(d.id)),
    [wishlist]
  );

  return (
    <div className="min-h-screen pt-24 pb-20" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>
            Your saved places
          </p>
          <h1 className="section-title text-4xl font-black">
            Wishlist{' '}
            <span className="text-2xl" style={{ color: 'var(--text-secondary)' }}>
              ({wishlist.length})
            </span>
          </h1>
        </div>

        {destinations.length === 0 ? (
          <div className="text-center py-32">
            <div className="text-7xl mb-6">💭</div>
            <h2 className="font-display text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
              Your wishlist is empty
            </h2>
            <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
              Start exploring and save the destinations you love
            </p>
            <Link to="/explore" className="btn-primary">
              Discover Destinations
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Suspense fallback={destinations.map((_, i) => <CardSkeleton key={i} />)}>
              {destinations.map((d, i) => (
                <DestinationCard key={d.id} destination={d} index={i} />
              ))}
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
}
