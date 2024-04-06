import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-extrabold text-purple-500 mb-8">
        SISMOTRACK
      </h1>
      <div className="text-center">
        <p className="text-lg font-semibold mb-2">Hubo un error.</p>
        {error && (
          <p className="text-red-500">
            {error.statusText ||
              error.message ||
              "Ha ocurrido un error inesperado."}
          </p>
        )}
      </div>
    </div>
  );
}

export default ErrorPage;
