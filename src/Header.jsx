import React from "react";
import logo from "./head.svg";

const Header = () => {
  return (
    <header>
      <img src={logo} alt="olympgram logo" className="logo" />
    </header>
  );
};

export default Header;
