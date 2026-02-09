import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <div className="text-center px-4">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-400 mb-8">Page not found</p>
          <Link
            href="/en"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-orange-500 text-white font-medium hover:opacity-90 transition-opacity"
          >
            Go Home
          </Link>
        </div>
      </body>
    </html>
  );
}
