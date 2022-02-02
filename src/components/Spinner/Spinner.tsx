import React from "react";

export const Spinner = () => {
  return (
    <div className="flex justify-center space-x-2 p-4">
      <div
        className="align-middle text-blue-600 spinner-border animate-spin w-12 h-12 border-4 rounded-full"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
