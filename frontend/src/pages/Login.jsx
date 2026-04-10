import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const normalizedBackendUrl = (backendUrl || "").replace(/\/+$/, "");
  const apiBaseUrl = normalizedBackendUrl.endsWith("/api")
    ? normalizedBackendUrl
    : `${normalizedBackendUrl}/api`;

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!backendUrl) {
      toast.error("Backend URL is not configured");
      return;
    }

    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(`${apiBaseUrl}/user/register`, {
          name,
          password,
          email,
        });

        if (response.data?.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data?.message || "Sign up failed");
        }
      } else {
        const response = await axios.post(`${apiBaseUrl}/user/login`, {
          email,
          password,
        });

        if (response.data?.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          const message = response.data?.message;
          if (message?.toLowerCase() === "user not found") {
            toast.error("User not found");
          } else {
            toast.error(message || "Login failed");
          }
        }
      }
    } catch (error) {
      if (error?.code === "ERR_NETWORK") {
        toast.error(
          `Cannot reach backend server (${normalizedBackendUrl || "not configured"}). Start backend and try again.`
        );
        return;
      }

      toast.error(
        error?.response?.data?.message || error?.message || "Something went wrong"
      );
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <form
      action="#"
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === "Login" ? null : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
        />
      )}

      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
      />

      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
      />

      <div className="w-full flex justify-between text-sm -mt-2">
        <p className="cursor-pointer">Forgot your password?</p>
        {currentState === "Login" ? (
          <p onClick={() => setCurrentState("Sign Up")} className="cursor-pointer">
            Create account
          </p>
        ) : (
          <p onClick={() => setCurrentState("Login")} className="cursor-pointer">
            Login here
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: "black",
          color: "white",
          paddingX: "31px",
          paddingY: "11px",
          fontSize: "13px",
          "&:hover": {
            backgroundColor: "#333",
          },
        }}
      >
        {currentState === "Login" ? "Login" : "Sign Up"}
      </Button>
    </form>
  );
};

export default Login;
