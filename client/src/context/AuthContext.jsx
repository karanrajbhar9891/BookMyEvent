import React from "react";
import api from "../utils/axios.js";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  );
  const [loading, setLoading] = React.useState(true);

  // Check user from localStorage when app starts
  React.useEffect(() => {
    const checklogin = async () => {
      try {
        const response = await api.get("/auth");

        console.log("Stored user from localStorage:", response);
        if (response.data && response.data.user) {
          setUser(response.data.user);
        }else if(response.message === "Not authorized, no token") {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }

      } catch (error) {
        console.error(
          "Error checking login status:",
          error.response?.data || error.message,
        );
      }
    };
    checklogin();

    setLoading(false);
  }, []);

  // ================= LOGIN =================
  const login = async (email, password) => {
    try {
      const { data } = await api.post("/auth/login", {
        email,
        password,
      });

      setUser(data);

      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", data.token);

      return data;
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);

      throw error;
    }
  };

  // ================= REGISTER =================
  const register = async (name, email, password) => {
    try {
      const { data } = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      return data;
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data || error.message,
      );

      throw error;
    }
  };

  // ================= VERIFY OTP =================
  const verifyOtp = async (email, otp) => {
    try {
      const { data } = await api.post("/auth/verify-otp", {
        email,
        otp,
      });

      setUser(data);

      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", data.token);

      return data;
    } catch (error) {
      console.error(
        "OTP verification failed:",
        error.response?.data || error.message,
      );

      throw error;
    }
  };

  // ================= LOGOUT =================
  const logout = () => {
    setUser(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        verifyOtp,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
