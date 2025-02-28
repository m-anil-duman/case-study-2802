'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

interface FilterBarProps {
  initialStatus?: string;
  initialGender?: string;
}

export function FilterBar({
  initialStatus = 'all',
  initialGender = 'all',
}: FilterBarProps): React.ReactElement {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Add a ref to track if this is the initial render
  const isInitialRender = useRef(true);

  const [status, setStatus] = useState(() => {
    const urlStatus = searchParams.get('status');
    const validStatuses = ['all', 'alive', 'dead', 'unknown'];
    return validStatuses.includes(urlStatus || '') ? urlStatus || initialStatus : initialStatus;
  });

  const [gender, setGender] = useState(() => {
    const urlGender = searchParams.get('gender');
    const validGenders = ['all', 'male', 'female', 'genderless', 'unknown'];
    return validGenders.includes(urlGender || '') ? urlGender || initialGender : initialGender;
  });

  // Create direct handler functions instead of relying solely on the effect
  const handleStatusChange = (newStatus: string) => {
    console.log('Status change triggered:', newStatus);
    setStatus(newStatus);

    // Directly update the URL when status changes
    const params = new URLSearchParams(searchParams.toString());

    if (newStatus === 'all') {
      params.delete('status');
    } else {
      params.set('status', newStatus);
    }

    // Reset to page 1 when filters change
    params.set('page', '1');

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleGenderChange = (newGender: string) => {
    console.log('Gender change triggered:', newGender);
    setGender(newGender);

    // Directly update the URL when gender changes
    const params = new URLSearchParams(searchParams.toString());

    if (newGender === 'all') {
      params.delete('gender');
    } else {
      params.set('gender', newGender);
    }

    // Reset to page 1 when filters change
    params.set('page', '1');

    router.push(`${pathname}?${params.toString()}`);
  };

  // Use effect only for initial synchronization, not for ongoing updates
  useEffect(() => {
    // Skip the effect on the initial render
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    // This effect now only runs when the URL changes externally
    // (such as from clicking back/forward buttons)
    const urlStatus = searchParams.get('status') || 'all';
    const urlGender = searchParams.get('gender') || 'all';

    if (urlStatus !== status) {
      setStatus(urlStatus);
    }

    if (urlGender !== gender) {
      setGender(urlGender);
    }
  }, [searchParams, status, gender]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="w-full sm:w-1/2">
        <Select value={status} onValueChange={handleStatusChange}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by status">
              {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="alive">Alive</SelectItem>
            <SelectItem value="dead">Dead</SelectItem>
            <SelectItem value="unknown">Unknown</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full sm:w-1/2">
        <Select value={gender} onValueChange={handleGenderChange}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by gender">
              {gender === 'all' ? 'All Genders' : gender.charAt(0).toUpperCase() + gender.slice(1)}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genders</SelectItem>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="genderless">Genderless</SelectItem>
            <SelectItem value="unknown">Unknown</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
