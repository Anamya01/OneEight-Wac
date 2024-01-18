import React from 'react'
import { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar/NavBar'
import { UserAuth } from '../context/AuthContext';
import './Login.css';
function Login() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState('');
  const {user, logIn} = UserAuth('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await logIn(email, password);
      navigate('/');
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };
  return (
    <div className='dm'>
    <NavBar/>
    <div className='bgc'></div>
    <div className='signin'>
      {
        error && <p>{error.substring(10)}</p>
      }
      <p className='head'>Login</p>
      <form onSubmit={handleSubmit} >
        <input className='ing' name='email' onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='email' ></input>
        
        <input className='ing'  name='pswrd' onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='password'></input>
        <p><input type="checkbox"/>remember me</p>
        <button>Sign In</button>
        <div> <Link to='/signup'> Sign Up  </Link> </div>
      </form>
    </div>
    </div>
  )
}

export default Login