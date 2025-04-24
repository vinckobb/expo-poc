import {Link, Outlet} from "react-router";

export default function BaseLayout() {
  return (
    <div>
      <div className="bg-secondary-600 text-white p-4 flex justify-between items-center">
        <div className="text-lg font-bold">Expo poc</div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/explore">Explore</Link>
          </li>
          <li>
            <Link to="/gluestack">Gluestack</Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
}
