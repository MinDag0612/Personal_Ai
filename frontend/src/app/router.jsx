import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../features/dashboard/pages/Dashboard";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
