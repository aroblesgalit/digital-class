import React from "react";
import './style.css'
import { Link } from "react-router-dom"
import Auth from '../../config/middleware/isAuthenticated';


function Nav() {
  return (

    <nav className="uk-navbar-container my-nav" uk-navbar="true">
      <div className="uk-navbar-left">
        <ul className="uk-navbar-nav">
          <li className="uk-active">
            <Link to="/" className="site-title">Digital Class</Link>
          </li>
        </ul>
      </div>
      <div className="uk-navbar-right">
        <ul className="uk-navbar-nav">
          <li className="uk-active">
            <Link to="/">About</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          {Auth ? 
           <li>
           <Link to='/logout'>logout</Link>
         </li>
         : ''
        } 
         
        </ul>
      </div>
    </nav>
  );

}

export default Nav

