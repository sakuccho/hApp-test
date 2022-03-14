import { createContext, useState, useContext, useEffect } from "react";
import { auth } from "../firebase";

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState("true");

  const value = {
    user,
    loading,
  };

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((userInfo) => {
      setUser(userInfo);
      setLoading(false);
    });
    return () => {
      unsubscribed();
    };
  }, []);

  if (loading) {
    return <p>loding...</p>;
  } else {
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  }
}
