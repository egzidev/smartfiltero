import { InputChangeHandler, InputFocusHandler, StyleValidator } from "@/types";

export interface SearchInputProps {
    inputRef: React.RefObject<HTMLInputElement>;
    query: string;
    handleInputFocus: InputFocusHandler;
    handleInputChange: InputChangeHandler;
    placeholder: string;
    styleTheme?: Record<string, string>;
  }