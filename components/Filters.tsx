interface FiltersProps {
  segment: string;
  city: string;
  sort: 'asc' | 'desc';
  segments: string[];
  cities: string[];
  onSegmentChange: (segment: string) => void;
  onCityChange: (city: string) => void;
  onSortChange: (order: 'asc' | 'desc') => void;
  labels?: {
    segment: string;
    city: string;
    sort: string;
    sortAsc: string;
    sortDesc: string;
    all: string;
  };
}

const Filters: React.FC<FiltersProps> = ({
  segment,
  city,
  sort,
  segments,
  cities,
  onSegmentChange,
  onCityChange,
  onSortChange,
  labels
}) => {
  const copy = labels ?? {
    segment: 'Segment',
    city: 'City',
    sort: 'Sort',
    sortAsc: 'A → Z',
    sortDesc: 'Z → A',
    all: 'All'
  };

  return (
    <div className="flex flex-wrap gap-3 text-sm">
      <label className="flex items-center gap-2">
        <span className="font-medium text-gray-700 dark:text-gray-300">{copy.segment}</span>
        <select
          value={segment}
          onChange={(event) => onSegmentChange(event.target.value)}
          className="rounded-lg border border-gray-200 bg-white/80 px-3 py-2 shadow-sm focus:border-accent focus:ring-2 focus:ring-accent/40 dark:border-gray-700 dark:bg-gray-900"
        >
          <option value="">{copy.all}</option>
          {segments.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className="flex items-center gap-2">
        <span className="font-medium text-gray-700 dark:text-gray-300">{copy.city}</span>
        <select
          value={city}
          onChange={(event) => onCityChange(event.target.value)}
          className="rounded-lg border border-gray-200 bg-white/80 px-3 py-2 shadow-sm focus:border-accent focus:ring-2 focus:ring-accent/40 dark:border-gray-700 dark:bg-gray-900"
        >
          <option value="">{copy.all}</option>
          {cities.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className="flex items-center gap-2">
        <span className="font-medium text-gray-700 dark:text-gray-300">{copy.sort}</span>
        <select
          value={sort}
          onChange={(event) => onSortChange(event.target.value as 'asc' | 'desc')}
          className="rounded-lg border border-gray-200 bg-white/80 px-3 py-2 shadow-sm focus:border-accent focus:ring-2 focus:ring-accent/40 dark:border-gray-700 dark:bg-gray-900"
        >
          <option value="asc">{copy.sortAsc}</option>
          <option value="desc">{copy.sortDesc}</option>
        </select>
      </label>
    </div>
  );
};

export default Filters;
