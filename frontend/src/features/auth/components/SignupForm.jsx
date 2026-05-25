import IconCharacter from "../../../shared/icons/IconCharacter";
import Google from "./Google";

function SignupForm({ onSubmit, onHandleOtpConfirm, onGoogleSuccess, onGoogleError, otpEnabled }) {
  return (
    <form className="signup-card glass-card shadow-sm" onSubmit={onSubmit}>
      <div className="signup-card-header">
        <div className="signup-character-slot" aria-label="Iconic character area">
          <IconCharacter.Welcome />
        </div>
        <div>
          <p className="eyebrow mb-2">Create your personal AI</p>
          <h1>Đăng kí tài khoản</h1>
          <p>Thông tin này giúp bạn quản lý AI cá nhân sau khi tạo.</p>
        </div>
      </div>

      <fieldset className="signup-field-grid" disabled={otpEnabled}>
        <label className="signup-field">
          <span>Tên hiển thị</span>
          <input type="text" name="displayName" placeholder="Tony Nguyen" />
        </label>

        <label className="signup-field">
          <span>Email</span>
          <input type="email" name="email" placeholder="you@example.com" />
        </label>

        <label className="signup-field">
          <span>Mật khẩu</span>
          <input type="password" name="password" placeholder="Ít nhất 8 ký tự" />
        </label>

        <label className="signup-field">
          <span>Xác nhận mật khẩu</span>
          <input type="password" name="confirmPassword" placeholder="Nhập lại mật khẩu" />
        </label>
      </fieldset>

      <button className="btn btn-dark btn-lg rounded-pill fw-bold signup-submit" type="submit">
        Tạo tài khoản
      </button>

      {otpEnabled && (
        <div className="signup-otp-row" >
          <label className="signup-field signup-otp-field">
            <span>Mã OTP</span>
            <input
              type="text"
              name="otp"
              inputMode="numeric"
              maxLength="6"
              placeholder="Nhập mã OTP"
            />
          </label>

          <button
            className="btn btn-outline-dark btn-lg rounded-pill fw-bold signup-otp-confirm"
            type="button"
            onClick={onHandleOtpConfirm}
          >
            Xác nhận
          </button>
        </div>
      )}

      <div className="signup-divider">
        <span>hoặc</span>
      </div>

      <Google onSuccess={onGoogleSuccess} onError={onGoogleError} />

      <p className="signup-login-note">
        Đã có tài khoản? <a href="/auth/signin">Đăng nhập</a>
      </p>
    </form>
  );
}

export default SignupForm;
