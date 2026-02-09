'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
        <p className="text-gray-600 mb-8">
          We're sorry for the inconvenience. Please try again.
        </p>
        <button
          onClick={reset}
          className="btn-primary cursor-scale bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
