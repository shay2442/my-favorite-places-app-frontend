import React from  'react';
import { useState, useEffect } from 'react'
import { baseUrl, headers } from '../../Globals'
import { useNavigate, Navigate } from 'react-router-dom'


const Login = ( {loginUser, loggedIn}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState('')
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
          .then((resp) => {
            if(resp.ok) {
             resp.json().then((data) => {
              loginUser(data.user);
              localStorage.setItem('jwt', data.token)
              navigate('/places');
             });
            }else {
              resp.json().then((errors) => {
                console.log(errors.error)
                alert("Invalid username or password")
                setErrors(errors)
                
              })
            }
          })
        }

        // if (user) {
        //   return <Navigate to="/rooms"/>
        // }

      return(

    <div className="container">
            <h2 className="title">Login</h2>
            <h3> {errors.error} </h3>
            <form onSubmit={ handleSubmit } >
            <label>Username</label>
                <input type="text" name="" id="" placeholder="username" value={ username } onChange= { e => setUsername(e.target.value) }/>
                <label>Password</label>
                <input type="password" name="" id="" placeholder="password" value={ password } onChange= { e => setPassword(e.target.value) }/>
                <button className="button" onClick= { handleSubmit } type="submit" value="Login">Login</button>
                {/* <input type="submit" value="Login" /> */}
               
            </form>
        </div>
      )
    }

export default Login;