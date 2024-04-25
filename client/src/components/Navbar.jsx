import PropTypes from "prop-types"; //
import { Link } from "react-router-dom";

function Navbar({ logout }) {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
      
      <button className="logout" onClick={logout} aria-label="Logout">
        Logout
      </button>
    </nav>
  );
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default Navbar;
