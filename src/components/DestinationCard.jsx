import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '../store/bookingsSlice';

const DestinationCard = memo(({ destination, index = 0 }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector(s => s.bookings.wishlist);
  const isWishlisted = wishlist.includes(destination.id);

  const handleWishlist = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(destination.id));
  }, [dispatch, destination.id]);

  const { name, country, category, price, rating, reviews, image, featured, trending, weather, tags } = destination;

  const categoryColors = {
    beach: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    culture: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    adventure: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    scenic: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
    wildlife: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  };

  return (
    <Link
      to={`/destination/${destination.id}`}
      className="group block rounded-2xl overflow-hidden card"
      style={{
        animationDelay: `${index * 0.1}s`,
        opacity: 0,
        animation: `fadeUp 0.6s ease ${index * 0.08}s forwards`,
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {featured && (
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold text-white"
              style={{ background: 'var(--accent)' }}>
              Featured
            </span>
          )}
          {trending && (
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur text-white border border-white/30">
              🔥 Trending
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
          style={{ background: isWishlisted ? 'rgba(239,68,68,0.9)' : 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)' }}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <svg className="w-4 h-4" fill={isWishlisted ? 'white' : 'none'} stroke="white" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Weather chip */}
        {weather && (
          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-xs text-white flex items-center gap-1.5"
            style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}>
            <span className="text-base leading-none">
              {weather.condition === 'Sunny' || weather.condition === 'Clear' ? '☀️' :
               weather.condition === 'Partly Cloudy' ? '⛅' :
               weather.condition === 'Rainy' ? '🌧️' : '🌤️'}
            </span>
            {weather.temp}°C
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="font-display text-lg font-bold leading-tight group-hover:text-accent transition-colors"
              style={{ color: 'var(--text-primary)' }}>
              {name}
            </h3>
            <p className="text-sm flex items-center gap-1 mt-0.5" style={{ color: 'var(--text-secondary)' }}>
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {country}
            </p>
          </div>
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize shrink-0 ${categoryColors[category] || ''}`}>
            {category}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-0.5">
            {[1,2,3,4,5].map(s => (
              <svg key={s} className="w-3.5 h-3.5" fill={s <= Math.floor(rating) ? 'var(--accent)' : 'var(--border)'} viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{rating}</span>
          <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>({reviews.toLocaleString()})</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.slice(0, 3).map(tag => (
            <span key={tag} className="px-2 py-0.5 rounded text-xs"
              style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
              #{tag}
            </span>
          ))}
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>From</span>
            <p className="font-display text-xl font-bold" style={{ color: 'var(--accent)' }}>
              ${price.toLocaleString()}
            </p>
          </div>
          <div className="px-4 py-2 rounded-full text-sm font-medium text-white transition-all duration-300 group-hover:shadow-lg"
            style={{ background: 'var(--accent)' }}>
            Explore →
          </div>
        </div>
      </div>
    </Link>
  );
});

DestinationCard.displayName = 'DestinationCard';
export default DestinationCard;
