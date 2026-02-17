'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounced-callback';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface ToolSearchProps {
  initialValue?: string;
}

export function ToolSearch({ initialValue = '' }: ToolSearchProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Initialize from URL if available, otherwise use initialValue prop
  // This only runs once on mount due to useState lazy initialization
  const [value, setValue] = useState(() => {
    if (typeof window !== 'undefined') {
      // Client-side: try to get from URL first
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('q') ?? initialValue;
    }
    return initialValue;
  });

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
