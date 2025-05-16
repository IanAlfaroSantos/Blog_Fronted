import { useState, useEffect } from "react";
import {
    validateName,
    validateSurname,
    validateUsername,
    validatePhone,
    validatePassword
} from "../../shared/validators";
import { useUserSettings } from "../../shared/hooks";
import { Input } from "../Input";
import { FaUserTie } from 'react-icons/fa';
import { FaPhoneVolume } from "react-icons/fa6";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import '../../index.css';

const inputs = [
    {
        field: 'name',
        label: 'Name',
        validationMessage: validateName,
        type: 'text'
    },
    {
        field: 'surname',
        label: 'Surname',
        validationMessage: validateSurname,
        type: 'text'
    },
    {
        field: 'username',
        label: 'Username',
        validationMessage: validateUsername,
        type: 'text'
    },
    {
        field: 'phone',
        label: 'Phone',
        validationMessage: validatePhone,
        type: 'text'
    },
    {
        field: 'currentPassword',
        label: 'Current Password',
        validationMessage: validatePassword,
        type: 'password'
    },
    {
        field: 'password',
        label: 'Password',
        validationMessage: validatePassword,
        type: 'password'
    }
]

export const UserSettings = () => {
    const { userSettings = {}, saveSettings, isFetching } = useUserSettings();
    const [formState, setFormState] = useState({
        name: {
            isValid: true,
            showError: false,
            value: ''
        },
        surname: {
            isValid: true,
            showError: false,
            value: ''
        },
        username: {
            isValid: true,
            showError: false,
            value: ''
        },
        phone: {
            isValid: true,
            showError: false,
            value: ''
        },
        currentPassword: {
            isValid: true,
            showError: false,
            value: ''
        },
        password: {
            isValid: true,
            showError: false,
            value: ''
        }
    });

    useEffect(() => {
        if (userSettings) {
            setFormState({
                name: {
                    isValid: validateName(userSettings.name).isValid,
                    showError: false,
                    value: userSettings.name
                },
                surname: {
                    isValid: validateSurname(userSettings.surname).isValid,
                    showError: false,
                    value: userSettings.surname
                },
                username: {
                    isValid: validateUsername(userSettings.username).isValid,
                    showError: false,
                    value: userSettings.username
                },
                phone: {
                    isValid: validatePhone(userSettings.phone).isValid,
                    showError: false,
                    value: userSettings.phone
                },
                currentPassword: {
                    isValid: validatePassword(userSettings.currentPassword || '').isValid,
                    showError: false,
                    value: ''
                },
                password: {
                    isValid: validatePassword(userSettings.password || '').isValid,
                    showError: false,
                    value: ''
                }
            });
        }
    }, [userSettings]);

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
        const validator = inputs.find(input => input.field === field)?.validationMessage;
        if (!validator) return;

        const result = validator(value);

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

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const updatedData = {
            name: formState.name.value,
            surname: formState.surname.value,
            username: formState.username.value,
            phone: formState.phone.value,
        };

        if (formState.password.value || formState.currentPassword.value) {
            updatedData.currentPassword = formState.currentPassword.value;
            updatedData.password = formState.password.value;
        }

        saveSettings(updatedData);
    }

    const isChangingPassword = formState.password.value || formState.currentPassword.value;
    const isSubmitButtonDisabled = !formState.name.isValid ||
        !formState.surname.isValid ||
        !formState.username.isValid ||
        !formState.phone.isValid ||
        (isChangingPassword && (!formState.currentPassword.isValid || !formState.password.isValid));

    return (
        <div className="register-container">
            <img src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png" className="user-image" alt="User Icon" />
            <form className="auth-form user-settings-form" autoComplete="on">
                <h2>Update Your Profile</h2>
                <h6 className="h6-container">Nota: si no quiere actualizar la contraseña, ingrese su contraseña actual y en la nueva ingrese la misma que la actual</h6>
                <br />
                <Input
                    field='name'
                    label='Name'
                    value={formState.name.value}
                    onChangeHandler={handleInputValueChange}
                    type='text'
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState.name.showError}
                    validationMessage={formState.name.validationMessage}
                    autoComplete="name"
                    icon={MdOutlineDriveFileRenameOutline}
                />
                <br />
                <Input
                    field='surname'
                    label='Surname'
                    value={formState.surname.value}
                    onChangeHandler={handleInputValueChange}
                    type='text'
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState.surname.showError}
                    validationMessage={formState.surname.validationMessage}
                    autoComplete="surname"
                    icon={MdOutlineDriveFileRenameOutline}
                />
                <br />
                <Input
                    field='username'
                    label='Username'
                    value={formState.username.value}
                    onChangeHandler={handleInputValueChange}
                    type='text'
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState.username.showError}
                    validationMessage={formState.username.validationMessage}
                    autoComplete="username"
                    icon={FaUserTie}
                />
                <br />
                <Input
                    field='phone'
                    label='Phone'
                    value={formState.phone.value}
                    onChangeHandler={handleInputValueChange}
                    type='tel'
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState.phone.showError}
                    validationMessage={formState.phone.validationMessage}
                    autoComplete="phone"
                    icon={FaPhoneVolume}
                />
                <br />
                <Input
                    field='currentPassword'
                    label='Current Password'
                    placeholder='Click el candado para mostrar'
                    value={formState.currentPassword.value}
                    onChangeHandler={handleInputValueChange}
                    type='password'
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState.currentPassword.showError}
                    validationMessage={formState.currentPassword.validationMessage}
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
                <button onClick={handleFormSubmit} disabled={isSubmitButtonDisabled}>
                    Update
                </button>
            </form>
        </div>
    )
}