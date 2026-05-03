import { useEffect, useCallback, useMemo, lazy, Suspense, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchDestinations, setPage, resetDestinations } from '../store/destinationsSlice';
import { setSearch, setCategory, resetFilters } from '../store/filtersSlice';
import { useIntersection, useDebounce, useAutoRefresh } from '../hooks';
import { CardSkeleton } from '../components/Skeleton';
import FilterBar from '../components/FilterBar';
import RefreshIndicator from '../components/RefreshIndicator';

const DestinationCard = lazy(() => import('../components/DestinationCard'));

const LIMIT = 6;

export default function Explore() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { items, loading, total, page, lastUpdated } = useSelector(s => s.destinations);
  const filters = useSelector(s => s.filters);
  const [searchInput, setSearchInput] = useState(filters.search);
  const debouncedSearch = useDebounce(searchInput, 400);
  const [sentinelRef, isVisible] = useIntersection();
  const isLoadingMore = useRef(false);

  // Apply URL params on mount
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) dispatch(setCategory(cat));
  }, []);

  // Sync debounced search to Redux
  useEffect(() => {
    dispatch(setSearch(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  // Reset and reload when filters change
  useEffect(() => {
    dispatch(resetDestinations());
    dispatch(fetchDestinations({ page: 1, limit: LIMIT, filters }));
    isLoadingMore.current = false;
  }, [filters.search, filters.category, filters.continent, filters.sortBy, filters.rating]);

  // Auto refresh
  const handleRefresh = useCallback(() => {
    dispatch(resetDestinations());
    dispatch(fetchDestinations({ page: 1, limit: LIMIT, filters }));
  }, [dispatch, filters]);

  useAutoRefresh(handleRefresh, 60000);

  // Infinite scroll
  useEffect(() => {
    if (isVisible && !loading && !isLoadingMore.current && items.length < total) {
      isLoadingMore.current = true;
      const nextPage = page + 1;
      dispatch(setPage(nextPage));
      dispatch(fetchDestinations({ page: nextPage, limit: LIMIT, filters, append: true }))
        .finally(() => { isLoadingMore.current = false; });
    }
  }, [isVisible, loading, items.length, total]);

  const hasMore = items.length < total;

  return (
    <div className="min-h-screen pt-24 pb-20" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>
            Find your next escape
          </p>
          <div className="flex flex-col md:flex-row md:items-end gap-4 justify-between">
            <h1 className="section-title text-4xl font-black">Explore Destinations</h1>
            <RefreshIndicator lastUpdated={lastUpdated} onRefresh={handleRefresh} loading={loading} />
          </div>
        </div>

        {/* Search bar */}
        <div className="relative mb-6">
          <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
            style={{ color: 'var(--text-secondary)' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            placeholder="Search destinations, countries, or experiences..."
            className="w-full pl-14 pr-6 py-4 rounded-2xl text-base outline-none transition-all duration-200"
            style={{
              background: 'var(--card-bg)',
              border: '1.5px solid var(--border)',
              color: 'var(--text-primary)',
            }}
          />
          {searchInput && (
            <button onClick={() => setSearchInput('')}
              className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: 'var(--border)', color: 'var(--text-secondary)' }}>
              ×
            </button>
          )}
        </div>

        {/* Filter bar */}
        <div className="card rounded-2xl p-5 mb-8">
          <FilterBar />
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {loading && items.length === 0 ? 'Loading...' : (
              <>
                Showing <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{items.length}</span> of{' '}
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{total}</span> destinations
              </>
            )}
          </p>
          {filters.search && (
            <span className="text-sm px-3 py-1 rounded-full" style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
              Results for "{filters.search}"
            </span>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Suspense fallback={Array(LIMIT).fill(0).map((_, i) => <CardSkeleton key={i} />)}>
            {loading && items.length === 0
              ? Array(LIMIT).fill(0).map((_, i) => <CardSkeleton key={i} />)
              : items.map((d, i) => <DestinationCard key={`${d.id}-${i}`} destination={d} index={i % LIMIT} />)
            }
          </Suspense>
        </div>

        {/* Empty state */}
        {!loading && items.length === 0 && (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🗺️</div>
            <h3 className="font-display text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              No destinations found
            </h3>
            <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
              Try adjusting your filters or search query
            </p>
            <button onClick={() => { dispatch(resetFilters()); setSearchInput(''); }} className="btn-primary">
              Reset all filters
            </button>
          </div>
        )}

        {/* Load more skeleton (infinite scroll) */}
        {loading && items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {Array(3).fill(0).map((_, i) => <CardSkeleton key={i} />)}
          </div>
        )}

        {/* Infinite scroll sentinel */}
        <div ref={sentinelRef} className="h-8 mt-4" />

        {/* End message */}
        {!hasMore && items.length > 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-3xl mb-3">🎉</div>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              You've explored all {total} destinations!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
