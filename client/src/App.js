import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// pages & components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProductPage from "./pages/ProductPage";
import MenPage from "./pages/MenPage";
import MenTshirtsPage from "./pages/MenTshirtsPage";
import MenHoodiesPage from "./pages/MenHoodiesPage";
import MenJacketsPage from "./pages/MenJacketsPage";
import MenPantsPage from "./pages/MenPantsPage";
import MenShoesPage from "./pages/MenShoesPage";
import WomenPage from "./pages/WomenPage";
import WomenTshirtsPage from "./pages/WomenTshirtsPage";
import WomenHoodiesPage from "./pages/WomenHoodiesPage";
import WomenJacketsPage from "./pages/WomenJacketsPage";
import WomenPantsPage from "./pages/WomenPantsPage";
import WomenShoesPage from "./pages/WomenShoesPage";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/dashboard"
              element={user ? <Dashboard /> : <Navigate to="/" />}
            />
            <Route path="/:id" element={<ProductPage />} />
            <Route path="/men" element={<MenPage />} />
            <Route path="/men/tshirts" element={<MenTshirtsPage />} />
            <Route path="/men/hoodies" element={<MenHoodiesPage />} />
            <Route path="/men/jackets" element={<MenJacketsPage />} />
            <Route path="/men/pants" element={<MenPantsPage />} />
            <Route path="/men/shoes" element={<MenShoesPage />} />
            <Route path="/women" element={<WomenPage />} />
            <Route path="/women/tshirts" element={<WomenTshirtsPage />} />
            <Route path="/women/hoodies" element={<WomenHoodiesPage />} />
            <Route path="/women/jackets" element={<WomenJacketsPage />} />
            <Route path="/women/pants" element={<WomenPantsPage />} />
            <Route path="/women/shoes" element={<WomenShoesPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
