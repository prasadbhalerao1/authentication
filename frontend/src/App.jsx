import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Toaster } from "@/components/ui/sonner";
import VerifyOtp from "./pages/VerifyOtp";
import { AppData } from "./context/AppContext";
import Loading from "./Loading";
import Register from "./pages/Register";
import Verify from "./pages/Verify";
import Dashboard from "./pages/Dashboard";
import { ModeToggle } from "./components/mode-toggle";

const App = () => {
  const { isAuth, loading } = AppData();
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          <div className="fixed top-4 right-4 z-50">
            <ModeToggle />
          </div>
          <Routes>
            <Route path="/" element={isAuth ? <Home /> : <Login />} />
            <Route path="/login" element={isAuth ? <Home /> : <Login />} />
            <Route
              path="/register"
              element={isAuth ? <Home /> : <Register />}
            />
            <Route
              path="/verifyotp"
              element={isAuth ? <Home /> : <VerifyOtp />}
            />
            <Route
              path="/token/:token"
              element={isAuth ? <Home /> : <Verify />}
            />
            <Route
              path="/dashboard"
              element={isAuth ? <Dashboard /> : <Login />}
            />
          </Routes>
          <Toaster />
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
