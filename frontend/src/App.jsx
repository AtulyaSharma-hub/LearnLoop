import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AskDoubt from "./pages/AskDoubt";
import DoubtFeed from "./pages/DoubtFeed";
import ResolvedDoubts
from "./pages/ResolvedDoubts";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/ask"
          element={<AskDoubt />}
        />
        <Route
    path="/resolved"
    element={<ResolvedDoubts />}/>
    
        <Route
          path="/feed"
          element={<DoubtFeed />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;