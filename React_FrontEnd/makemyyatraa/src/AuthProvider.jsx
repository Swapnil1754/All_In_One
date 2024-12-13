import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export const AuthProvider = ({children}) => {
    const[isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem("isAuthenticated") === "true";
    })
    const login = () => {
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", true);
    }
    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("isAuthenticated");
    }
    return(
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>{children}</AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);