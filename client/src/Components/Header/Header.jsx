import NavBar from "../Shared/navBar/NavBar";
import { BsFillPersonFill } from "react-icons/bs";

import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import "./header.css";
function Header() {
  const { logout, user } = useAuth();
  return (
    <>
      <header className="headerr">
        <div className="header-container">
          <Link className="contacts" to="/contact">
            <BsFillPersonFill />
          </Link>
        </div>
        <Link className="linkStyleS" to="/">
          <img
            className="imgHeader"
            src="../src/Assets/log.png"
            alt="logo web"
          />
        </Link>
        <div className="h1Head">
          <h1 className="h1Header">ACCESIBLE</h1>
          <h1 className="h1Header1">CITY</h1>
        </div>

        <nav className="navb">
          {user && <p className="nameUser">Hi @{user.username}!</p>}
        </nav>
      </header>

      <NavBar user={user} logout={logout} />
    </>
  );
}

export default Header;
