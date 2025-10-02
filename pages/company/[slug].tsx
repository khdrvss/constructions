import Head from 'next/head';
import Link from 'next/link';
import type { GetStaticPaths, GetStaticProps } from 'next';
import CompanyCard, { Company } from '../../components/CompanyCard';
import companiesJson from '../../data/companies.json';

interface CompanyPageProps {
  company: Company;
}

const texts = {
  en: {
    back: '← Back to directory',
    about: 'About',
    projects: 'Projects',
    contacts: 'Contacts',
    map: 'Map',
    mapPlaceholder: 'Map placeholder – embed project location later.',
    contactLabels: {
      website: 'Website',
      email: 'Email',
      phone: 'Phone'
    }
  }
};

const companyCardLabels = {
  cities: 'Cities',
  projects: 'Key projects',
  details: 'Details',
  telegram: 'Telegram',
  instagram: 'Instagram'
};

const CompanyPage: React.FC<CompanyPageProps> = ({ company }) => {
  if (!company) {
    return null;
  }

  const copy = texts.en;
  const contactFields = [
    { key: 'website' as const, value: company.website, isLink: true },
    { key: 'email' as const, value: company.email, isLink: false },
    { key: 'phone' as const, value: company.phone, isLink: false }
  ].filter((item) => Boolean(item.value));

  const projects = company.projects ?? [];

  return (
    <>
      <Head>
        <title>{company.name} – Uzbekistan Home Construction Developers</title>
        <meta
          name="description"
          content={company.description || `${company.name} operates in ${company.cities?.join(', ')}.`}
        />
        <meta property="og:title" content={`${company.name} – Uzbekistan Home Construction Developers`} />
        <meta
          property="og:description"
          content={company.description || `${company.name} operates in ${company.cities?.join(', ')}.`}
        />
        <meta property="og:type" content="article" />
      </Head>
      <main className="min-h-screen bg-gradient-to-b from-white via-white to-gray-50 text-gray-900 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900">
        <div className="mx-auto flex max-w-4xl flex-col gap-10 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
          <Link href="/" className="text-sm text-accent hover:underline">
            {copy.back}
          </Link>

          <section className="space-y-8 rounded-3xl border border-gray-200 bg-white/70 p-8 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/60">
            <CompanyCard company={company} showDetailsLink={false} labels={companyCardLabels} />

            {company.description && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{copy.about}</h2>
                <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">{company.description}</p>
              </div>
            )}

            {projects.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{copy.projects}</h2>
                <ul className="mt-2 grid gap-2 text-sm text-gray-600 dark:text-gray-300 sm:grid-cols-2">
                  {projects.map((project) => (
                    <li key={project} className="rounded-xl border border-gray-200 px-3 py-2 dark:border-gray-700">
                      {project}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {contactFields.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{copy.contacts}</h2>
                <ul className="mt-2 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  {contactFields.map((contact) => (
                    <li key={contact.key}>
                      <span className="font-medium text-gray-700 dark:text-gray-200">
                        {copy.contactLabels[contact.key]}
                      </span>
                      :{' '}
                      {contact.isLink ? (
                        <a
                          href={String(contact.value)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {contact.value}
                        </a>
                      ) : (
                        contact.value
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{copy.map}</h2>
              <div className="mt-2 flex h-64 items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-100 text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-300">
                {copy.mapPlaceholder}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = (companiesJson as { companies: Company[] }).companies.map((company) => ({
    params: { slug: company.slug }
  }));
  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<CompanyPageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const company = (companiesJson as { companies: Company[] }).companies.find((item) => item.slug === slug);

  if (!company) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      company
    }
  };
};

export default CompanyPage;
