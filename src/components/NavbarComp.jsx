import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Container, Navbar, Button } from "react-bootstrap";

function NavbarComp() {
  const { isLoggedIn, user, logoutUser } = useContext(AuthContext);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {isLoggedIn && (
            <>
              <Link to="/feedPage">
                <Button variant="outline-light">Feed</Button>{" "}
              </Link>
            </>
          )}

          {isLoggedIn && (
            <>
              <Link to="/profile">
                <Button variant="outline-light">Profile</Button>{" "}
              </Link>
              <button onClick={logoutUser}>Logout</button>
              <p>{user.username}</p>
            </>
          )}

          {!isLoggedIn && (
            <>
              <Link to="/signup">
                <Button variant="outline-light">Signup</Button>{" "}
              </Link>
              <Link to="/login">
                <Button variant="outline-light">Login</Button>{" "}
              </Link>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;
