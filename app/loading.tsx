export default function Loading(): React.ReactNode {
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    </div>
  );
}
