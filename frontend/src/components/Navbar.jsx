import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">

      {/* Logo */}
      <div>
        <Link
          to="/"
          className="text-3xl font-bold text-blue-800"
        >
          LearnLoop
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex gap-6 items-center">

        <Link
          to="/"
          className="text-gray-700 hover:text-blue-700 font-medium"
        >
          Home
        </Link>

        <Link
          to="/dashboard"
          className="text-gray-700 hover:text-blue-700 font-medium"
        >
          Dashboard
        </Link>

        <Link
          to="/login"
          className="text-gray-700 hover:text-blue-700 font-medium"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="bg-blue-700 text-white px-5 py-2 rounded-xl hover:bg-blue-800 transition"
        >
          Register
        </Link>
        <Link
  to="/feed"
  className="text-gray-700 hover:text-blue-700 font-medium"
>
  Doubt Feed
</Link>
<Link
  to="/ai"
  className="text-gray-700 hover:text-blue-700 font-medium"
>
  AI Assistant
</Link>
      </div>

    </nav>
  );
}

export default Navbar;