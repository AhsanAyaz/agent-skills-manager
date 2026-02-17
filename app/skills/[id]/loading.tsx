export default function GlobalLoading() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="text-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-4 text-base-content/70">Loading...</p>
      </div>
    </div>
  );
}