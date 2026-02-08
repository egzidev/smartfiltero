import React from "react";
import type {SearchInputProps} from "@/components/SearchInput/SearchInput.types";
import searchInputStyles from "@/components/SearchInput/search-input.module.css";
import { validateStyle } from "@/utils";

const SearchInput: React.FC<SearchInputProps> = ({
  inputRef,
  query,
  handleInputFocus,
  handleInputChange,
  placeholder,
  styleTheme = {}
}) => (
  <div className={validateStyle(styleTheme, searchInputStyles, 'searchInputWrapper')}>
    <input
      ref={inputRef}
      type="text"
      value={query}
      onFocus={handleInputFocus}
      onChange={handleInputChange}
      placeholder={placeholder}
      className={validateStyle(styleTheme, searchInputStyles, 'searchInput')}
    />
  </div>
)

export default SearchInput;