export type InputFocusHandler = (event: React.FocusEvent<HTMLInputElement>) => void;
export type InputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => void;
export type StyleValidator = (className: string) => string;

export interface InputCmp {
    inputRef: React.RefObject<HTMLInputElement>;
    query: string;
    handleInputFocus: InputFocusHandler;
    handleInputChange: InputChangeHandler;
    validateStyle: StyleValidator;
    placeholder: string;
  }