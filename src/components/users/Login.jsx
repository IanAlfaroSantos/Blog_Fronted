import { useState } from "react";
import { Input } from '../Input';
import {
    validateUsernameOrEmail,
    validatePassword
} from '../../shared/validators';
import { useLogin } from "../../shared/hooks";
import videoLogin from "../../assets/vid/FondoLogin.mp4";
import { Link } from "react-router-dom";
import { FaUserTie } from 'react-icons/fa';
import "../../index.css";

export const Login = ({ switchAuthHandler }) => {

    const { login, isLoading } = useLogin();

    const [formState, setFormState] = useState({
        usernameOrEmail: {
            value: '',
            isValid: false,
            showError: false,
            validationMessage: ''
        },
        password: {
            value: '',
            isValid: false,
            showError: false,
            validationMessage: ''
        }
    });

    const handleInputValueChange = (value, field) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                value
            }
        }))
    }

    const handleInputValidationOnBlur = (value, field) => {
        let result = { isValid: false, message: '' };
        switch (field) {
            case 'usernameOrEmail':
                result = validateUsernameOrEmail(value);
                break;
            case 'password':
                result = validatePassword(value);
                break;
            default:
                break;
        }

        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                isValid: result.isValid,
                showError: !result.isValid,
                validationMessage: result.message
            }
        }));
    }

    const handleLogin = (event) => {
        event.preventDefault();
        login(formState.usernameOrEmail.value, formState.password.value);
    }

    const isSubmitButtonDisable = isLoading ||
        !formState.usernameOrEmail.isValid ||
        !formState.password.isValid;

    return (
        <div className="login-container">
            <div className="video-background">
                <video autoPlay loop muted playsInline>
                    <source src={videoLogin} type="video/mp4" />
                </video>
            </div>
            <img src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png" className="user-image" alt="User Icon" />
            <form className="auth-form">
                <h2>Login</h2>
                <br />
                <Input
                    field='usernameOrEmail'
                    label='Email or Username'
                    value={formState.usernameOrEmail.value}
                    onChangeHandler={handleInputValueChange}
                    type='text'
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState.usernameOrEmail.showError}
                    validationMessage={formState.usernameOrEmail.validationMessage}
                    icon={FaUserTie}
                />
                <br />
                <Input
                    field='password'
                    label='Password'
                    placeholder='Click el candado para mostrar'
                    value={formState.password.value}
                    onChangeHandler={handleInputValueChange}
                    type='password'
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState.password.showError}
                    validationMessage={formState.password.validationMessage}
                />
                <br />
                <button onClick={handleLogin} disabled={isSubmitButtonDisable}>
                    Log in
                </button>
            </form>
            <span onClick={switchAuthHandler} className="auth-form-switch-label">
                Don't have an account? Sign up
            </span>
            <br />
            <Link to="/" className="auth-form-switch-label">
                Continue without account
            </Link>
        </div>
    )
}