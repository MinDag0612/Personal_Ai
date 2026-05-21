import IconCharacter from "../../../shared/icons/IconCharacter";

const steps = [
  "Owner cung cấp thông tin nền tảng về bản thân.",
  "AI dùng dữ liệu đó để trả lời câu hỏi theo ngữ cảnh.",
  "Người xem hỏi nhanh mà vẫn hiểu đúng màu sắc cá nhân.",
];

function IntroSection() {
  return (
    <section id="intro" className="landing-section container-xl position-relative">
      <div className="row align-items-center g-4 g-lg-5">
        <div className="col-lg-7">
          <p className="eyebrow mb-3">AI hỏi đáp cá nhân hóa</p>
          <h1 className="hero-title mb-4">
            Trả lời như một phiên bản nhỏ gọn của chính bạn.
          </h1>
          <p className="lead lead-text mb-0">
            Personal AI giúp owner tạo một trợ lý hỏi đáp đơn giản từ các
            thông tin cơ bản: sở thích, cách xưng hô, tiểu sử, dự án và
            những điều muốn người khác biết.
          </p>

          <div className="d-flex flex-column flex-sm-row gap-2 mt-4">
            <a className="btn btn-dark btn-lg rounded-pill fw-bold px-4" href="/auth">
              Bắt đầu tạo AI
            </a>
            <a className="btn btn-light btn-lg rounded-pill fw-bold px-4" href="#about">
              Xem about me
            </a>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="card glass-card border-0 shadow-sm">
            <div className="card-body p-3 p-sm-4">
              {steps.map((step, index) => (
                <div className="step-row d-flex gap-3 align-items-start p-3 rounded-3" key={step}>
                  <span className="number-badge">{String(index + 1).padStart(2, "0")}</span>
                  <p className="mb-0 text-secondary">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="character-slot">
        <IconCharacter.Hello />
      </div>
    </section>
  );
}

export default IntroSection;
