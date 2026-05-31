import { useRef } from "react";
import { Input } from "../components/Input";

export function NotFound() {
  const inputRef = useRef();

  const focusInput = () => {
    inputRef.current.focus();
    inputRef.current.style.backgroundColor = "cyan";
  };

  return (
    <h2>
      {/* 404 - Page Not Found */}
      <Input ref={inputRef} />
      {/* <input type="text" placeholder="Enter your name" ref={inputRef} /> */}
      <button onClick={focusInput}>Focus Input</button>
    </h2>
  );
}
