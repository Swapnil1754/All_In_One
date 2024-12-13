import { useAuth } from "./AuthProvider"
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const {isAuthenticated} = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" replace />
}
export default ProtectedRoute;