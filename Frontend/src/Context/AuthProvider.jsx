import { useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/auth/profile", {
          withCredentials: true,
        });

        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    await axios.post(
      "http://localhost:5000/auth/logout",
      {},
      { withCredentials: true },
    );
    setUser(null);
  };

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
