import { createContext, useState, ReactNode, useEffect } from "react";

interface AppContextProps {
  isLogin: boolean;
  handleLogin: (newToken: string) => void;
  handleLogout: () => void;
  isMenu: boolean;
  handleMenu: () => void;
}

const AppContext = createContext<AppContextProps>({
  isLogin: false,
  handleLogin: () => {},
  handleLogout: () => {},
  isMenu: false,
  handleMenu: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState<boolean>(() => {
    // Check for token in localStorage on initial load
    const storedToken = localStorage.getItem("token");
    return !!storedToken; // Return true if token exists, false otherwise
  });

  const [token, setToken] = useState<string | null>(() => {
    // Get token from localStorage on initial load
    return localStorage.getItem("token");
  });

  const [isMenu, setIsMenu] = useState(false);

  const handleLogin = (newToken: string) => {
    setIsLogin(true);
    setToken(newToken);
    localStorage.setItem("token", newToken); // Store token in localStorage
  };

  const handleLogout = () => {
    setIsLogin(false);
    setToken(null);
    localStorage.removeItem("token"); // Remove token from localStorage
  };

  const handleMenu = () => {
    setIsMenu(!isMenu);
  };

  // useEffect to update isLogin if token changes
  useEffect(() => {
    setIsLogin(!!token);
  }, [token]);

  return (
    <AppContext.Provider
      value={{ isLogin, handleLogin, handleLogout, isMenu, handleMenu }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
