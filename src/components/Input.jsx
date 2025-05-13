export const Input = ({
    field,
    label,
    value,
    onChangeHandler,
    type,
    showErrorMessage,
    validationMessage,
    onBlurHandler,
    textArea
}) => {
    const handleValueChange = (event) => {
        onChangeHandler(event.target.value, field);
    }

    const handleInputBlur = (event) => {
        onBlurHandler(event.target.value, field)
    }

    return (
        <div className={`auth-form-field ${showErrorMessage ? 'error' : ''}`}>
            <div className="auth-form-label">
                <span>{label}</span>
            </div>
            <div>
                {textArea ? (
                    <textarea
                        type={type}
                        value={value}
                        onChange={handleValueChange}
                        onBlur={handleInputBlur}
                        rows={5}
                        style={{ maxWidth: '400px' }}
                    />
                ) : (
                    <input
                        type={type}
                        value={value}
                        onChange={handleValueChange}
                        onBlur={handleInputBlur}
                        style={{ maxWidth: '400px' }}
                    />
                )}
                {showErrorMessage && (
                    <span className="auth-form-validation-message">
                        {validationMessage}
                    </span>
                )}
            </div>
        </div>
    );
}