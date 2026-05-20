import ThemeProvider from "./providers/theme-provider";

function AppProviders({ children }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}

export default AppProviders;