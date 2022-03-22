import React from  'react';
import { useState, useEffect } from 'react'
import { baseUrl, headers } from '../../Globals'
import { useNavigate } from 'react-router-dom'

const Login = ( {loginUser, loggedIn}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        if( loggedIn ) {
            navigate('/places')
        }
    }, [loggedIn, navigate])

    const handleSubmit = e => {
        e.preventDefault();
    
        const strongParams = {
          username,
          password
        }
    
        fetch(baseUrl + '/login', {
          method: "POST",
          headers,
          body: JSON.stringify(strongParams)
        })
          .then(resp => resp.json())
          .then(data => {
            loginUser(data.user);
            localStorage.setItem('jwt', data.token)
            navigate('/places');
          })
      }

      return(

    <div>
            <h2>Login</h2>
            <form onSubmit={ handleSubmit } >
            <label>Username</label>
                <div><input type="text" name="" id="" value={ username } onChange= { e => setUsername(e.target.value) }/></div>
                <label>Password</label>
                <div><input type="password" name="" id="" value={ password } onChange= { e => setPassword(e.target.value) }/></div>

                <input type="submit" value="Login" />
            </form>
        </div>
      )
    }

export default Login;