import Preloader from '@/components/Preloader';
import SearchForm from '@/components/SearchForm';
import SearchResults from '@/components/SearchResults';
import { Suspense } from 'react';

interface SearchPageProps {
  searchParams: Promise<{ query?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { query } = await searchParams;

  return (
    <div className="">
      <div className="w-full max-w-md mx-auto">
        <SearchForm />
        {typeof query !== 'undefined' && (
          <Suspense fallback={<Preloader />}>
            <SearchResults query={query} />
          </Suspense>
        )}
      </div>
    </div>
  );
}
