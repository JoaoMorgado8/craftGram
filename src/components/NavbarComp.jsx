import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Container, Navbar, Nav } from "react-bootstrap";

function NavbarComp() {
  const { isLoggedIn, user, logoutUser } = useContext(AuthContext);

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isLoggedIn && (
              <>
                {/* <Link to="/feedPage">
                  <Button variant="outline-light">Feed</Button>{" "}
                </Link> */}
              </>
            )}

            {isLoggedIn && (
              <>
                <Link to="/profile">
                  {/*  <Button variant="outline-light">Profile</Button>{" "} */}
                </Link>
                <Nav.Link onClick={logoutUser}>Logout</Nav.Link>
                {/*  <button onClick={logoutUser}>Logout</button> */}
                <p>{user.username}</p>
              </>
            )}

            {!isLoggedIn && (
              <>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;
