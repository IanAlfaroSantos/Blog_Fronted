import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ element }) => {
  
    const user = localStorage.getItem("user");

    return user ? element : <Navigate to={'/auth'}/>
}

export default PrivateRoutes
