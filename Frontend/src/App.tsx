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
import BookingPage from "./pages/BookingPage";
import Footer from "./components/common/Footer";

const App = () => {
  const { isLogin, handleLogout } = useContext(AppContext);

  return (
    <div>
      <ErrorBoundary>
        <Router>
          <Header />
          {isLogin ? (
            <>
              <Menu />
              {/* <button onClick={handleLogout}>Logout</button> */}
            </>
          ) : (
            <></>
          )}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
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
            <Route path="/about us" element={<About />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="*"
              element={
                <Typography
                  variant="h1"
                  sx={{ textAlign: "center", marginTop: "60px" }}
                >
                  Page Not Found
                </Typography>
              }
            />
          </Routes>
        </Router>
        <Footer />
      </ErrorBoundary>
    </div>
  );
};

export default App;
