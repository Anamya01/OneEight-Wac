import React, { useState, } from 'react';
import './NavBar.css';
import Search from '../Search/Search';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import used from '/Users/anamyavats/Downloads/RecPo/vplay/client/src/images/images.jpeg';
function NavBar() {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [photo, setPhoto] = useState(used);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/login');
    }
    catch (err) {
      console.log(err);
    }
  }
  const showHandlerOpen = () => {
    setShow(true);
  }
  const showHandlerClose = () => {
    setShow(false);
  }
  console.log(user);


  return (
    <div className='NavBar'>
      <div className='xplay'>
        <Link to='/' > <h1>Wac.</h1> </ Link>
        <p id='topstrem'>TOP STREAMING</p>
      </div>
      <div className='user'>
        {user?.email && <Search className="srch"></Search>}
        {user?.email ?
          <div>
            <div className='profile' onClick={showHandlerOpen} onMouseLeave={showHandlerClose}>
              {user ? <p>{user.displayName}</p> : <p>Moron</p>}
              <img src={photo} alt='' ></img>
            </div>
            {show &&
              <div className='bars' onMouseOut={showHandlerClose} onMouseOver={showHandlerOpen}>
                <Link to='/account'>
                  <button className='acountbtn'>Account</button>
                </Link>
                <button className='acountbtn'
                  onClick={handleLogout}>
                  Logout
                </button>
              </div>}
          </div> :
          <div>
            <Link to='/login'>
              <button className='acountbtn'>Sign In</button>
            </Link>
            <Link to='/signup'>
              <button className='acountbtn'>
                Sign Up
              </button>
            </Link>
          </div>
        }
      </div>
    </div>
  )
}

export default NavBar;