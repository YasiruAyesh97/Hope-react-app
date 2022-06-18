import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import {getJwt} from "../service/web/userService";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    axios.defaults.headers.common['x-auth-token']=auth.accessToken;
    console.log("auth.accessToken : "+auth.accessToken)
    return (
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/auth" state={{ from: location }} replace />
    );
}

export default RequireAuth;