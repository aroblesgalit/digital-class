import React, { useState, useEffect } from "react";
import './style.css'
import { Link } from "react-router-dom"
import API from "../../utils/API";


function Nav() {
  const [islogin, setisLogin] = useState(false);
  const [userType, setUserType] = useState("");

  function handleLogout() {
    API.logoutUser()
      .then(() => {
        setisLogin(false)
      })
  }

  useEffect(() => {
    API.getStudentData()
      .then((res) => {
        console.log(res.status);
        setUserType(res.data.userType);
        setisLogin(true)
      })
      .catch(() => {
        setisLogin(false)
      });
  }, [])

  return (
    <nav className="uk-navbar-container my-nav" id="navbar" uk-navbar="true">
      <div className="uk-navbar-left">
        <ul className="uk-navbar-nav">
          <li className="uk-active">
            <Link to="/" className="site-title"><span>Digital</span>Class</Link>
          </li>
        </ul>
      </div>
      <div className="uk-navbar-right">
        {islogin ?
          <ul className="uk-navbar-nav">
            <li>
              <Link to={`/${userType}s/profile`}>Profile</Link>
            </li>
            <li>
              <Link to="" onClick={handleLogout} >Logout</Link>
            </li>
          </ul>
          :
          <ul className="uk-navbar-nav">
            <li className="uk-active">
              <Link to="/">About</Link>
            </li>
            <li>
              <Link to="/login">
                <button className='uk-button loginBtn'>Log in</button>
              </Link>
            </li>
          </ul>
        }
      </div>
    </nav>
  );

}

export default Nav;

