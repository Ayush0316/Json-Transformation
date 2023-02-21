import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";
import Logo from "../img/finallogo.png";
import Signupop from "./Signupop";
const Navbar = () => {
  const [openProfile, setOpenProfile] = useState(false);
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="link">
          <h6>
            <strong>BANKING PAL</strong>
          </h6>
        </div>
        <div className="links">
          {/* <NavLink className="link" to="/">
            <h6>Home</h6>
          </NavLink> */}
          <span className="link" onMouseOver={() => setOpenProfile((prev) => !prev)} onClick={() => setOpenProfile((prev) => !prev)}>
            <h6>Profile</h6>
          </span>
          {openProfile && <Signupop />}
          <Link className="link" to="contactinfo" smooth={true} duration={1000}>
            {/* footer link  */}
            <h6>Contact Info (DEVELOPERS)</h6>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
