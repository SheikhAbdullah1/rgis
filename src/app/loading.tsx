export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="text-center">
        <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />

        <h2 className="mt-6 text-2xl font-bold text-gray-900">
          Loading RGIS...
        </h2>

        <p className="mt-2 text-gray-600">
          Please wait while we prepare your experience.
        </p>
      </div>
    </div>
  );
}
