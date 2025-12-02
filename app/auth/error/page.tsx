export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-white">
          Ha ocurrido un error al verificar tu cuenta.
        </p>
      </div>
    </div>
  );
}
