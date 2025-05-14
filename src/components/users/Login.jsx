import { useState } from "react";
import { Input } from '../Input';
import {
    validateUsernameOrEmail,
    validatePassword
} from '../../shared/validators';
import { useLogin } from "../../shared/hooks";
import { FaUserTie } from "react-icons/fa";
import videoLogin from "../../assets/vid/FondoLogin.mp4";
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
            <form className="auth-form">
                <img src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png" className="user-image" alt="User Icon" />
                <Input
                    field='usernameOrEmail'
                    label='Email or Username'
                    value={formState.usernameOrEmail.value}
                    onChangeHandler={handleInputValueChange}
                    type='text'
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState.usernameOrEmail.showError}
                    validationMessage={formState.usernameOrEmail.validationMessage}
                />
                <br />
                <Input
                    field='password'
                    label='Password'
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
        </div>
    )
}