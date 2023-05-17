/*import React from 'react'
import './Navbar.css';

const navbar = ({band}) => {
  return (
    <nav className='navbar'>
        <div className='container'>
            <a className='navbar-brand' href='../Tours'>Live</a>
            <a href="/">
            <img src={require("./logonavbar.jpg")} alt="band-title" className='Band-title-navbar'/>
            </a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link" href="https://www.facebook.com">
                    <i className="fab fa-facebook-square"></i>
                  </a>
                </li>
              </ul>
            </div>

        </div>

    </nav>
  )
}

export default navbar*/

import React from 'react';
import './Navbar.css';

const Navbar = ({ band }) => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className='left-navbar'>
          <a className="navbar-brand" href="../Tours">Live</a>
          <a className="navbar-brand" href="https://www.youtube.com/channel/UC-KTRBl9_6AX10-Y7IKwKdw">Videos</a>
          <a className="navbar-brand" href="https://arcticmonkeys.ffm.to/store">Store</a>
        </div>
        <div className='middle-navbar'>
          <a href="/">
            <img src={require("./logonavbar.jpg")} alt="band-title" className="Band-title-navbar" />
          </a>
        </div>
        <div className='right-navbar'>
            <ul className="navbar-list">
              <li className="nav-item">
                <a className="nav-link" href="https://arcticmonkeys.ffm.to/fb">
                  <i className="fab fa-facebook-square fa-lg"></i>
                </a>
                <a className="nav-link" href="https://arcticmonkeys.ffm.to/ig">
                  <i className="fab fa-instagram-square fa-lg"></i>
                </a>
                <a className="nav-link" href="https://arcticmonkeys.ffm.to/sp">
                  <i className="fab fa-spotify fa-lg"></i>
                </a>
                <a className="nav-link" href="https://arcticmonkeys.ffm.to/am">
                  <i className="fab fa-apple fa-lg"></i>
                </a>
                <a className="nav-link" href="https://arcticmonkeys.ffm.to/yt">
                  <i className="fab fa-youtube fa-lg"></i>
                </a>
                <a className="nav-link" href="https://arcticmonkeys.com/#newsletter">
                  <i className="fas fa-envelope fa-lg"></i>
                </a>
              </li>
            </ul>
        </div>
      </div>

    </nav>
  );
}

export default Navbar;

