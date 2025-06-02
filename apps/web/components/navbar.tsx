import Link from "next/link";

export function Navbar() {
  return (
    <div className="bg-green-600 text-white p-4 flex justify-between items-center">
      <div className="text-lg font-bold">Expo poc</div>
      <ul className="flex space-x-4">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
        <li>
          <Link href="/explore">Explore</Link>
        </li>
      </ul>
    </div>
  );
}
