import React, { useMemo } from "react";
import type { SearchInputProps } from "./SearchInput.types";
import styles from "./SearchInput.module.css";
import { validateStyle } from "@/utils";

const SearchInput: React.FC<SearchInputProps> = ({
  inputRef,
  query,
  handleInputFocus,
  handleInputChange,
  placeholder = "Search...",
  styleTheme = {},
}) => {
  // Memoize style validation to avoid recalculation on every render
  const wrapperClassName = useMemo(
    () => validateStyle(styleTheme, styles, 'searchInputWrapper'),
    [styleTheme]
  );

  // Memoize input class name to avoid recalculation on every render
  const inputClassName = useMemo(
    () => validateStyle(styleTheme, styles, 'searchInput'),
    [styleTheme]
  );

  return (
    <div className={wrapperClassName}>
      <input
        ref={inputRef}
        type="text"
        value={query}
        onFocus={handleInputFocus}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={inputClassName}
        aria-label={placeholder}
      />
    </div>
  );
};

// Display name for debugging
SearchInput.displayName = 'SearchInput';

export default SearchInput;