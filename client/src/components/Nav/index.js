import React, { useState, useEffect } from "react";
import './style.css'
import { Link } from "react-router-dom"
import axios from 'axios';


function Nav() {
  const [islogin, setisLogin] = useState(false);

  function handleLogout() {
    axios.get('api/student-login/logout')
      .then(() => {
        setisLogin(false)
      })
  }

  useEffect(() => {
    axios.get('api/student-login/userdata')
      .then((res) => {
        console.log(res.status)
        setisLogin(true)
      })
      .catch(() => {
        setisLogin(false)
      });
  }, [])

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
          {
            islogin ?
              <li>
                <Link to="" onClick={handleLogout} >Logout</Link>
              </li>
              :
              <li>
                <Link to="/login">
                  <button className='uk-button loginBtn'>Log in</button>
                </Link>
              </li>
          }
        </ul>
      </div>
    </nav>
  );

}

export default Nav;

