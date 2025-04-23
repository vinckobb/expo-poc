import {Link, Outlet} from "react-router";

export default function BaseLayout() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/explore">Explore</Link>
      </nav>
      <Outlet />
    </div>
  );
}
