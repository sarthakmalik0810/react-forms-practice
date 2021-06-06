import { useState } from 'react';

const useInputValidation = validateInput => {
  const [inputValue, setInputValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validateInput(inputValue);
  const inputHasError = !isValid && isTouched;

  const inputChangeHandler = event => {
    setInputValue(event.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setInputValue('');
    setIsTouched(false);
  };

  return {
    inputValue,
    isValid,
    inputHasError,
    inputChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInputValidation;
