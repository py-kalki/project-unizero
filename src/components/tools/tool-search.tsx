'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounced-callback';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';

interface ToolSearchProps {
  initialValue?: string;
}

export function ToolSearch({ initialValue = '' }: ToolSearchProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [value, setValue] = useState(initialValue);

  // Sync with URL on initial load
  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null) {
      setValue(q);
    }
  }, [searchParams]);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }

    // Reset to page 1 on new search
    params.set('page', '1');

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setValue(term);
    handleSearch(term);
  };

  return (
    <Input
      type="search"
      placeholder="Search AI tools..."
      value={value}
      onChange={handleChange}
      className="max-w-sm"
    />
  );
}
