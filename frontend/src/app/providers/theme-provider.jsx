import "../../shared/style/theme.css";

export default function ThemeProvider({ children }) {
  return (
    <div className="app-theme">
      {children}
    </div>
  );
}
