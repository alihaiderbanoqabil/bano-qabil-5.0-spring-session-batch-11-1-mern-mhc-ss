import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import { ErrorBoundaryClassComponent } from "./components/ErrorBoundaryClassComponent";

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);

  root.render(
    <Provider store={store}>
      <ErrorBoundaryClassComponent>
        <App />
      </ErrorBoundaryClassComponent>
    </Provider>,
  );
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  );
}

// const root = document.getElementById('root');
// createRoot(root).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
// createRoot(root).render(<App />)
