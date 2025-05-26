import { createContext, useContext, useEffect, useState } from "react";

const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const serverUrl = "http://localhost:3000";

  useEffect(() => {
    const checkUser = async () => {
      await fetchUser();
    };
    checkUser();
  }, []);
  

  const fetchUser = async () => {
    try {

      const token = localStorage.getItem("token");
      console.log(token);
      const response = await fetch(`${serverUrl}/api/auth/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log(data);
      setUser(data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await fetch(`${serverUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.token) {
        console.log(data);
        localStorage.setItem("token", data.token);
        fetchUser();
        return true;
      }
      return data.message;
    } catch (error) {
      console.error("Error logging in:", error);
      return error.message;
    }
  };

  const register = async (name, username, password) => {
    try {
      const response = await fetch(`${serverUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, username, password }),
      });

      const data = await response.json();

      if (data.token) {
        console.log(data);
        console.log(data.token);
        localStorage.setItem("token", data.token);
        fetchUser();
        return true;
      }
      return data.message;
    } catch (error) {
      console.error("Error registering:", error);
      return error.message;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    return true;
  };

  return (
    <UserAuthContext.Provider value={{ user, fetchUser, login, register, logout }}>
      {children}
    </UserAuthContext.Provider>
  );
};

const useUserAuth = () => useContext(UserAuthContext);

export default useUserAuth;
