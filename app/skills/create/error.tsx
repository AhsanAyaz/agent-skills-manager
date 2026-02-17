"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="text-center py-16">
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={reset} className="btn btn-primary">
        Try again
      </button>
    </div>
  );
}