import { BrowserRouter, Routes, Route } from "react-router-dom";

// import LoginPage from "../features/auth/pages/LoginPage";
// import ProfilePage from "../features/profile/pages/ProfilePage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/login" element={<LoginPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}