import useInputValidation from '../hooks/use-input-validation';

const BasicForm = props => {
  const {
    inputBlurHandler: firstNameBlurHandler,
    inputChangeHandler: firstNameChangedHandler,
    inputHasError: firstNameHasError,
    inputValue: firstNameInputValue,
    isValid: firstNameIsValid,
    reset: resetFirstName,
  } = useInputValidation(value => value.trim() !== '');

  const {
    inputBlurHandler: lastNameBlurHandler,
    inputChangeHandler: lastNameChangedHandler,
    inputHasError: lastNameHasError,
    inputValue: lastNameInputValue,
    isValid: lastNameIsValid,
    reset: resetLastName,
  } = useInputValidation(value => value.trim() !== '');

  const {
    inputBlurHandler: emailInputBlurHandler,
    inputChangeHandler: emailChangedHandler,
    inputHasError: emailHasError,
    inputValue: emailInputValue,
    isValid: emailIsValid,
    reset: resetEmail,
  } = useInputValidation(value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));

  let formIsValid = false;

  if (firstNameIsValid && lastNameIsValid && emailIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = event => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }
    resetEmail();
    resetFirstName();
    resetLastName();
  };

  const firstNameInputClasses = firstNameHasError
    ? 'form-control invalid'
    : 'form-control';

  const lastNameInputClasses = lastNameHasError
    ? 'form-control invalid'
    : 'form-control';

  const emailInputClasses = emailHasError
    ? 'form-control invalid'
    : 'form-control';

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="control-group">
        <div className={firstNameInputClasses}>
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            onChange={firstNameChangedHandler}
            onBlur={firstNameBlurHandler}
            value={firstNameInputValue}
          />
          {firstNameHasError && (
            <p className="error-text">First Name must not be empty</p>
          )}
        </div>
        <div className={lastNameInputClasses}>
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            onChange={lastNameChangedHandler}
            onBlur={lastNameBlurHandler}
            value={lastNameInputValue}
          />
          {lastNameHasError && (
            <p className="error-text">Last Name must not be empty</p>
          )}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="email"
          id="email"
          onChange={emailChangedHandler}
          onBlur={emailInputBlurHandler}
          value={emailInputValue}
        />
        {emailHasError && <p className="error-text">Email must be valid</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
