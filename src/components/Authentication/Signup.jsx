import React, { useEffect, useState } from  'react';
import { baseUrl, headers } from '../../Globals';
import { useNavigate } from 'react-router-dom';
import "./Signup.css"
import { Typography, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';




const Signup = ({ loginUser, loggedIn }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('')

    useEffect(() => {
        if( loggedIn ) {
            navigate('/places')
        }
    }, [loggedIn, navigate])

    const handleSubmit = e => {
        e.preventDefault();
    

        const strongParams = {
            user: {
                username,
                password
            }
        }

        fetch(baseUrl + '/users', {
            method: "POST",
            headers,
            body: JSON.stringify(strongParams)
        })
        // .then(checkStatus)
        .then((r) => {
           if (r.ok) {
               r.json().then((data) => {
                //    setUsername(user);
                //    navigate("/places");
                loginUser(data.user);
            localStorage.setItem('jwt', data.token)
            navigate('/places');
               

               });

           }else {
               r.json().then((error) => {
                   console.log(error)
                   
                //    const err = {error}
                //    const erArr = Object.values(error)
                setError(error)
                //    console.log(err)
                console.log(error)
                
                 
        
               })
           }
        // .then(data => {
        //     loginUser(data.user);
        //     if (data.token) {
        //         localStorage.setItem('jwt', data.token)
        //     }
        //     navigate('/places')

        })
        // .catch(err => {

        //     console.log(err)
        //     // setError(error)
        // })
    }
    // const checkStatus = (response) => {
    //     if (response.status >= 200 && response.status < 300) {
    //       return Promise.resolve(response)
    //     } else {
    //       return Promise.reject(new Error(response.err))
    //     }
    //   }
    return (

        <div>
            <h2>Create Account</h2>
            {/* <p>
           {error[2]}
          </p> */}
          <p>
          {error.username}
          </p>
            <form >
                <div>
                <label>Username: </label>
                <input type="text" name="username" id="username" value={ username } onChange={ e => setUsername(e.target.value) } /></div>
                <div>
                <label>Password: </label>
                <input type="password" name="password" id="password" value={ password } onChange={ e => setPassword(e.target.value) } /></div>

                <Button variant="contained" endIcon={<SendIcon/>}onClick= { handleSubmit } type="submit" value="Create Account">Create Account</Button>

            </form>
        </div>
    )
}

export default Signup;