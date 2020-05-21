import React from "react";
import { Link } from "react-router-dom"

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <Link className="navbar-brand" to="/">
      Google Reading List
    </Link>
    <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
            <Link className="nav-link" to="/">Search</Link>
        </li>
        <li className="nav-item active">
            <Link className="nav-link" to="/saved">Save</Link>
        </li>
    </ul>
  </nav>
  );
}

export default Nav;
