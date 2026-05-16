import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {

    e.preventDefault();

    setLoading(true);

    if (!email || !password) {

      alert("Please fill all fields");
      setLoading(false);
      return;
    }

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      const userData = {

        ...response.data.user,

        credits:
          response.data.user.credits || 0,

        sessionsCompleted:
          response.data.user.sessionsCompleted || 0,

        reputation: parseFloat(
          (response.data.user.reputation || 5).toFixed
            ? (response.data.user.reputation || 5).toFixed(1)
            : Number(response.data.user.reputation || 5).toFixed(1)
        )
      };

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(userData)
      );

      alert("Login Successful!");

      navigate("/dashboard");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-[#0B1020] flex items-center justify-center overflow-hidden relative px-6">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 blur-3xl rounded-full"></div>

      {/* Main Container */}
      <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center max-w-6xl w-full">

        {/* Left Side Content */}
        <div className="hidden lg:block">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-sm text-blue-200 mb-8">
            Welcome Back to LearnLoop
          </div>

          <h1 className="text-6xl font-black leading-tight text-white">

            Continue Your
            <br />

            <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Learning Journey
            </span>

          </h1>

          <p className="mt-8 text-xl text-gray-300 leading-relaxed max-w-xl">
            Connect with mentors, collaborate with peers,
            earn knowledge credits, and power your academic
            growth through AI-enhanced learning.
          </p>

          {/* Floating Cards */}
          <div className="mt-12 space-y-5">

            <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-5 max-w-md">
              <p className="text-blue-200 text-sm">
                🔥 1200+ collaborative learning sessions completed this week
              </p>
            </div>

            <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-5 max-w-sm ml-10">
              <p className="text-purple-200 text-sm">
                🤖 AI mentors helping students learn smarter
              </p>
            </div>

          </div>

        </div>

        {/* Login Card */}
        <div className="relative">

          <div className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 w-full">

            <div className="text-center">

              <h2 className="text-4xl font-bold text-white">
                Login
              </h2>

              <p className="text-gray-300 mt-4">
                Access your collaborative learning dashboard
              </p>

            </div>

            <form
              onSubmit={handleLogin}
              className="mt-10 space-y-6"
            >

              {/* Email */}
              <div>

                <label className="text-sm text-gray-300">
                  Email Address
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
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Enter your password"
                  className="mt-2 w-full bg-white/5 border border-white/10 text-white placeholder-gray-400 p-4 rounded-2xl outline-none focus:border-purple-400 transition"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-linear-to-r from-blue-500 to-purple-600 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-blue-500/20 font-semibold text-white"
              >

                {loading ? "Logging In..." : "Login"}

              </button>

            </form>

            {/* Footer */}
            <p className="text-center text-gray-400 mt-8">

              Don’t have an account?{" "}

              <Link
                to="/register"
                className="text-blue-400 hover:text-blue-300 transition"
              >
                Create Account
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;