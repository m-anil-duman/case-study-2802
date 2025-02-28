'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps): React.ReactNode {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col justify-center items-center min-h-[60vh]">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-gray-500 mb-6">{error.message}</p>
        <Button onClick={reset}>Try again</Button>
      </div>
    </div>
  );
}
