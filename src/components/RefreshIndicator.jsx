import { memo, useState, useEffect } from 'react';

const RefreshIndicator = memo(({ lastUpdated, onRefresh, loading }) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const update = () => {
      if (!lastUpdated) return;
      const diff = Math.floor((Date.now() - lastUpdated) / 1000);
      if (diff < 60) setTimeAgo(`${diff}s ago`);
      else if (diff < 3600) setTimeAgo(`${Math.floor(diff / 60)}m ago`);
      else setTimeAgo('just now');
    };
    update();
    const id = setInterval(update, 5000);
    return () => clearInterval(id);
  }, [lastUpdated]);

  return (
    <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-secondary)' }}>
      <div className="flex items-center gap-1.5">
        <span
          className={`w-2 h-2 rounded-full ${loading ? 'animate-pulse' : ''}`}
          style={{ background: loading ? '#f59e0b' : '#10b981' }}
        />
        <span>{loading ? 'Refreshing...' : `Updated ${timeAgo}`}</span>
      </div>
      <button
        onClick={onRefresh}
        disabled={loading}
        className="flex items-center gap-1 px-3 py-1 rounded-full transition-all hover:opacity-80 disabled:opacity-40"
        style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
      >
        <svg className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Refresh
      </button>
    </div>
  );
});

RefreshIndicator.displayName = 'RefreshIndicator';
export default RefreshIndicator;
