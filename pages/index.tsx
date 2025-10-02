import Head from 'next/head';
import type { GetStaticProps, NextPage } from 'next';
import { useMemo, useState } from 'react';
import CompanyCard, { Company } from '../components/CompanyCard';
import Filters from '../components/Filters';
import SearchBar from '../components/SearchBar';
import companiesJson from '../data/companies.json';

type Theme = 'light' | 'dark';

type ThemeProps = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

type HomeProps = ThemeProps & {
  companies: Company[];
};

const texts = {
  en: {
    title: 'Uzbekistan Home Construction Developers',
    description:
      'Discover leading residential construction and real-estate developers across Uzbekistan with quick filters and project highlights.',
    searchPlaceholder: 'Search by company, city, or project…',
    filters: {
      segment: 'Segment',
      city: 'City',
      sort: 'Sort',
      sortAsc: 'A → Z',
      sortDesc: 'Z → A',
      all: 'All'
    },
    card: {
      cities: 'Cities',
      projects: 'Key projects',
      details: 'Details',
      telegram: 'Telegram',
      instagram: 'Instagram'
    },
    empty: 'No results. Try adjusting filters.',
    disclaimer: 'Links are public sources; verify before use.',
    headerBadge: 'Home Construction Directory',
    themeToggle: {
      toLight: '☀️ Light mode',
      toDark: '🌙 Dark mode'
    }
  }
};

const HomePage: NextPage<HomeProps> = ({ companies, theme, setTheme }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [segmentFilter, setSegmentFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const segments = useMemo(() => {
    const values = new Set<string>();
    companies.forEach((company) => {
      if (company.segment) {
        values.add(company.segment);
      }
    });
    return Array.from(values).sort();
  }, [companies]);

  const cities = useMemo(() => {
    const values = new Set<string>();
    companies.forEach((company) => {
      company.cities?.forEach((city) => values.add(city));
    });
    return Array.from(values).sort();
  }, [companies]);

  const filteredCompanies = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return companies
      .filter((company) => {
        if (segmentFilter && company.segment !== segmentFilter) return false;
        if (cityFilter && !company.cities?.includes(cityFilter)) return false;

        if (!normalizedSearch) return true;

        const haystack = [
          company.name,
          company.segment,
          ...(company.cities ?? []),
          ...(company.projects ?? [])
        ]
          .join(' ')
          .toLowerCase();

        return haystack.includes(normalizedSearch);
      })
      .sort((a, b) => {
        return sortOrder === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      });
  }, [searchTerm, segmentFilter, cityFilter, sortOrder, companies]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const currentTexts = texts.en;

  return (
    <>
      <Head>
        <title>Uzbekistan Home Construction Developers Directory</title>
        <meta
          name="description"
          content="Discover premium to economy residential developers across Uzbekistan with project highlights."
        />
        <meta property="og:title" content="Uzbekistan Home Construction Developers Directory" />
        <meta
          property="og:description"
          content="Discover premium to economy residential developers across Uzbekistan with project highlights."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://example.com" />
      </Head>
      <main className="min-h-screen bg-gradient-to-b from-white via-white to-gray-50 text-gray-900 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900">
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
          <header className="flex flex-col gap-6 rounded-3xl border border-gray-200 bg-white/70 p-8 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/60">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div className="space-y-4">
                <p className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                  {currentTexts.headerBadge}
                </p>
                <h1 className="max-w-3xl text-3xl font-semibold text-gray-900 text-balance dark:text-gray-100 sm:text-4xl">
                  {currentTexts.title}
                </h1>
                <p className="max-w-3xl text-base text-gray-600 dark:text-gray-300">
                  {currentTexts.description}
                </p>
              </div>
              <button
                type="button"
                onClick={toggleTheme}
                className="ml-auto inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:border-accent hover:text-accent dark:border-gray-700 dark:text-gray-200"
                aria-label="Toggle color mode"
              >
                {theme === 'dark' ? currentTexts.themeToggle.toLight : currentTexts.themeToggle.toDark}
              </button>
            </div>
            <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder={currentTexts.searchPlaceholder} />
            <Filters
              segment={segmentFilter}
              city={cityFilter}
              sort={sortOrder}
              segments={segments}
              cities={cities}
              onSegmentChange={setSegmentFilter}
              onCityChange={setCityFilter}
              onSortChange={setSortOrder}
              labels={currentTexts.filters}
            />
          </header>

          <section aria-live="polite" className="space-y-6">
            <div
              className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
              style={{ gridAutoRows: '1fr' }}
            >
              {filteredCompanies.map((company) => (
                <CompanyCard key={company.slug} company={company} labels={currentTexts.card} />
              ))}
            </div>
            {filteredCompanies.length === 0 && (
              <p className="rounded-2xl border border-dashed border-gray-300 bg-white/70 p-8 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-900/70 dark:text-gray-300">
                {currentTexts.empty}
              </p>
            )}
          </section>

          <footer className="border-t border-gray-200 pt-6 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
            {currentTexts.disclaimer}
          </footer>
        </div>
      </main>
    </>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps<{ companies: Company[] }> = async () => {
  const companiesData = companiesJson as { companies: Company[] };

  return {
    props: {
      companies: companiesData.companies
    }
  };
};
