import React from 'react';
import { Search, MapPin, X, CheckCircle2, DollarSign, SlidersHorizontal } from 'lucide-react';
import { JobFilterState, JobCategory } from '../types/job';
import { ZIMBABWE_LOCATIONS, JOB_CATEGORIES } from '../data/initialJobs';

interface SearchBarProps {
  filters: JobFilterState;
  onFilterChange: (filters: JobFilterState) => void;
  totalFilteredCount: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  filters,
  onFilterChange,
  totalFilteredCount
}) => {
  const hasActiveFilters =
    filters.searchQuery !== '' ||
    filters.category !== 'All' ||
    filters.location !== 'All Zimbabwe' ||
    filters.verifiedOnly ||
    filters.featuredOnly ||
    filters.payCurrency !== 'All';

  const resetFilters = () => {
    onFilterChange({
      searchQuery: '',
      category: 'All',
      location: 'All Zimbabwe',
      verifiedOnly: false,
      featuredOnly: false,
      payCurrency: 'All',
      sortBy: 'latest'
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-5">
      {/* Top Search & Location inputs */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* Keyword Search */}
        <div className="relative md:col-span-7">
          <label htmlFor="job-search-input" className="sr-only">
            Search jobs in Zimbabwe
          </label>
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            id="job-search-input"
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
            placeholder="Search jobs in Zimbabwe (e.g. Shop assistant, driver, remote...)"
            className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onFilterChange({ ...filters, searchQuery: '' })}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              aria-label="Clear search text"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Location Dropdown */}
        <div className="relative md:col-span-5">
          <label htmlFor="location-select" className="sr-only">
            Filter by Location
          </label>
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <MapPin className="w-4 h-4 text-emerald-600" />
          </div>
          <select
            id="location-select"
            value={filters.location}
            onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
            className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors appearance-none cursor-pointer"
          >
            {ZIMBABWE_LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc === 'All Zimbabwe' ? '📍 All Zimbabwe' : loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Pills (from prompt: Full-time, Part-time, Small gigs, Remote, etc.) */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-1">
          Categories:
        </span>
        <button
          onClick={() => onFilterChange({ ...filters, category: 'All' })}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            filters.category === 'All'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          All Opportunities
        </button>
        {JOB_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onFilterChange({ ...filters, category: cat })}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filters.category === cat
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Secondary filter toggles */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          {/* Verified toggle */}
          <label className="inline-flex items-center gap-1.5 cursor-pointer text-slate-700 hover:text-slate-900 font-medium">
            <input
              type="checkbox"
              checked={filters.verifiedOnly}
              onChange={(e) => onFilterChange({ ...filters, verifiedOnly: e.target.checked })}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
            />
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Verified Legit Only
            </span>
          </label>

          {/* Featured toggle */}
          <label className="inline-flex items-center gap-1.5 cursor-pointer text-slate-700 hover:text-slate-900 font-medium">
            <input
              type="checkbox"
              checked={filters.featuredOnly}
              onChange={(e) => onFilterChange({ ...filters, featuredOnly: e.target.checked })}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
            />
            <span>⭐ Featured Ads</span>
          </label>

          {/* Sort By */}
          <div className="flex items-center gap-1.5">
            <label htmlFor="sort-by-select" className="text-slate-500 font-medium">
              Sort:
            </label>
            <select
              id="sort-by-select"
              value={filters.sortBy}
              onChange={(e) =>
                onFilterChange({ ...filters, sortBy: e.target.value as JobFilterState['sortBy'] })
              }
              className="py-1 px-2 text-xs rounded-md border border-slate-200 text-slate-700 bg-white focus:ring-emerald-500 focus:border-emerald-500 cursor-pointer"
            >
              <option value="latest">Latest Posted</option>
              <option value="deadline">Closing Soonest</option>
              <option value="featured">Featured First</option>
            </select>
          </div>
        </div>

        {/* Results count & reset */}
        <div className="flex items-center gap-3">
          <span className="text-slate-500 font-medium">
            Showing <strong className="text-slate-900">{totalFilteredCount}</strong> vacancies
          </span>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-emerald-700 hover:text-emerald-900 font-semibold underline underline-offset-2 flex items-center gap-1"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
