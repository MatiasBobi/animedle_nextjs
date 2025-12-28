import ErrorContent from "@/components/auth/error/errorComponent";
import { Suspense } from "react";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <Suspense fallback={<p className="text-white">Cargando error...</p>}>
        <ErrorContent />
      </Suspense>
    </div>
  );
}
