import { theme } from "@chakra-ui/pro-theme";
import { extendTheme } from "@chakra-ui/react";
import "@fontsource-variable/open-sans";
import "@fontsource-variable/raleway";
import "@fontsource/meddon";

export function createTheme() {
  const proTheme = extendTheme(theme);

  const extension = {
    colors: { ...proTheme.colors, brand: proTheme.colors.blue },
    fonts: {
      heading: `'Open Sans', sans-serif`,
      body: `'Raleway', sans-serif`,
    },
  };

  return extendTheme(extension, proTheme);
}
