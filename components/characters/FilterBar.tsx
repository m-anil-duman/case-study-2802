'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (status === 'all') {
      params.delete('status');
    } else {
      params.set('status', status);
    }

    if (gender === 'all') {
      params.delete('gender');
    } else {
      params.set('gender', gender);
    }

    params.set('page', '1');

    const newUrl = `${pathname}?${params.toString()}`;

    router.push(newUrl);
  }, [status, gender, pathname, router, searchParams]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="w-full sm:w-1/2">
        <Select
          value={status}
          onValueChange={(newStatus) => {
            console.log('Status change triggered:', newStatus);
            setStatus(newStatus);
          }}
        >
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
        <Select
          value={gender}
          onValueChange={(newGender) => {
            console.log('Gender change triggered:', newGender);
            setGender(newGender);
          }}
        >
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
