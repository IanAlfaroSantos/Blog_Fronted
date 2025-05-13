import { useState } from "react";
import { Input } from './Input';
import {
    validateUsernameOrEmail,
    validatePassword,
    validateUsernameOrEmailMessage,
    validatePasswordMessage
} from '../shared/validators';
import { useLogin } from "../shared/hooks";
import { FaUserTie } from "react-icons/fa";
import "../index.css";

export const Login = ({ switchAuthHandler }) => {

    const { login, isLoading } = useLogin();

    const [formState, setFormState] = useState({
        usernameOrEmail: {
            value: '',
            isValid: false,
            showError: false
        },
        password: {
            value: '',
            isValid: false,
            showError: false
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
        let isValid = false;
        switch (field) {
            case 'usernameOrEmail':
                isValid = validateUsernameOrEmail(value);
                break;
            case 'password':
                isValid = validatePassword(value);
                break;
            default:
                break;
        }

        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                isValid,
                showError: !isValid
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
            <FaUserTie text={'User Register'}/>
            <form className="auth-form">
                <Input
                    field='usernameOrEmail'
                    label='Email or Username'
                    value={formState.usernameOrEmail.value}
                    onChangeHandler={handleInputValueChange}
                    type='text'
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState.usernameOrEmail.showError}
                    validationMessage={validateUsernameOrEmailMessage}
                />
                <Input
                    field='password'
                    label='Password'
                    value={formState.password.value}
                    onChangeHandler={handleInputValueChange}
                    type='password'
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState.password.showError}
                    validationMessage={validatePasswordMessage}
                />
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