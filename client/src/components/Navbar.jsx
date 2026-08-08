import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          PL SPORTS FEST 2026
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/tournament">Tournament</Link>
          <Link to="/admin">Admin Portal</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
