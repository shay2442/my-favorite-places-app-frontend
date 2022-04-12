import React, { useEffect, useState } from "react";
import { baseUrl, headers } from "../../Globals";
import { useNavigate } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { ErrorSharp } from "@mui/icons-material";

const Signup = ({ loginUser, loggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (loggedIn) {
      navigate("/places");
    }
  }, [loggedIn, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const strongParams = {
      user: {
        username,
        password,
        password_confirmation: passwordConf,
      },
    };

    console.log(strongParams)

    fetch(baseUrl + "/users", {
      method: "POST",
      headers,
      body: JSON.stringify(strongParams),
    })
      // .then(checkStatus)
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => {
            //    setUsername(user);
            //    navigate("/places");
            loginUser(data.user);
            localStorage.setItem("jwt", data.token);
            navigate("/places");
          });
        } else {
          r.json().then((errors) => {
            console.log(errors);
            //    const err = {error}
            //    const erArr = Object.values(error)
            setErrors(errors);
            //    console.log(err)

            console.log(errors.errors);
          });
        }
        // .then(data => {
        //     loginUser(data.user);
        //     if (data.token) {
        //         localStorage.setItem('jwt', data.token)
        //     }
        //     navigate('/places')
      });
    // .catch(err => {

    //     console.log(err)
    //     // setError(error)
    // })
  };
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
      <p>{errors.errors}</p>
      <form>
        <div>
          <label>Username: </label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Password Confirmation: </label>
          <input
            type="password"
            name="password_confirmation"
            id="password_confirmation"
            value={passwordConf}
            onChange={(e) => setPasswordConf(e.target.value)}
          />
        </div>

        <Button
          disabled={passwordConf.length < 1 || password !== passwordConf}
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleSubmit}
          type="submit"
          value="Create Account"
        >
          Create Account
        </Button>
      </form>
    </div>
  );
};

export default Signup;
