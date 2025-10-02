import Link from 'next/link';
import { useMemo } from 'react';

export interface Company {
  name: string;
  slug: string;
  segment: string;
  cities: string[];
  projects: string[];
  social?: {
    telegram?: string;
    instagram?: string;
  };
  website?: string;
  description?: string;
  email?: string;
  phone?: string;
  logo?: string;
}

interface CompanyCardProps {
  company: Company;
  showDetailsLink?: boolean;
  labels?: {
    cities: string;
    projects: string;
    details: string;
    telegram: string;
    instagram: string;
  };
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company, showDetailsLink = true, labels }) => {
  const copy = labels ?? {
    cities: 'Cities',
    projects: 'Key projects',
    details: 'Details',
    telegram: 'Telegram',
    instagram: 'Instagram'
  };

  const monogram = useMemo(() => {
    return company.name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase())
      .join('');
  }, [company.name]);

  const hasTelegram = Boolean(company.social?.telegram);
  const hasInstagram = Boolean(company.social?.instagram);

  return (
    <article className="flex h-full flex-col justify-between rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/70">
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex items-center gap-4">
          {company.logo ? (
            <img
              src={company.logo}
              alt={`${company.name} logo`}
              loading="lazy"
              className="h-12 w-12 flex-none rounded-full object-cover"
            />
          ) : (
            <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-200">
              {monogram || 'UZ'}
            </div>
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{company.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{company.segment}</p>
          </div>
        </div>

        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          {company.cities?.length ? (
            <p>
              <span className="font-medium text-gray-700 dark:text-gray-200">{copy.cities}:</span>{' '}
              {company.cities.join(', ')}
            </p>
          ) : null}

          {company.projects?.length ? (
            <p>
              <span className="font-medium text-gray-700 dark:text-gray-200">{copy.projects}:</span>{' '}
              {company.projects.slice(0, 3).join(', ')}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-2">
          {hasTelegram && (
            <a
              href={company.social?.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-700 transition hover:border-accent hover:bg-accent/10 hover:text-accent dark:border-gray-700 dark:text-gray-200"
              aria-label={`Open Telegram for ${company.name}`}
            >
              <TelegramIcon className="h-4 w-4" /> {copy.telegram}
            </a>
          )}
          {hasInstagram && (
            <a
              href={company.social?.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-700 transition hover:border-accent hover:bg-accent/10 hover:text-accent dark:border-gray-700 dark:text-gray-200"
              aria-label={`Open Instagram for ${company.name}`}
            >
              <InstagramIcon className="h-4 w-4" /> {copy.instagram}
            </a>
          )}
        </div>
        {showDetailsLink && (
          <Link
            href={`/company/${company.slug}`}
            className="text-sm font-medium text-accent hover:underline"
            aria-label={`View details for ${company.name}`}
          >
            {copy.details}
          </Link>
        )}
      </div>
    </article>
  );
};

const TelegramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M20.665 3.58551C20.8269 3.51389 21.0044 3.48821 21.179 3.51088C21.3537 3.53355 21.5189 3.60358 21.6574 3.71341C21.7958 3.82325 21.9021 3.96875 21.9645 4.13431C22.027 4.29987 22.0434 4.47902 22.0114 4.65351L19.3164 19.2795C19.2038 19.8885 18.555 20.2495 18.012 19.9565L12.874 17.1775L10.363 19.6035C10.226 19.7395 10.037 19.8145 9.842 19.8115C9.646 19.8085 9.46051 19.728 9.32851 19.5875L7.32851 17.4475L3.44651 15.9095C2.86651 15.6765 2.87851 14.8575 3.46651 14.6445L20.665 3.58551Z"
      fill="currentColor"
    />
  </svg>
);

const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M7 3H17C19.2091 3 21 4.79086 21 7V17C21 19.2091 19.2091 21 17 21H7C4.79086 21 3 19.2091 3 17V7C3 4.79086 4.79086 3 7 3Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 11.37C16.1234 12.2022 15.9817 13.0529 15.5985 13.799C15.2152 14.5451 14.6102 15.1498 13.864 15.5329C13.1178 15.9161 12.2673 16.0574 11.435 15.934C10.6027 15.8106 9.83319 15.4298 9.22044 14.817C8.60769 14.2043 8.22685 13.4348 8.10346 12.6025C7.98007 11.7702 8.12139 10.9197 8.50455 10.1735C8.8877 9.4273 9.49239 8.82231 10.2385 8.43907C10.9846 8.05584 11.8353 7.91417 12.6675 8.03758C13.516 8.16295 14.2973 8.54751 14.9205 9.17069C15.5436 9.79387 15.9282 10.5751 16.0535 11.4236L16 11.37Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M17.5 6.5H17.51" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default CompanyCard;
