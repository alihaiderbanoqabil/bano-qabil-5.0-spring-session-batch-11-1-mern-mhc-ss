import { Link, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div style={styles.container}>
      <h1>React Router DOM v7 Demo</h1>

      <nav style={styles.nav}>
        {/* <a href=""></a> */}
        <Link to="/">Home</Link>

        <Link to="/about">About</Link>

        <Link to="/contact">Contact</Link>

        <Link to="/user/101">User 101</Link>

        <Link to="/user/202">User 202</Link>
      </nav>

      {/* Child routes render here */}
      <Outlet />
    </div>
  );
}
