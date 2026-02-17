import Link from "next/link";

/**
 * Landing Page - SSG (Static Site Generation)
 * This page is statically generated at build time
 */
export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-8rem)]">
      {/* Hero Section */}
      <section className="hero min-h-[60vh] bg-gradient-to-br from-primary/20 via-base-100 to-secondary/20">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold">
              Build & Share <span className="text-primary">Agent Skills</span>
            </h1>
            <p className="py-6 text-lg opacity-80">
              Create powerful AI agent skills using markdown. Share them
              publicly or keep them private. Built with Next.js 16, Prisma, and
              modern rendering strategies.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/skills" className="btn btn-primary btn-lg">
                Browse Skills
              </Link>
              <Link href="/register" className="btn btn-outline btn-lg">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Rendering Strategies Demonstrated
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-primary">📄 SSG</h3>
                <p>
                  Static Site Generation. This landing page is built at compile
                  time for maximum performance.
                </p>
                <div className="badge badge-outline">This Page</div>
              </div>
            </div>

            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-secondary">🔄 ISR</h3>
                <p>
                  Incremental Static Regeneration. Skills gallery revalidates
                  every 60 seconds for fresh content.
                </p>
                <div className="badge badge-outline">/skills</div>
              </div>
            </div>

            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-accent">⚡ SSR</h3>
                <p>
                  Server-Side Rendering. Dashboard uses cookies for auth,
                  rendering fresh data per request.
                </p>
                <div className="badge badge-outline">/dashboard</div>
              </div>
            </div>

            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-warning">🎯 CSR</h3>
                <p>
                  Client-Side Rendering. Auth forms and skill editor use React
                  state on the client.
                </p>
                <div className="badge badge-outline">/login, /new</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-12 bg-base-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-8">Tech Stack</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="badge badge-lg badge-primary gap-2">Next.js 16</div>
            <div className="badge badge-lg badge-secondary gap-2">React 19</div>
            <div className="badge badge-lg badge-accent gap-2">Prisma 7</div>
            <div className="badge badge-lg badge-info gap-2">PostgreSQL</div>
            <div className="badge badge-lg badge-success gap-2">DaisyUI</div>
            <div className="badge badge-lg gap-2">Tailwind CSS 4</div>
          </div>
        </div>
      </section>
    </div>
  );
}