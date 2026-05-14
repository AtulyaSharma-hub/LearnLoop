import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleRegister = (e) => {

  e.preventDefault();

  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }
  const newUser = {
  name,
  email,
  password,
  credits: 0,
  role: "student",
  sessionsCompleted: 0,
reputation: 5.0
};

const existingUsers =
  JSON.parse(localStorage.getItem("users")) || [];

existingUsers.push(newUser);

localStorage.setItem(
  "users",
  JSON.stringify(existingUsers)
);
  alert("Registration Successful!");

  navigate("/login");
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