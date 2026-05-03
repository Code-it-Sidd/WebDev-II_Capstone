import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const statusColors = {
  confirmed: { bg: '#10b98120', text: '#10b981', label: '✓ Confirmed' },
  pending: { bg: '#f59e0b20', text: '#f59e0b', label: '⏳ Pending' },
  cancelled: { bg: '#ef444420', text: '#ef4444', label: '✕ Cancelled' },
};

export default function Bookings() {
  const bookings = useSelector(s => s.bookings.bookings);

  return (
    <div className="min-h-screen pt-24 pb-20" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>
            Your adventures
          </p>
          <h1 className="section-title text-4xl font-black">My Trips</h1>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-32">
            <div className="text-7xl mb-6">✈️</div>
            <h2 className="font-display text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
              No trips booked yet
            </h2>
            <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
              Your confirmed bookings will appear here
            </p>
            <Link to="/explore" className="btn-primary">Start Planning</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b, i) => {
              const s = statusColors[b.status] || statusColors.confirmed;
              return (
                <div key={b.id} className="card rounded-2xl overflow-hidden flex flex-col sm:flex-row"
                  style={{ animation: `slideIn 0.5s ease ${i * 0.08}s both` }}>
                  <div className="w-full sm:w-48 h-48 sm:h-auto relative overflow-hidden shrink-0">
                    <img src={b.image} alt={b.destinationName} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className="font-display text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                            {b.destinationName}
                          </h3>
                          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{b.country}</p>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold shrink-0"
                          style={{ background: s.bg, color: s.text }}>
                          {s.label}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm mt-4">
                      <div>
                        <span style={{ color: 'var(--text-secondary)' }}>Travel Date: </span>
                        <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                          {b.travelDate || 'TBD'}
                        </span>
                      </div>
                      <div>
                        <span style={{ color: 'var(--text-secondary)' }}>Guests: </span>
                        <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{b.guests}</span>
                      </div>
                      <div>
                        <span style={{ color: 'var(--text-secondary)' }}>Total: </span>
                        <span className="font-bold" style={{ color: 'var(--accent)' }}>
                          ${b.price.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span style={{ color: 'var(--text-secondary)' }}>Booking ID: </span>
                        <span className="font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>
                          #{b.id}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
