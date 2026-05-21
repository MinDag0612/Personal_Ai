import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../features/dashboard/pages/Dashboard";
import Signup from "../features/auth/pages/Signup";
import AuthLayout from "../features/auth/pages/AuthLayout";
import { Navigate } from "react-router-dom";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />,

        <Route path="/auth" element={<AuthLayout />}>

          <Route index element={<Navigate to="signup" replace />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
