"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">
          Oops!
        </h1>

        <h2 className="mt-6 text-3xl font-bold">
          Something went wrong
        </h2>

        <p className="mt-4 text-gray-600">
          {error.message}
        </p>

        <button
          onClick={reset}
          className="
            mt-8
            rounded-xl
            bg-blue-600
            px-6
            py-3
            font-semibold
            text-white
            transition
            hover:bg-blue-700
          "
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
