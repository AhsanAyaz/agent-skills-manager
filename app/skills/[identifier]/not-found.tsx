import Link from "next/link";

export default function NotFound() {
  return <section className="p-4 max-w-md my-4 mx-auto text-center border border-primary rounded-md">
    <h1>404 - Page Not Found</h1>
    <Link className="btn btn-outline mt-4" href={'/'}>Go to home</Link>
  </section>
}