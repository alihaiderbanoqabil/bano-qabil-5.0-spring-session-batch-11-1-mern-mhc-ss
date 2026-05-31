import React, { forwardRef } from "react";

export const Input = forwardRef((props, ref) => {
  return <input type="text" placeholder="Enter your name" ref={ref} />;
});
