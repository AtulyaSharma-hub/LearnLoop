import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Register() {

  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("Student");
 
  const handleRegister = async (e) => {

    e.preventDefault();

    if (!name || !email || !password || !role) {

      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {

      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
          role
        }
      );

      alert("Registration Successful!");

      navigate("/login");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-[#0B1020] flex items-center justify-center overflow-hidden relative px-6">

      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 blur-3xl rounded-full"></div>

      {/* Main Layout */}
      <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center max-w-6xl w-full">

        {/* Left Side */}
        <div className="hidden lg:block">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-sm text-purple-200 mb-8">
            Join the Future of Collaborative Learning
          </div>

          <h1 className="text-6xl font-black leading-tight text-white">

            Build Your
            <br />

            <span className="bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Learning Network
            </span>

          </h1>

          <p className="mt-8 text-xl text-gray-300 leading-relaxed max-w-xl">
            Become part of a student-powered ecosystem where learning,
            mentorship, AI assistance, and collaborative growth come together
            in one intelligent platform.
          </p>

          {/* Floating Info Cards */}
          <div className="mt-12 space-y-5">

            <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-5 max-w-md">
              <p className="text-purple-200 text-sm">
                🚀 Earn knowledge credits by helping fellow students
              </p>
            </div>

            <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-5 max-w-sm ml-10">
              <p className="text-blue-200 text-sm">
                🤝 Connect with peers, mentors, and AI-guided sessions
              </p>
            </div>

          </div>

        </div>

        {/* Register Card */}
        <div className="relative">

          <div className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 w-full">

            <div className="text-center">

              <h2 className="text-4xl font-bold text-white">
                Create Account
              </h2>

              <p className="text-gray-300 mt-4">
                Start your collaborative learning journey
              </p>

            </div>

            <form
              onSubmit={handleRegister}
              className="mt-10 space-y-6"
            >

              {/* Name */}
              <div>

                <label className="text-sm text-gray-300">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="mt-2 w-full bg-white/5 border border-white/10 text-white placeholder-gray-400 p-4 rounded-2xl outline-none focus:border-purple-400 transition"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

              </div>

              {/* Email */}
              <div>

                <label className="text-sm text-gray-300">
                  Institution Email
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="mt-2 w-full bg-white/5 border border-white/10 text-white placeholder-gray-400 p-4 rounded-2xl outline-none focus:border-blue-400 transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

              </div>

              {/* Password */}
              <div>

                <label className="text-sm text-gray-300">
                  Create Password
                </label>

                <input
                  type="password"
                  placeholder="Create a secure password"
                  className="mt-2 w-full bg-white/5 border border-white/10 text-white placeholder-gray-400 p-4 rounded-2xl outline-none focus:border-purple-400 transition"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

              </div>

              <div>
                <label className="text-sm text-gray-300">
                  Choose Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="mt-2 w-full bg-white/10 border border-white/10 text-white p-4 rounded-2xl outline-none focus:border-purple-400 focus:bg-white/10 hover:bg-white/15 transition"
                  style={{ color: "#ffffff" }}
                >
                  <option value="Student" style={{ color: "#000000" }}>Student</option>
                  <option value="Teacher" style={{ color: "#000000" }}>Teacher</option>
                  <option value="Both" style={{ color: "#000000" }}>Both</option>
                </select>
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-linear-to-r from-purple-500 to-blue-600 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-purple-500/20 font-semibold text-white"
              >

                {loading ? "Creating Account..." : "Create Account"}

              </button>

            </form>

            {/* Footer */}
            <p className="text-center text-gray-400 mt-8">

              Already have an account?{" "}

              <Link
                to="/login"
                className="text-purple-400 hover:text-purple-300 transition"
              >
                Login
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;