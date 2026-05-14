import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleRegister = async (e) => {

  e.preventDefault();

  if (!name || !email || !password) {

    alert("Please fill all fields");
    return;
  }

  try {

    await axios.post(
      "http://localhost:5000/api/auth/register",
      {
        name,
        email,
        password
      }
    );

    alert("Registration Successful!");

    navigate("/login");

  } catch (error) {

    alert(
      error.response?.data?.message ||
      "Registration Failed"
    );
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50">

      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">

        <h1 className="text-4xl font-bold text-center text-purple-800">
          Join LearnLoop
        </h1>

        <p className="text-center text-gray-500 mt-3">
          Become part of the collaborative learning ecosystem
        </p>

       <form onSubmit={handleRegister} className="mt-8 space-y-5">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-400"
            value={name}
onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Institution Email"
            className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-400"
            value={email}
onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Create Password"
            className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-400"
            value={password}
onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="w-full bg-purple-700 text-white py-3 rounded-xl hover:bg-purple-800 transition"
          >
            Create Account
          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;