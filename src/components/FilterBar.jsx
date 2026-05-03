import { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setContinent, setSortBy, setRating, resetFilters } from '../store/filtersSlice';

const categories = ['all', 'beach', 'culture', 'adventure', 'scenic', 'wildlife'];
const continents = ['all', 'Europe', 'Asia', 'Africa', 'South America', 'Oceania'];
const sortOptions = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
];

const FilterBar = memo(() => {
  const dispatch = useDispatch();
  const filters = useSelector(s => s.filters);

  const handleCategory = useCallback((c) => dispatch(setCategory(c)), [dispatch]);
  const handleContinent = useCallback((c) => dispatch(setContinent(c)), [dispatch]);
  const handleSort = useCallback((e) => dispatch(setSortBy(e.target.value)), [dispatch]);
  const handleReset = useCallback(() => dispatch(resetFilters()), [dispatch]);

  const hasActive = filters.category !== 'all' || filters.continent !== 'all' ||
    filters.sortBy !== 'popular' || filters.rating > 0;

  return (
    <div className="space-y-4">
      {/* Category pills */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--text-secondary)' }}>
          Category
        </p>
        <div className="flex flex-wrap gap-2">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => handleCategory(c)}
              className="px-4 py-2 rounded-full text-sm font-medium capitalize transition-all duration-200"
              style={{
                background: filters.category === c ? 'var(--accent)' : 'var(--bg-secondary)',
                color: filters.category === c ? '#fff' : 'var(--text-secondary)',
                border: `1.5px solid ${filters.category === c ? 'var(--accent)' : 'var(--border)'}`,
              }}
            >
              {c === 'all' ? 'All' : c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Continent + Sort row */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex flex-wrap gap-2 flex-1">
          {continents.map(c => (
            <button
              key={c}
              onClick={() => handleContinent(c)}
              className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
              style={{
                background: filters.continent === c ? 'var(--bg-secondary)' : 'transparent',
                color: filters.continent === c ? 'var(--accent)' : 'var(--text-secondary)',
                border: `1px solid ${filters.continent === c ? 'var(--accent)' : 'var(--border)'}`,
              }}
            >
              {c === 'all' ? '🌍 All Regions' : c}
            </button>
          ))}
        </div>

        <select
          value={filters.sortBy}
          onChange={handleSort}
          className="px-4 py-2 rounded-full text-sm font-medium outline-none cursor-pointer"
          style={{
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            border: '1.5px solid var(--border)',
          }}
        >
          {sortOptions.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>

        {hasActive && (
          <button onClick={handleReset} className="px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5 transition-all duration-200 hover:opacity-80"
            style={{ background: '#ef444420', color: '#ef4444', border: '1px solid #ef444440' }}>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
});

FilterBar.displayName = 'FilterBar';
export default FilterBar;
