import React, { useEffect, useState } from  'react';
import { baseUrl, headers } from '../../Globals';
import { useNavigate } from 'react-router-dom';


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
        .then(r => r.json())
        .then(data => {
            loginUser(data.user);
            if (data.token) {
                localStorage.setItem('jwt', data.token)
            }
            navigate('/places')
        })
        .catch(err => {
          
            console.log(err)
            // setError(error)
        })
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
            <p>{error}</p>
            <form onSubmit= { handleSubmit }>
                <div>
                <label>Username: </label>
                <input type="text" name="username" id="username" value={ username } onChange={ e => setUsername(e.target.value) } /></div>
                <div>
                <label>Password: </label>
                <input type="password" name="password" id="password" value={ password } onChange={ e => setPassword(e.target.value) } /></div>

                <input type="submit" value="Create Account" />

            </form>
        </div>
    )
}

export default Signup;