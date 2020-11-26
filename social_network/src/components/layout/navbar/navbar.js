import React,{Fragment} from "react";
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from "prop-types";
import './navbar.css'
import {Logout} from '../../../actions/auth'


function Navbar({auth:{isAuthenticated,loading},Logout}) {

  function togglefunction(){
    document.getElementById('navbar-links').classList.toggle('active')
  }

const AuthLinks = (
  <ul>
    <li onClick={togglefunction}>
    <Link to="/profiles">profiles</Link>
  </li>
  <li onClick={togglefunction}>
    <Link to="/posts">posts</Link>
  </li>
  <li onClick={togglefunction}>
    <Link to="/dashboard">Dashboard</Link>
  </li>
  <li onClick={Logout}>
    <Link to="/">Logout</Link>
  </li>
</ul>
)

const GuestLinks = (
  <ul>
  <li onClick={togglefunction}>
    <Link to="/profiles">profiles</Link>
  </li>
  <li onClick={togglefunction}>
  <Link to="/register">Register</Link>
  </li>
  <li onClick={togglefunction}>
  <Link to="/login">Login</Link>
  </li>
</ul>
  )

  return (
    <div>
      <nav className="navbar">
        <div className="brand-title">SOCIAL NET</div>
        <a className="toggle-button" onClick={togglefunction}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </a>
        <div className="navbar-links" id="navbar-links">
  {!loading && (<Fragment>{isAuthenticated ? AuthLinks : GuestLinks}</Fragment>)}
        </div>
      </nav>
    </div>
  );
}

Navbar.propTypes = {
 Logout:PropTypes.func.isRequired,
 auth:PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps,{Logout})(Navbar);
