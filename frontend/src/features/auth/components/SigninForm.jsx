import IconCharacter from "../../../shared/icons/IconCharacter";
import Google from "./Google";

function SigninForm({ onSubmit, onGoogleSuccess, onGoogleError }) {
  return (
    <form className="signup-card glass-card shadow-sm signin-card" onSubmit={onSubmit}>
      <div className="signup-card-header">
        <div className="signup-character-slot" aria-label="Character icon area">
          <IconCharacter.Comeback />
        </div>
        <div>
          <p className="eyebrow mb-2">Welcome back</p>
          <h1>Đăng nhập</h1>
          <p>Tiếp tục trò chuyện và quản lý AI cá nhân của bạn.</p>
        </div>
      </div>

      <div className="signin-field-stack">
        <label className="signup-field">
          <span>Email</span>
          <input type="email" name="email" placeholder="you@example.com" autoComplete="email" />
        </label>

        <label className="signup-field">
          <span>Mật khẩu</span>
          <input
            type="password"
            name="password"
            placeholder="Nhập mật khẩu"
            autoComplete="current-password"
          />
        </label>
      </div>

      <div className="signin-form-options">
        <label className="signin-remember">
          <input type="checkbox" name="remember" />
          <span>Ghi nhớ đăng nhập</span>
        </label>
        <a href="/auth/forgot-password">Quên mật khẩu?</a>
      </div>

      <button className="btn btn-dark btn-lg rounded-pill fw-bold signup-submit" type="submit">
        Đăng nhập
      </button>

      <div className="signup-divider">
        <span>hoặc</span>
      </div>

      <Google mode="signin" onSuccess={onGoogleSuccess} onError={onGoogleError} />

      <p className="signup-login-note">
        Chưa có tài khoản? <a href="/auth/signup">Đăng kí</a>
      </p>
    </form>
  );
}

export default SigninForm;
