import React from "react";

export const Alert = ({ className, message }) => {
  return (
    <div className={`alert ${className}`} role="alert">
      {message}
    </div>
  );
};
