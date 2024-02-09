import { NavLink } from "react-router-dom";
import { IoCreateSharp } from "react-icons/io5";
import { IoMdExit } from "react-icons/io";
import { MdEditNote } from "react-icons/md";
import { IoIosLogIn } from "react-icons/io";
import "./navbar.css";

function NavBar({ user, logout }) {
  return (
    <nav className="nav-bar">
      {!user && (
        <>
          <div className="container-signup">
            <NavLink className="linkStyle" to="/register">
              <p className="createEntry">
                SIGN UP
                <MdEditNote />
              </p>
            </NavLink>
          </div>
          <div className="container-login">
            <NavLink className="linkStyle" to="/login">
              <p className="createEntry">
                LOGIN
                <IoIosLogIn />
              </p>
            </NavLink>
          </div>
        </>
      )}
      {user && (
        <>
          <div className="container-entries">
            {user.role === "admin" && (
              <NavLink className="linkStyle" to="/message">
                <p className="createEntry">
                  CREATE ENTRY
                  <IoCreateSharp style={{}} />
                </p>
              </NavLink>
            )}
          </div>
          <div className="container-logout">
            <NavLink className="button-logout" onClick={logout}>
              <p className="createEntry">
                LOGOUT
                <IoMdExit />
              </p>
            </NavLink>
          </div>
        </>
      )}
    </nav>
  );
}
export default NavBar;
