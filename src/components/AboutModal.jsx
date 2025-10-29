import React from "react";

export default function AboutModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="About Climate Action Pledge"
    >
      <div className="modal-card" tabIndex={-1}>
        {/* decorative animated background blobs */}
        <div className="modal-deco" aria-hidden="true">
          <span className="mblob m1" />
          <span className="mblob m2" />
          <span className="mblob m3" />
        </div>

        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close about"
        >
          ✕
        </button>
        <h3>About Climate Action Pledge</h3>
        <p className="muted">
          A student-driven initiative to collect real commitments and encourage
          small sustainable actions.
        </p>

        <div className="card-grid">
          <div className="info-card">
            <h4>Our Mission</h4>
            <p>
              Encourage everyday actions that reduce carbon footprint and build
              a community of changemakers.
            </p>
          </div>

          <div className="info-card">
            <h4>How It Works</h4>
            <p>
              Submit your pledge with simple commitments. Each pledge is
              displayed on the public wall and earns a certificate.
            </p>
          </div>

          <div className="info-card">
            <h4>Join Us</h4>
            <p>
              Share the pledge with friends, or bring it to your
              school/organisation to multiply impact.
            </p>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
