import React from "react";
import { Link } from "react-router-dom";
const Signupop = () => {
  return (
    <div className="dropmenue">
      <ul className="not decided">
        <li>
          <h6>Bank's Name</h6>
        </li>
        <hr />
        <li>
          <Link className="link">
            <h6>EMAIL </h6>
          </Link>
          <hr />
          <Link className="link">
            <h6>CONTACT NUMBER </h6>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Signupop;
