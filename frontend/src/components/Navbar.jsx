import {

  Link,
  useNavigate

} from "react-router-dom";

import {

  useEffect,
  useState

} from "react";

function Navbar() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {

    const storedUser = JSON.parse(

      localStorage.getItem("loggedInUser")

    );

    setUser(storedUser);

  }, []);

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem(
      "loggedInUser"
    );

    alert("Logged Out Successfully");

    navigate("/login");

    window.location.reload();
  };

  return (

    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0B1020]/80 backdrop-blur-2xl">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >

          <div className="w-11 h-11 rounded-2xl bg-linear-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">

            <span className="text-white font-black text-lg">
              L
            </span>

          </div>

          <div>

            <h1 className="text-2xl font-black bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">

              LearnLoop

            </h1>

            <p className="text-[11px] text-gray-400 -mt-1">
              Collaborative AI Learning
            </p>

          </div>

        </Link>

        {/* Navigation */}
        <div className="hidden lg:flex items-center gap-3">

          <Link
            to="/"
            className="px-4 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300"
          >
            Home
          </Link>

          <Link
            to="/dashboard"
            className="px-4 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300"
          >
            Dashboard
          </Link>

          {user?.role !== "Student" && (
            <Link
              to="/feed"
              className="px-4 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              Doubt Feed
            </Link>
          )}

          {user?.role !== "Teacher" && (
            <Link
              to="/ask"
              className="px-4 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              Ask Doubt
            </Link>
          )}
          <Link
  to="/resolved"
  className="px-4 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300"
>
  Resolved Doubts
</Link>

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {user ? (

            <>

              {/* User Card */}
              <div className="hidden md:flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl backdrop-blur-xl">

                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-linear-to-r from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white">

                  {user.name?.charAt(0).toUpperCase()}

                </div>

                {/* User Info */}
                <div>

                  <p className="text-sm font-semibold text-white">
                    {user.name}
                  </p>

                  <p className="text-xs text-blue-300">
                    {user.credits || 0} Credits
                  </p>

                </div>

              </div>

              {/* Logout */}
              <button

                onClick={handleLogout}

                className="px-5 py-2 rounded-2xl bg-red-500/10 border border-red-400/20 text-red-300 hover:bg-red-500/20 transition-all duration-300"

              >

                Logout

              </button>

            </>

          ) : (

            <>

              <Link

                to="/login"

                className="px-5 py-2 rounded-2xl text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300"

              >

                Login

              </Link>

              <Link

                to="/register"

                className="px-6 py-3 rounded-2xl bg-linear-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg shadow-blue-500/20 hover:scale-[1.03] transition-all duration-300"

              >

                Get Started

              </Link>

            </>

          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;