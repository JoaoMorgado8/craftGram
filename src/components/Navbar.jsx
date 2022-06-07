import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
//import { Navbar } from "react-bootstrap/Navbar";

function Navbar() {
  const { isLoggedIn, user, logoutUser } = useContext(AuthContext);

  return (
    <nav>
      {isLoggedIn && (
        <>
          <Link to="/feedPage">
            <button>Feed</button>
          </Link>
        </>
      )}

      {isLoggedIn && (
        <>
          <Link to="/profile">
            <button>Profile</button>
          </Link>
          <button onClick={logoutUser}>Logout</button>
          <p>{user.username}</p>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            <button>Signup</button>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
