import React from "react";
import Image from "next/image";

const RBLogo = () => {
  return (
    <div className="absolute top-0 left-0 p-3 ">
      <Image
        src="/images/rblogo.png"
        alt="React Bangalore logo"
        width={60}
        height={60}
        priority
        className="rounded-full rotate-animation-bezier "
      />
    </div>
  );
};

export default RBLogo;
