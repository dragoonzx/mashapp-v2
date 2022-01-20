import React from "react";
import Logo from "../Logo";

const Header = () => {
  return (
    <header className="flex justify-between items-center">
      <Logo />
      <div>
        <button
          type="button"
          className="bg-gradient-to-br from-[#BF53E0] via-[#A431D2] to-[#794EF2] px-4 py-2 rounded text-sm uppercase"
          disabled
        >
          In development
        </button>
      </div>
    </header>
  );
};

export default Header;
