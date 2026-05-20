import AppProviders from "./provider";
import AppRoutes from "./router";

function App() {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
}

export default App;