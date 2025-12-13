import React from "react";
import Image from "next/image";

const RBLogo = () => {
  return (
    <div className="absolute top-0 left-0 p-3 ">
      <Image
        src="/images/tc.jpeg"
        alt="jj"
        width={60}
        height={60}
        layout="fixed"
        className="rounded-full rotate-animation-bezier "
      />
    </div>
  );
};

export default RBLogo;
