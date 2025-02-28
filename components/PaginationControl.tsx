// components/PaginationControl.tsx
'use client';

import { Button } from '@/components/ui/button';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

interface PaginationControlProps {
  currentPage: number;
  totalPages: number;
}

export function PaginationControl({
  currentPage,
  totalPages,
}: PaginationControlProps): React.ReactElement {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Function to handle page changes
  const handlePageChange = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  // Calculate the page range to display
  const getPageRange = (): number[] => {
    const delta = 2; // Number of pages to show on each side of current page
    const range: number[] = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    // Add first and last pages
    if (currentPage - delta > 2) {
      range.unshift(-1); // Represents ellipsis
    }
    if (currentPage + delta < totalPages - 1) {
      range.push(-1); // Represents ellipsis
    }

    // Always include first and last page
    if (totalPages > 1) {
      range.unshift(1);
      range.push(totalPages);
    }

    return range;
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        disabled={currentPage <= 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </Button>

      <div className="flex gap-1">
        {getPageRange().map((page, index) =>
          page === -1 ? (
            <div key={`ellipsis-${index}`} className="px-4 py-2">
              ...
            </div>
          ) : (
            <Button
              key={page}
              variant={page === currentPage ? 'default' : 'outline'}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          )
        )}
      </div>

      <Button
        variant="outline"
        disabled={currentPage >= totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
}
