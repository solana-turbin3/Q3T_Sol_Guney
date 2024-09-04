import React from "react";

export default function Title({ children }) {
  return (
    <h1 className="text-center text-5xl font-bold font-sans text-black p-12">
      {children}
    </h1>
  );
}
