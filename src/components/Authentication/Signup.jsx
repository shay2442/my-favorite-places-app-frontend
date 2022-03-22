import React, { useEffect, useState } from  'react';
import { baseUrl, headers } from '../../Globals';
import { useNavigate } from 'react-router-dom';

const Signup = ({ loginUser, loggedIn }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

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
        .then(r => r.json())
        .then(data => {
            loginUser(data.user);
            localStorage.setItem('jwt', data.token)
            navigate('/places')
        })
    }

    return (

        <div>
            <h2>Create Account</h2>
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