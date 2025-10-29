import React from "react";

export default function Hero() {
  const scrollToForm = () =>
    document
      .getElementById("pledgeForm")
      ?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="hero fade-in" aria-labelledby="hero-heading">
      {/* animated plasma background */}
      <div className="hero-plasma" aria-hidden="true">
        <span className="blob b1" />
        <span className="blob b2" />
        <span className="blob b3" />
      </div>

      <div className="hero-inner">
        <h1 id="hero-heading" className="hero-title">
          Take the Climate Action Pledge 🌍
        </h1>

        <p className="hero-sub">
          Small actions by many people create big change.
        </p>

        <button
          className="btn primary hero-cta"
          onClick={scrollToForm}
          aria-label="Scroll to pledge form"
        >
          Take the Pledge
        </button>
      </div>

      {/* decorative accent (pure CSS/SVG could be used). Keep lightweight for mobile */}
      <svg className="hero-deco" width="0" height="0" aria-hidden="true" />
    </section>
  );
}
