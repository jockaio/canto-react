import React, { Component } from 'react';
import { Link } from 'react-router';
import { login, logout, isLoggedIn} from '../utils/AuthService';
import '../App.css';

class Nav extends Component {

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link className="navbar-brand" to="/">Cantofy</Link>
        

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              { 
              ( isLoggedIn() ) ? <Link className="nav-link" to="/myprofile">My profile</Link> :  ''
              }
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li>
              { 
                (isLoggedIn()) ? ( <button className="btn btn-danger log" onClick={() => logout()}>Log out </button> ) : ( <button className="btn btn-info log" onClick={() => login()}>Log In</button> )
              }
            </li>
          </ul> 
        </div>
      </nav>
    );
  }
}

export default Nav;
