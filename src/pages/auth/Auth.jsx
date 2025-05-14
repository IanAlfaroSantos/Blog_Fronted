import { useState } from "react";
import { Login } from "../../components/users/Login";
import { Register } from "../../components/users/Register";
import "./authPage.css"

export const Auth = () => {

    const [isLogin, setIsLogin] = useState(true);

    const handleAuthPageToggle = () => {
        setIsLogin((prev) => !prev);
    }

    return (
        <div className="auth-container">
            {isLogin ? (
                <Login switchAuthHandler={handleAuthPageToggle} />
            ) : (
                <Register switchAuthHandler={handleAuthPageToggle} />
            )}
        </div>
    )
}