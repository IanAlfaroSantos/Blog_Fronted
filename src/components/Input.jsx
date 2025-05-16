import { useState } from 'react';
import { FaLock, FaLockOpen } from 'react-icons/fa';

export const Input = ({
    field,
    label,
    value,
    onChangeHandler,
    type,
    showErrorMessage,
    validationMessage,
    onBlurHandler,
    textArea,
    autoComplete,
    icon: Icon,
    placeholder
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleValueChange = (event) => {
        onChangeHandler(event.target.value, field);
    }

    const handleInputBlur = (event) => {
        onBlurHandler(event.target.value, field);
    }

    const handleTogglePassword = () => {
        setShowPassword(prev => !prev);
    }

    const isPasswordType = type === 'password';

    return (
        <div className={`auth-form-field ${showErrorMessage ? 'error' : ''}`}>
            <div className="auth-form-label">
                <span>{label}</span>
            </div>
            <div>
                {textArea ? (
                    <textarea
                        id={field}
                        name={field}
                        type={type}
                        value={value}
                        onChange={handleValueChange}
                        onBlur={handleInputBlur}
                        rows={5}
                        style={{ maxWidth: '400px' }}
                        autoComplete={autoComplete}
                        placeholder={placeholder}
                    />
                ) : (
                    <div className="input-with-icon">
                        <input
                            id={field}
                            name={field}
                            type={isPasswordType && showPassword ? 'text' : type}
                            value={value}
                            onChange={handleValueChange}
                            onBlur={handleInputBlur}
                            style={{ maxWidth: '400px' }}
                            autoComplete={autoComplete}
                            placeholder={placeholder}
                        />
                        {isPasswordType ? (
                            <span className="input-icon toggle-icon" onClick={handleTogglePassword}>
                                {showPassword ? <FaLockOpen /> : <FaLock />}
                            </span>
                        ) : (
                            Icon && <span className="input-icon"><Icon /></span>
                        )}
                    </div>
                )}
                {showErrorMessage && (
                    <span className="auth-form-validation-message">
                        {validationMessage}
                    </span>
                )}
            </div>
        </div>
    )
}