import type { InputChangeHandler, InputFocusHandler } from "@/types";

export interface SearchInputProps {
    /**
     * Ref to the input element
     */
    inputRef: React.RefObject<HTMLInputElement>;
    /**
     * The value of the input element with which the user is searching
     */
    query: string;
    /**
     * Function to handle when the input is focused
     */
    handleInputFocus: InputFocusHandler;
    /**
     * Function to handle when the input value changes
     */
    handleInputChange: InputChangeHandler;
    /**
     * The placeholder text for the input element
     */
    placeholder: string;
    /**
     * The style theme for the input element. This is used to apply custom styles to the input element.
     */
    styleTheme?: Record<string, string>;
  }