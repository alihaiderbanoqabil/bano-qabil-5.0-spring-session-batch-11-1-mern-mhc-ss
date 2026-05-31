import { Component, useState } from "react";
import React from "react";

// export const ErrorBoundaryClassComponent = (props) => {
// const [hasError, setHasError] = useState(false);
//   return (
//     <div>ErrorBoundaryClassComponent</div>
//   )
// }

// const obj = {state:{ hasError: false } };
// obj.name = "ALI"

export class ErrorBoundaryClassComponent extends Component {
  constructor(props) {
    // console.log(this, "this"); {}
    super(props);
    this.state = { hasError: false, error: "" };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ ...this.state, error: error });
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <h1>
          Something went wrong.
          {/* {this.state.error} */}
        </h1>
      );
    }

    return this.props.children;
  }
}

// instances of the above class
// const EB1 = new ErrorBoundaryClassComponent();
// EB1.componentDidCatch()

// const EB2 = new ErrorBoundaryClassComponent();
// ErrorBoundaryClassComponent.getDerivedStateFromError()


// npm install react-error-boundary
// import { ErrorBoundary } from "react-error-boundary";

// <ErrorBoundary fallback={<h1>Something went wrong</h1>}>
//   <App />
// </ErrorBoundary>