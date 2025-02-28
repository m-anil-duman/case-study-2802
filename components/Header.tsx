'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header(): React.ReactElement {
  const pathname = usePathname();

  return (
    <header className="bg-gray-900 text-white py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          Rick & Morty Explorer
        </Link>

        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link
                href="/"
                className={`hover:text-blue-400 transition-colors ${
                  pathname === '/' ? 'text-blue-400' : ''
                }`}
              >
                Characters
              </Link>
            </li>
            <li>
              <a
                href="https://rickandmortyapi.com/documentation"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                API Docs
              </a>
            </li>
            <li>
              <Link
                href="/favorites"
                className={`hover:text-blue-400 transition-colors ${
                  pathname === '/favorites' ? 'text-blue-400' : ''
                }`}
              >
                Favorites
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
