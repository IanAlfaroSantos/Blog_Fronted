import { useState } from "react";
import {
    validateName,
    validateSurname,
    validateUsername,
    validatePhone,
    validatePassword
} from "../../shared/validators";
import { Input } from "../Input";

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

export const UserSettings = ({ settings, saveSettings }) => {
    const [formState, setFormState] = useState({
        name: {
            isValid: validateName(settings.name).isValid,
            showError: false,
            value: settings.name
        },
        surname: {
            isValid: validateSurname(settings.surname).isValid,
            showError: false,
            value: settings.surname
        },
        username: {
            isValid: validateUsername(settings.username).isValid,
            showError: false,
            value: settings.username
        },
        phone: {
            isValid: validatePhone(settings.phone).isValid,
            showError: false,
            value: settings.phone
        },
        currentPassword: {
            isValid: validatePassword(settings.currentPassword || '').isValid,
            showError: false,
            value: settings.currentPassword || ''
        },
        password: {
            isValid: validatePassword(settings.password || '').isValid,
            showError: false,
            value: settings.password || ''
        },
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
            case 'name':
                result = validateName(value);
                break;
            case 'surname':
                result = validateSurname(value);
                break;
            case 'username':
                result = validateUsername(value);
                break;
            case 'phone':
                result = validatePhone(value);
                break;
            case 'currentPassword':
                result = validatePassword(value);
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

    const handleFormSubmit = (event) => {
        event.preventDefault();
        saveSettings({
            name: formState.name.value,
            surname: formState.surname.value,
            username: formState.username.value,
            phone: formState.phone.value,
            currentPassword: formState.currentPassword.value,
            password: formState.password.value
        });
    }

    const isSubmitButtonDisabled = !formState.name.isValid ||
        !formState.surname.isValid ||
        !formState.username.isValid ||
        !formState.phone.isValid ||
        !formState.currentPassword.isValid ||
        !formState.password.isValid;

    return (
        <form className="settings-form" onSubmit={handleFormSubmit}>
            {inputs.map((input) => (
                <Input
                    key={input.field}
                    field={input.field}
                    label={input.label}
                    value={formState[input.field].value}
                    onChangeHandler={handleInputValueChange}
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState[input.field].showError}
                    validationMessage={formState[input.field].validationMessage}
                    type={input.type}
                />
            ))}
            <button type="submit" disabled={isSubmitButtonDisabled}>
                Update
            </button>
        </form>
    )
}