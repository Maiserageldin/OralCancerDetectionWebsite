import React from "react";

export default function Layout({ children }) {
  return (
    <div className="mx-auto px-4 md:px-10">
      {" "}
      {/* Adjusted padding */}
      {children}
    </div>
  );
}
