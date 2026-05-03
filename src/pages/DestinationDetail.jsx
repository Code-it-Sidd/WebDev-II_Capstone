import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist, addBooking } from '../store/bookingsSlice';
import { fetchDestinationById, fetchWeather } from '../utils/api';

export default function DestinationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlist = useSelector(s => s.bookings.wishlist);
  const [destination, setDestination] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showBooking, setShowBooking] = useState(false);
  const [booked, setBooked] = useState(false);
  const [guests, setGuests] = useState(2);
  const [travelDate, setTravelDate] = useState('');

  const isWishlisted = destination ? wishlist.includes(destination.id) : false;

  useEffect(() => {
    setLoading(true);
    fetchDestinationById(id).then(d => {
      if (d) {
        setDestination(d);
        fetchWeather(d.coordinates.lat, d.coordinates.lng).then(w => {
          if (w) setWeather(w);
        });
      }
      setLoading(false);
    });
  }, [id]);

  const handleWishlist = useCallback(() => {
    if (destination) dispatch(toggleWishlist(destination.id));
  }, [dispatch, destination]);

  const handleBook = () => {
    dispatch(addBooking({
      destinationId: destination.id,
      destinationName: destination.name,
      country: destination.country,
      price: destination.price * guests,
      guests,
      travelDate,
      image: destination.image,
    }));
    setBooked(true);
    setShowBooking(false);
  };

  if (loading) return (
    <div className="min-h-screen pt-24 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full border-4 border-t-transparent mx-auto mb-4 animate-spin"
          style={{ borderColor: 'var(--border)', borderTopColor: 'var(--accent)' }} />
        <p style={{ color: 'var(--text-secondary)' }}>Loading destination...</p>
      </div>
    </div>
  );

  if (!destination) return (
    <div className="min-h-screen pt-24 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="font-display text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Destination not found</h2>
        <Link to="/explore" className="btn-primary">Back to Explore</Link>
      </div>
    </div>
  );

  const totalPrice = destination.price * guests;

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Hero Image */}
      <div className="relative h-[60vh] overflow-hidden">
        <img src={destination.image} alt={destination.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(15,13,10,0.9) 0%, rgba(15,13,10,0.3) 50%, transparent 100%)' }} />

        {/* Back button */}
        <button onClick={() => navigate(-1)}
          className="absolute top-24 left-6 flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-medium transition-all hover:scale-105"
          style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)' }}>
          ← Back
        </button>

        {/* Bottom overlay content */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 max-w-7xl mx-auto">
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {destination.featured && <span className="px-2.5 py-1 rounded-full text-xs font-bold text-white" style={{ background: 'var(--accent)' }}>Featured</span>}
                {destination.trending && <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/20 text-white border border-white/30">🔥 Trending</span>}
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-black text-white mb-1">{destination.name}</h1>
              <p className="text-white/70 text-lg flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                {destination.country} · {destination.continent}
              </p>
            </div>
            <div className="flex gap-3">
              <button onClick={handleWishlist}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: isWishlisted ? 'rgba(239,68,68,0.9)' : 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}>
                <svg className="w-5 h-5" fill={isWishlisted ? 'white' : 'none'} stroke="white" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats row */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'Rating', value: `${destination.rating}★`, icon: '⭐' },
                { label: 'Reviews', value: destination.reviews.toLocaleString(), icon: '💬' },
                { label: 'Duration', value: destination.duration, icon: '📅' },
                { label: 'Best Time', value: destination.bestTime, icon: '🌤️' },
              ].map(s => (
                <div key={s.label} className="card rounded-2xl p-4 text-center">
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <div className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{s.value}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="card rounded-2xl overflow-hidden">
              <div className="flex border-b" style={{ borderColor: 'var(--border)' }}>
                {['overview', 'highlights', 'reviews'].map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className="px-6 py-4 text-sm font-medium capitalize transition-all duration-200"
                    style={{
                      color: activeTab === tab ? 'var(--accent)' : 'var(--text-secondary)',
                      borderBottom: activeTab === tab ? '2px solid var(--accent)' : '2px solid transparent',
                      background: 'transparent',
                    }}>
                    {tab}
                  </button>
                ))}
              </div>
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div>
                    <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                      {destination.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {destination.tags.map(t => (
                        <span key={t} className="px-3 py-1.5 rounded-full text-sm capitalize"
                          style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === 'highlights' && (
                  <div className="grid grid-cols-2 gap-3">
                    {destination.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl"
                        style={{ background: 'var(--bg-secondary)' }}>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                          style={{ background: 'var(--accent)' }}>
                          {i + 1}
                        </div>
                        <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{h}</span>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    {[
                      { name: 'Sarah M.', rating: 5, text: 'Absolutely magical experience! The scenery was breathtaking and the local culture was fascinating. Would visit again in a heartbeat.' },
                      { name: 'James K.', rating: 5, text: 'Best trip of my life. The highlights recommended were spot-on, and the weather was perfect the entire time.' },
                      { name: 'Priya S.', rating: 4, text: 'Beautiful destination with rich history. Some areas are crowded but the overall experience was incredible.' },
                    ].map((r, i) => (
                      <div key={i} className="p-4 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
                            style={{ background: 'var(--accent)' }}>
                            {r.name[0]}
                          </div>
                          <div>
                            <div className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{r.name}</div>
                            <div className="text-yellow-400 text-xs">{'★'.repeat(r.rating)}</div>
                          </div>
                        </div>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{r.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right column - booking card */}
          <div className="space-y-4">
            {/* Weather card */}
            {(weather || destination.weather) && (
              <div className="card rounded-2xl p-5" style={{ background: 'linear-gradient(135deg, var(--accent) 0%, #b86f22 100%)' }}>
                <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-3">Current Weather</p>
                <div className="flex items-center justify-between text-white">
                  <div>
                    <div className="font-display text-4xl font-black">{(weather || destination.weather).temp}°C</div>
                    <div className="text-white/80 text-sm mt-1">{(weather || destination.weather).condition}</div>
                  </div>
                  <div className="text-5xl">
                    {(weather || destination.weather).condition?.includes('Sun') || (weather || destination.weather).condition?.includes('Clear') ? '☀️' :
                     (weather || destination.weather).condition?.includes('Cloud') ? '⛅' :
                     (weather || destination.weather).condition?.includes('Rain') ? '🌧️' : '🌤️'}
                  </div>
                </div>
                <p className="text-white/60 text-xs mt-3">{destination.name}, {destination.country}</p>
              </div>
            )}

            {/* Booking card */}
            <div className="card rounded-2xl p-6 sticky top-24">
              <div className="mb-5">
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Starting from</span>
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-3xl font-black" style={{ color: 'var(--accent)' }}>
                    ${destination.price.toLocaleString()}
                  </span>
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>/person</span>
                </div>
              </div>

              {booked ? (
                <div className="text-center py-4">
                  <div className="text-4xl mb-3">🎉</div>
                  <p className="font-bold" style={{ color: 'var(--text-primary)' }}>Booking Confirmed!</p>
                  <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Check My Trips for details</p>
                  <Link to="/bookings" className="btn-primary mt-4 block text-center text-sm">
                    View My Trips
                  </Link>
                </div>
              ) : !showBooking ? (
                <button onClick={() => setShowBooking(true)} className="btn-primary w-full text-center">
                  Book This Trip
                </button>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold block mb-2" style={{ color: 'var(--text-secondary)' }}>Travel Date</label>
                    <input type="date" value={travelDate} onChange={e => setTravelDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 rounded-xl outline-none text-sm"
                      style={{ background: 'var(--bg-secondary)', border: '1.5px solid var(--border)', color: 'var(--text-primary)' }} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold block mb-2" style={{ color: 'var(--text-secondary)' }}>Guests: {guests}</label>
                    <input type="range" min={1} max={10} value={guests} onChange={e => setGuests(+e.target.value)} className="w-full" />
                    <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                      <span>1</span><span>10</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl flex justify-between items-center"
                    style={{ background: 'var(--bg-secondary)' }}>
                    <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Total</span>
                    <span className="font-display text-xl font-bold" style={{ color: 'var(--accent)' }}>
                      ${totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <button onClick={handleBook}
                    disabled={!travelDate}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed">
                    Confirm Booking
                  </button>
                  <button onClick={() => setShowBooking(false)} className="w-full text-sm py-2 transition-colors"
                    style={{ color: 'var(--text-secondary)' }}>
                    Cancel
                  </button>
                </div>
              )}

              <button onClick={handleWishlist}
                className="w-full mt-3 btn-ghost text-sm flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill={isWishlisted ? 'var(--accent)' : 'none'} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
