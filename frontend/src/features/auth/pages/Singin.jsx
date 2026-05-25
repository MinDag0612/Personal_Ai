import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../../../shared/components/Notification";
import SigninForm from "../components/SigninForm";
import "./Signup.css";

export default function Signin() {
  const [notification, setNotification] = useState(null);
  const Toast = notification ? Notification[notification.kind] : null;
  const navigate = useNavigate();

  async function handleGoogleSuccess(tokenResponse) {
    const token = tokenResponse["access_token"];

    try {
      const response = await fetch("/api/users/signin-gg/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_token: token,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        setNotification({
          kind: "Success",
          title: "Đăng nhập thành công",
          message: responseData.message || "Đang chuyển hướng đến trang Home...",
        });

        setTimeout(() => {
          navigate("/home", { replace: true });
        }, 1200);
        return;
      }

      setNotification({
        kind: "Error",
        title: "Đăng nhập thất bại",
        message: responseData.message || "Đã xảy ra lỗi khi đăng nhập bằng Google.",
      });
    } catch (error) {
      setNotification({
        kind: "Error",
        title: "Đăng nhập thất bại",
        message: "Không thể kết nối đến máy chủ. Vui lòng thử lại sau.",
      });
    }
  }

  function handleGoogleError() {
    setNotification({
      kind: "Error",
      title: "Đăng nhập thất bại",
      message: "Đã xảy ra lỗi khi đăng nhập bằng Google.",
    });
  }

  async function handleSignin(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")?.trim();
    const password = formData.get("password")?.trim();

    if (!email || !password) {
      setNotification({
        kind: "Error",
        title: "Không thể đăng nhập",
        message: "Vui lòng nhập email và mật khẩu.",
      });
      return;
    }

    try {
      const response = await fetch("/api/users/signin/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        setNotification({
          kind: "Success",
          title: "Đăng nhập thành công",
          message: responseData.message || "Đang chuyển hướng đến trang Home...",
        });

        setTimeout(() => {
          navigate("/home", { replace: true });
        }, 1200);
        return;
      }

      setNotification({
        kind: "Error",
        title: "Đăng nhập thất bại",
        message: responseData.message || "Email hoặc mật khẩu không đúng.",
      });
    } catch (error) {
      setNotification({
        kind: "Error",
        title: "Đăng nhập thất bại",
        message: "Không thể kết nối đến máy chủ. Vui lòng thử lại sau.",
      });
    }
  }

  return (
    <div className="landing-shell">
      {Toast && (
        <Toast
          title={notification.title}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <main className="signup-page container-xl">
        <section className="signup-hero">
          <div className="signup-panel signin-panel">
            <SigninForm
              onSubmit={handleSignin}
              onGoogleSuccess={handleGoogleSuccess}
              onGoogleError={handleGoogleError}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
