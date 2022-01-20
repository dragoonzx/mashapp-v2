import Image from "next/image";
import React from "react";
import logo from "../../assets/logo.svg";

const Logo = () => {
  return (
    <div>
      <Image
        src={logo}
        height={76}
        width={76}
        className="drop-shadow-[0_0_4px_rgba(177,56,232,0.7)]"
        alt=""
      />
    </div>
  );
};

export default Logo;
