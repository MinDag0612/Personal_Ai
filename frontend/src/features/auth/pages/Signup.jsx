import { useState } from "react";
import Notification from "../../../shared/components/Notification";
import SignupForm from "../components/SignupForm";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [notification, setNotification] = useState(null);
  const [otpEnabled, setOtpEnabled] = useState(false);
  const Toast = notification ? Notification[notification.kind] : null;
  const navigate = useNavigate();

  async function GoogleSuccess(tokenResponse) {
    const token = tokenResponse["access_token"];
    const response = await fetch("/api/users/register-gg/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        "access_token": token
      }),
    });

    console.log(response);
    
    if (response.ok) {
      const responseData = await response.json();
      setNotification({
        kind: "Success",
        title: "Đăng kí thành công",
        message: responseData.message,
      });

      setTimeout(() => {
        navigate("/home", { replace: true });
      }, 1200);
    }
    else {
      const responseData = await response.json();
      setNotification({
        kind: "Error",
        title: "Đăng kí thất bại",
        message: responseData.message || "Đã xảy ra lỗi khi đăng kí bằng Google.",
      });
    }

  }

  function GoogleError() {
    setNotification({
      kind: "Error",
      title: "Đăng kí thất bại",
      message: "Đã xảy ra lỗi khi đăng kí bằng Google.",
    });
  }

  async function handleGetOtp(event) {
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

    setOtpEnabled(true);
    setNotification(null);
    setNotification({
      kind: "Info",
      title: "Đã gửi OTP qua email của bạn",
      message: "Vui lòng kiểm tra email và nhập mã OTP để hoàn tất đăng kí.",
    });


    const response = await fetch("/api/users/otp/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });

    if (!response.ok) {
      const responseData = await response.json();
      setNotification({
        kind: "Error",
        title: "Không thể gửi OTP",
        message: responseData.message || "Đã xảy ra lỗi khi gửi OTP.",
      });
      return;
    }
    else {
      setNotification(null);
      setNotification({
        kind: "Info",
        title: "Xác nhận OTP",
        message: "Vui lòng nhập mã OTP để hoàn tất đăng kí.",
      });
    }
  }

  async function handleOtpConfirm() {

    const password = document.querySelector('input[name="password"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();
    const displayName = document.querySelector('input[name="displayName"]').value.trim();
    const otpInput = document.querySelector('input[name="otp"]');
    const otp = otpInput ? otpInput.value.trim() : "";

    if (!otp) {
      setNotification(null);
      setNotification({
        kind: "Error",
        title: "Không thể xác nhận OTP",
        message: "Vui lòng nhập mã OTP.",
      });
      return;
    }

    console.log("Submitting OTP confirmation with data:", JSON.stringify({
        email: email,
        otp: otp,
        password: password,
        name: displayName,
      }));

    const response = await fetch("/api/users/otp-verify/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        otp: otp,
        password: password,
        name: displayName,
      }),
    })

    if (response.ok) {
      setNotification(null);
      setNotification({
        kind: "Success",
        title: "Đăng kí thành công",
        message: "Tài khoản của bạn đã được tạo thành công. Đang chuyển hướng đến trang Home...",
      });

      setTimeout(() => {
        navigate("/home", { replace: true });
      }, 1200);
    }
    else {
      const responseData = await response.json();

      setNotification(null);
      setNotification({
        kind: "Error",
        title: "Xác nhận OTP thất bại",
        message: responseData.message || "Đã xảy ra lỗi khi xác nhận OTP.",
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
              onSubmit={handleGetOtp}
              onHandleOtpConfirm={handleOtpConfirm}
              onGoogleSuccess={GoogleSuccess}
              onGoogleError={GoogleError}
              otpEnabled={otpEnabled}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Signup;
