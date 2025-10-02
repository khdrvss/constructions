import { ChangeEvent } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <label className="block w-full">
      <span className="sr-only">Search companies</span>
      <input
        type="search"
        value={value}
        onChange={handleChange}
        placeholder={placeholder ?? 'Search by company, city, or project…'}
        className="w-full rounded-xl border border-gray-200 bg-white/80 px-4 py-3 text-sm shadow-sm transition focus:border-accent focus:ring-2 focus:ring-accent/40 dark:border-gray-700 dark:bg-gray-900"
        aria-label={placeholder ?? 'Search by company, city, or project'}
      />
    </label>
  );
};

export default SearchBar;
