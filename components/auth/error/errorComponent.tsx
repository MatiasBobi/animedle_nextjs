"use client";

import { useSearchParams } from "next/navigation";

function ErrorContent() {
  const searchParams = useSearchParams();
  const extract_message = searchParams.get("message");

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>

      {extract_message === "code_not_found" && (
        <p className="text-white">
          No se ha encontrado el código de verificación. Por favor, inténtalo de
          nuevo.
        </p>
      )}

      {extract_message === "auth_failed" && (
        <p className="text-white">
          Ha ocurrido un error al autenticar tu cuenta. Por favor, inténtalo de
          nuevo.
        </p>
      )}

      {extract_message === "unexpected_error" && (
        <p className="text-white">
          Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.
        </p>
      )}
    </div>
  );
}

export default ErrorContent;
