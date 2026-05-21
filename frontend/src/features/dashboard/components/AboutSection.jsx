const aboutItems = [
    ["Basic Information", "Tên, tuổi, công việc, trường học, mục tiêu hoặc câu chuyện cá nhân."],
    ["Personality", "Giọng nói mong muốn: thân thiện, ngắn gọn, hài hước hoặc dịu dàng."],
    ["Familiar Topics", "Các lĩnh vực AI nên biết để trả lời đúng trọng tâm hơn."],
];

function AboutSection() {
  return (
    <section id="about" className="landing-section container-xl">
      <div className="row align-items-center g-4 g-lg-5">
        <div className="col-lg-6">
          <p className="eyebrow mb-3">About me</p>
          <h2 className="section-title mb-4">
            This is troduction about me,<br />
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
  );
}

export default AboutSection;
