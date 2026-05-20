import Header from "../components/Header";
import "./dashboard.css";
import IconCharacter from "../../../shared/icons/IconCharacter";

const steps = [
  "Owner cung cấp thông tin nền tảng về bản thân.",
  "AI dùng dữ liệu đó để trả lời câu hỏi theo ngữ cảnh.",
  "Người xem hỏi nhanh mà vẫn hiểu đúng màu sắc cá nhân.",
];

const aboutItems = [
  ["Basic Information", "Tên, tuổi, công việc, trường học, mục tiêu hoặc câu chuyện cá nhân."],
  ["Personality", "Giọng nói mong muốn: thân thiện, ngắn gọn, hài hước hoặc dịu dàng."],
  ["Familiar Topics", "Các lĩnh vực AI nên biết để trả lời đúng trọng tâm hơn."],
];

function Dashboard() {
  return (
    <div className="landing-shell">
      <Header />

      <main className="landing-pages">
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
                <a className="btn btn-dark btn-lg rounded-pill fw-bold px-4" href="/register">
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

        <section id="about" className="landing-section container-xl">
          <div className="row align-items-center g-4 g-lg-5">
            <div className="col-lg-6">
              <p className="eyebrow mb-3">About me</p>
              <h2 className="section-title mb-4">
                This is troduction about me,<br/>
                who developed this AI
                
              </h2>
              <p className="lead lead-text mb-0">
                this is a personal AI project
                I developed it to learn more about AI
                any feedback is welcome. Contact me by infor below
                Thank for reading this, and I hope you have a great day!
              </p>
            </div>

            <div className="col-lg-6">
              <div className="row g-3">
                {aboutItems.map(([title, description], index) => (
                  <div className="col-12" key={title}>
                    <article className="card glass-card border-0 shadow-sm">
                      <div className="card-body p-4">
                        <span className="number-badge mb-3">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="h5 fw-bold mb-2">{title}</h3>
                        <p className="mb-0 text-secondary">{description}</p>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
