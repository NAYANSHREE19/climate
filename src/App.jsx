import React, { useState, useEffect } from "react";
import "./App.css";
import Hero from "./components/Hero";
import KPIs from "./components/KPIs";
import WhyAction from "./components/WhyAction";
import PledgeForm from "./components/PledgeForm";
import Certificate from "./components/Certificate";
import PledgeWall from "./components/PledgeWall";
import AboutModal from "./components/AboutModal";

export default function App() {
  const [pledges, setPledges] = useState(() => {
    // ✅ Load once from localStorage safely
    try {
      const saved = localStorage.getItem("pledges");
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.warn("Failed to parse pledges from localStorage:", err);
      return [];
    }
  });

  const [showCertificate, setShowCertificate] = useState(false);
  const [currentPledge, setCurrentPledge] = useState(null);
  const [aboutOpen, setAboutOpen] = useState(false);

  // ✅ Persist to localStorage whenever pledges change
  useEffect(() => {
    try {
      localStorage.setItem("pledges", JSON.stringify(pledges));
    } catch (err) {
      console.warn("Failed to save pledges to localStorage:", err);
    }
  }, [pledges]);

  // ✅ Handle new pledge
  const handleFormSubmit = (formData) => {
    const nextId = pledges.length
      ? Math.max(...pledges.map((p) => p.id)) + 1
      : 1;
    const newPledge = {
      id: nextId,
      ...formData,
      date: new Date().toLocaleDateString(),
      stars: formData.commitments?.length || 0,
    };

    setPledges((prev) => [newPledge, ...prev]);
    setCurrentPledge(newPledge);
    setShowCertificate(true);

    setTimeout(() => {
      document
        .getElementById("certificate")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  // ✅ Reveal animations (fade-in on scroll)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in-view");
        });
      },
      { threshold: 0.15 }
    );

    document
      .querySelectorAll(".reveal, .fade-in")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="app-root">
      <header className="site-header">
        <div className="container header-inner">
          <div className="brand">Climate Action Pledge</div>
          <nav className="nav">
            <a href="#pledgeForm">Pledge</a>
            <a href="#pledgeWall">Wall</a>
            <a className="nav-about" onClick={() => setAboutOpen(true)}>
              About
            </a>
          </nav>
        </div>
      </header>

      <div className="reveal">
        <Hero />
      </div>
      <div className="reveal">
        <KPIs pledgeCount={pledges.length} pledges={pledges} />
      </div>
      <div className="reveal">
        <WhyAction />
      </div>
      <div className="reveal">
        <PledgeForm onSubmit={handleFormSubmit} />
      </div>

      <main id="certificate" className="container">
        {showCertificate && currentPledge && (
          <Certificate
            pledge={currentPledge}
            onClose={() => setShowCertificate(false)}
          />
        )}
      </main>

      <section id="pledgeWall" className="reveal">
        <PledgeWall pledges={pledges} />
      </section>

      <footer className="site-footer">
        <div className="container">
          © {new Date().getFullYear()} Climate Action Pledge | Built with 💚 by
          You
        </div>
      </footer>

      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
  );
}
