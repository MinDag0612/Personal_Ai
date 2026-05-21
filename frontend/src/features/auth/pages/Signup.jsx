import { useState } from "react";
import Notification from "../../../shared/components/Notification";
import SignupForm from "../components/SignupForm";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [notification, setNotification] = useState(null);
  const Toast = notification ? Notification[notification.kind] : null;
  const navigate = useNavigate();

  function GoogleSuccess(tokenResponse) {
    alert("Google login successful! Token response: " + JSON.stringify(tokenResponse));
  }

  function GoogleError() {
    alert("Google login failed!");
  }

  async function handleSignup(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const email = formData.get("email");
    const displayName = formData.get("displayName");

    if (!email || !displayName || !password || !confirmPassword) {
      setNotification({
        kind: "Error",
        title: "Không thể đăng kí",
        message: "Vui lòng điền đầy đủ thông tin.",
      });
      return;
    }

    if (password.length < 8) {
      setNotification({
        kind: "Error",
        title: "Không thể đăng kí",
        message: "Mật khẩu phải có ít nhất 8 ký tự.",
      });
      return;
    }

    if (password !== confirmPassword) {
      setNotification({
        kind: "Error",
        title: "Không thể đăng kí",
        message: "Mật khẩu và xác nhận mật khẩu không khớp.",
      });
      return;
    }

    // Verify success case - Handle API response
    const responseData = await fetch("/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "email": email,
        "name": displayName,
        "password": password
      }),
    });

    if (responseData.ok) {
      setNotification({
        kind: "Success",
        title: "Đăng kí thành công",
        message: "Tài khoản của bạn đã được tạo thành công. Đang chuyển hướng đến Home...",
      });

      setTimeout(() => {
        navigate("/home");
      }, 1200);

    } else {
      const responseText = await responseData.json();

      setNotification({
        kind: "Error",
        title: "Không thể đăng kí",
        message: responseText.message || "Đã xảy ra lỗi khi đăng kí tài khoản.",
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
          <div className="signup-panel">
            <SignupForm
              onSubmit={handleSignup}
              onGoogleSuccess={GoogleSuccess}
              onGoogleError={GoogleError}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Signup;
