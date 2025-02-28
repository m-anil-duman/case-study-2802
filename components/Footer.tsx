export function Footer(): React.ReactElement {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="mb-2">Rick and Morty Explorer - Next.js Case Study</p>
          <p className="text-gray-400 text-sm">
            Built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui components
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Data provided by{' '}
            <a
              href="https://rickandmortyapi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              The Rick and Morty API
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
