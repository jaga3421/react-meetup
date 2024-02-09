import React from "react";

function SlideWrapper({ children, className, id }) {
  return (
    <div
      className={`flex max-w-[1600px] mx-auto relative snap-center flex-col h-screen w-screen justify-center items-center p-16 ${className}`}
      id={id}
    >
      {children}
    </div>
  );
}

export default SlideWrapper;
