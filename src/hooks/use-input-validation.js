import { useReducer } from 'react';

const initialInputState = {
  value: '',
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === 'BLUR') {
    return { isTouched: true, value: state.value };
  }
  if (action.type === 'RESET') {
    return initialInputState;
  }
  return initialInputState;
};

const useInputValidation = validateInput => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const isValid = validateInput(inputState.value);
  const inputHasError = !isValid && inputState.isTouched;

  const inputChangeHandler = event => {
    dispatch({ type: 'INPUT', value: event.target.value });
  };

  const inputBlurHandler = event => {
    dispatch({ type: 'BLUR' });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  return {
    inputValue: inputState.value,
    isValid: isValid,
    inputHasError,
    inputChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInputValidation;
