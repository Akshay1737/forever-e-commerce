import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import { ToastContainer } from 'react-toastify';
export const backendUrl=import.meta.env.VITE_BACKEND_URL;
export const currency='$';

const App = () => {
  const [token, SetToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "");
    useEffect(() => {
      localStorage.setItem("token", token);
    },[token])
  return (
   <div className="bg-gray-50 min-h-screen">
  <ToastContainer />

  {token === "" ? (
    <Login setToken={SetToken} />
  ) : (
    <>
      <Navbar setToken={SetToken} />
      <hr className="border border-gray-300" />

      <div className="flex">
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
          <Routes>
            <Route path="/add" element={<Add token={token} />} />
            <Route path="/list" element={<List token={token} />} />
            <Route path="/orders" element={<Orders token={token} />} />
          </Routes>
        </div>
      </div>
    </>
  )}
</div>
  );
};

export default App;
