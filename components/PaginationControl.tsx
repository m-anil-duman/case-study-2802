'use client';

import { Button } from '@/components/ui/button';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface PaginationControlProps {
  currentPage: number;
  totalPages: number;
}

export function PaginationControl({
  currentPage,
  totalPages,
}: PaginationControlProps): React.ReactNode {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createPageURL = (pageNumber: number): string => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const getPageRange = (): number[] => {
    const delta = 2;
    const range: number[] = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      range.unshift(-1);
    }
    if (currentPage + delta < totalPages - 1) {
      range.push(-1);
    }

    if (totalPages > 1) {
      range.unshift(1);
      range.push(totalPages);
    }

    return range;
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" disabled={currentPage <= 1} asChild>
        <Link href={createPageURL(currentPage - 1)}>Previous</Link>
      </Button>

      <div className="flex gap-1">
        {getPageRange().map((page, index) =>
          page === -1 ? (
            <div key={`ellipsis-${index}`} className="px-4 py-2">
              ...
            </div>
          ) : (
            <Button key={page} variant={page === currentPage ? 'default' : 'outline'} asChild>
              <Link href={createPageURL(page)}>{page}</Link>
            </Button>
          )
        )}
      </div>

      <Button variant="outline" disabled={currentPage >= totalPages} asChild>
        <Link href={createPageURL(currentPage + 1)}>Next</Link>
      </Button>
    </div>
  );
}
