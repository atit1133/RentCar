import Login from "./pages/Login";
import Menu from "./pages/Menu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { useContext } from "react";
import AppContext from "./AppContext";
import Header from "./components/Header";
import ErrorBoundary from "./components/Boundary";
import Booking from "./pages/Booking";
import Cardetail from "./pages/Cardetail";
import Gallery from "./pages/Gallery";
import Services from "./pages/Services";
import About from "./pages/About";
import Customer from "./pages/Customer";
import Report from "./pages/Report";
import { Typography } from "@mui/material";
import "./index.css";

const App = () => {
  const { isLogin, handleLogin, handleLogout } = useContext(AppContext);

  return (
    <div>
      <ErrorBoundary>
        <Router>
          <Header />
          {isLogin ? (
            <>
              <Menu />
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              {/* <Login /> */}
              <Typography variant="h1" color="primary" align="center">
                Please Login
              </Typography>
              <button onClick={() => handleLogin("newToken")}>Login</button>
            </>
          )}
          <Routes>
            <Route path="/" element={isLogin ? <Home /> : <Login />} />
            <Route path="/home" element={isLogin ? <Home /> : <Login />} />
            <Route path="/rent" element={isLogin ? <Booking /> : <Login />} />
            <Route
              path="/details"
              element={isLogin ? <Cardetail /> : <Login />}
            />
            <Route
              path="/customer"
              element={isLogin ? <Customer /> : <Login />}
            />
            <Route path="/report" element={isLogin ? <Report /> : <Login />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </div>
  );
};

export default App;
