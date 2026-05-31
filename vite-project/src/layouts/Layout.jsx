import { Link, NavLink, Outlet } from "react-router-dom";
import Header from "../components/Header";
import { Footer } from "../components/Footer";

export function Layout() {
  return (
    <div>
      {/* <nav>
        <li>
          <NavLink to="/" style={(style) => {

            // { isActive, isPending }
            return {
              color:
                style.isActive ? "red" : "black",
              backgroundColor: style.isActive ? "yellow" : "yellowgreen",
            }
          }}
          >Home</NavLink>

        </li>

        <li>
          <NavLink to="/about" style={({ isActive }) => ({
            color:
              isActive ? "red" : "black",
            backgroundColor: isActive ? "yellow" : "yellowgreen",
          })}
          >About</NavLink>

        </li>
        <li>
          <NavLink to="/contact" style={({ isActive }) => ({
            color:
              isActive ? "red" : "black",
            backgroundColor: isActive ? "yellow" : "yellowgreen",
          })}
          >Contact</NavLink>

        </li>

      </nav> */}
      {/* <Header /> */}
      <nav>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/antd-playground"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Antd Playground
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/users"
            state={"ali"}
            replace={true}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Users
          </NavLink>
        </li>
      </nav>
      {/* <nav>
        <li>
          <Link to="/">Home</Link>

        </li>

        <li>
          <Link to="/about">About</Link>

        </li>
        <li>
          <Link to="/contact">Contact</Link>

        </li>

      </nav> */}
      {/* Child routes render here */}
      <Outlet />
      <Footer />
    </div>
  );
}
