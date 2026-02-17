import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center p-4">
      <div className="text-center">
        <div className="text-8xl font-bold text-primary mb-4">404</div>
        <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
        <p className="text-base-content/70 mb-6">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/" className="btn btn-primary">
            Go Home
          </Link>
          <Link href="/skills" className="btn btn-ghost">
            Browse Skills
          </Link>
        </div>
      </div>
    </div>
  );
}