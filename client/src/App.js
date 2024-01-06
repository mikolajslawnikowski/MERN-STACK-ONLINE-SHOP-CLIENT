import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// pages & components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            {/* <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} /> */}
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            {/* <Route path="/login" element={<Login />} /> */}
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            {/* <Route path="/signup" element={<Signup />} /> */}
            <Route
              path="/dashboard"
              element={user ? <Dashboard /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
