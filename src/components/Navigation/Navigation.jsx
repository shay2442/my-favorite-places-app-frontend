import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navigation = ({ loggedIn, logoutUser, currentUser }) => {
  const [apiPlaces, setApiPlaces] = useState([]);

  // fetch("https://foodbukka.herokuapp.com/api/v1/menu")
  //   .then((r) => r.json())
  //   .then((apiPlaces) => setApiPlaces(apiPlaces.Result));

  const menus = apiPlaces.map((place) => {
    return <img src={place.images[1]} height="100px" width="0px" />;
  });
  // console.log(prices)

  const loggedOutLinks = () => {
    return (
      <div className="body">
        <h1 className="sulogin">My Favorite Places</h1>
        <h3 className="h3">
          {" "}
          A place for you to save all of your favorite places and remember what
          you liked about them. Enjoy!
        </h3>

     
        <ul>
          <li>
            <Link className="link" to="/signup">
              Signup{" "}
            </Link>
          </li>
          <li>
            <Link className="link" to="/login">
              Login
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser();
  };

  const loggedInLinks = () => {
    return (
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/home">
            {currentUser.username}'s Places
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/places">Places</Nav.Link>
            <Nav.Link href="/places/new">New Place</Nav.Link>
            <Nav.Link onClick={handleLogout} href="/">
              Logout
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
  };

  return (
    <div>
      <div>{loggedIn ? loggedInLinks() : loggedOutLinks()}</div>;
      <div>{menus}</div>
    </div>
  );
};

export default Navigation;
