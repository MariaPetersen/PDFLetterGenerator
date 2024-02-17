import { ReactNode, createContext, useEffect, useState, useMemo } from "react";
import Api from "./../../services/Api";

type AuthProviderProps = {
  children?: ReactNode;
};

type IAuthContext = {
  authenticated: boolean;
  setAuthenticated: (newState: boolean) => void;
};

const AuthContext = createContext<IAuthContext>({
  authenticated: false,
  setAuthenticated: () => {},
});

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authenticated, setAuthenticated] = useState(false);
  const api = useMemo(() => new Api(), []);

  useEffect(() => {
    api
      .isAuthenticated()
      .then((response) => response.json())
      .then((data) => {
        if (!data.userId) {
          setAuthenticated(false);
        } else {
          setAuthenticated(true);
        }
      })
      .catch(() => setAuthenticated(false));
  }, [api]);

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
