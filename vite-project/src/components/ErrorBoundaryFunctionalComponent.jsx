import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";

export function ErrorBoundaryFunctionalComponent() {
  const error = useRouteError();

  console.error(error);

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>{error.status}</h1>
        <h2>{error.statusText}</h2>
        <Link to="/">Go Home</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Something went wrong 😢</h1>

      <p>{error?.message || "An unexpected error occurred."}</p>

      {import.meta.env.DEV && <pre>{error?.stack}</pre>}

      <Link to="/">Go Home</Link>
    </div>
  );
}
