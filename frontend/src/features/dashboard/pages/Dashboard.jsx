import Header from "../../../shared/components/Header";
import AboutSection from "../components/AboutSection";
import IntroSection from "../components/IntroSection";
import "./dashboard.css";

function Dashboard() {
  return (
    <div className="landing-shell">
      <Header />

      <main className="landing-pages">
        <IntroSection />
        <AboutSection />
      </main>
    </div>
  );
}

export default Dashboard;
