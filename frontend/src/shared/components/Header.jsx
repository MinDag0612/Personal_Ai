import WebNameIcon from "../icons/IconPage";
import "./Header.css";

function Header({
  showNav = true,
}) {
  return (
    <header className="site-header sticky-top">
      <nav className="container-xl navbar d-flex flex-wrap gap-2 py-3">
        <a className="navbar-brand brand-mark d-flex align-items-center gap-2 m-0" href="/">
          <WebNameIcon />
        </a>

        {showNav && (
          <div className="nav site-nav gap-1 mx-lg-auto order-3 order-lg-2">
            <a className="nav-link rounded-pill" href="#intro">Giới thiệu</a>
            <a className="nav-link rounded-pill" href="#about">About me</a>
          </div>
        )} 
        {/* // && trả về giá trị sau cùng nếu tất cả đều đúng */}

        <div className="d-flex gap-2 ms-auto order-2 order-lg-3">
          <a className="btn btn-light rounded-pill fw-bold px-3" href="/auth/signin">Đăng nhập</a>
          <a className="btn btn-dark rounded-pill fw-bold px-3" href="/auth/signup">Đăng kí</a>
        </div>
      </nav>
    </header>
  );
}

export default Header;
