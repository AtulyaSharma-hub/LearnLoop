import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleLogin = (e) => {

    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }
    const users =
  JSON.parse(localStorage.getItem("users")) || [];

const matchedUser = users.find(
  (user) =>
    user.email === email &&
    user.password === password
);

if (!matchedUser) {
  alert("Invalid Credentials");
  return;
}
    alert("Login Successful!");
    localStorage.setItem(
  "loggedInUser",
  JSON.stringify(matchedUser)
);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">

      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">

        <h1 className="text-4xl font-bold text-center text-blue-800">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mt-3">
          Login to continue your learning journey
        </p>

      <form onSubmit={handleLogin} className="mt-8 space-y-5">

          <input
            type="email"
            placeholder="Enter Email"
            className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
onChange={(e) => setEmail(e.target.value)}
         />

          <input
            type="password"
            placeholder="Enter Password"
            className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="w-full bg-blue-700 text-white py-3 rounded-xl hover:bg-blue-800 transition"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;