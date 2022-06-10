import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Container, Navbar, Nav, Card } from "react-bootstrap";

function NavbarComp() {
  const { isLoggedIn, user, logoutUser } = useContext(AuthContext);

  return (
    <>
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container>
          <Nav.Link as={Link} to="/">
            {" "}
            <Navbar.Brand>CraftGram</Navbar.Brand>
          </Nav.Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {isLoggedIn && (
                <>
                  <Nav.Link as={Link} to="/feedPage">
                    Feed
                  </Nav.Link>
                </>
              )}

              {isLoggedIn && (
                <>
                  <Nav.Link as={Link} to="/profile">
                    Profile
                  </Nav.Link>
                  <Nav.Link onClick={logoutUser}>Logout</Nav.Link>
                  {/*  <button onClick={logoutUser}>Logout</button> */}
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
      <br />
    </>
  );
}

export default NavbarComp;
