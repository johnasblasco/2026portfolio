export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-8xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Page not found</p>
      <a
        href="/"
        className="bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors"
      >
        Go Home
      </a>
    </div>
  );
}
