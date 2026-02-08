export const validateStyle = (styleTheme: Record<string, string>, styles: Record<string, string>, style: string) => {
    // Convert the string to a StyleThemeProps key if valid, or default
    return styleTheme[style] || styles[style];
  };