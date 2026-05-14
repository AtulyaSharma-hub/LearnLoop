import { BrowserRouter, Routes, Route } from "react-router-dom";
import AskDoubt from "./pages/AskDoubt";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DoubtFeed from "./pages/DoubtFeed";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
         <Route path="/ask" element={<AskDoubt />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/feed" element={<DoubtFeed />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;