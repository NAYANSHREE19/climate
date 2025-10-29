import React, { useState } from "react";

export default function PledgeForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    state: "",
    profile: "",
    profileDetail: "",
    commitments: [],
  });

  const options = [
    "Turn off lights",
    "Use public transport",
    "Recycle",
    "Avoid plastic",
    "Plant trees",
    "Save water",
    "Reduce waste",
    "Compost",
  ];

  const handleCommitmentChange = (commitment) => {
    setForm((prev) => {
      const exists = prev.commitments.includes(commitment);
      return {
        ...prev,
        commitments: exists
          ? prev.commitments.filter((c) => c !== commitment)
          : [...prev.commitments, commitment],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.mobile) return;
    onSubmit(form);
    setForm({
      name: "",
      email: "",
      mobile: "",
      state: "",
      profile: "",
      profileDetail: "",
      commitments: [],
    });
  };

  return (
    <section id="pledgeForm" className="pledge-form">
      <div className="container">
        <h2>Pledge Form</h2>
        <form onSubmit={handleSubmit} className="form-grid">
          <input
            required
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            required
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            required
            type="tel"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
          />
          <input
            placeholder="State"
            value={form.state}
            onChange={(e) => setForm({ ...form, state: e.target.value })}
          />
          <select
            value={form.profile}
            onChange={(e) =>
              setForm({ ...form, profile: e.target.value, profileDetail: "" })
            }
          >
            <option value="">Select Profile</option>
            <option>Student</option>
            <option>Working Professional</option>
            <option>Workshop</option>
            <option>Other</option>
          </select>

          {/* conditional detail input based on profile */}
          {form.profile === "Student" && (
            <input
              placeholder="Institution / Year (optional)"
              value={form.profileDetail}
              onChange={(e) =>
                setForm({ ...form, profileDetail: e.target.value })
              }
            />
          )}
          {form.profile === "Working Professional" && (
            <input
              placeholder="Organization / Role (optional)"
              value={form.profileDetail}
              onChange={(e) =>
                setForm({ ...form, profileDetail: e.target.value })
              }
            />
          )}
          {form.profile === "Workshop" && (
            <input
              placeholder="Workshop / Group Name (optional)"
              value={form.profileDetail}
              onChange={(e) =>
                setForm({ ...form, profileDetail: e.target.value })
              }
            />
          )}
          {form.profile === "Other" && (
            <input
              placeholder="Tell us (optional)"
              value={form.profileDetail}
              onChange={(e) =>
                setForm({ ...form, profileDetail: e.target.value })
              }
            />
          )}

          <div className="commitments">
            <p className="commit-title">Commitments</p>
            <div className="commit-list">
              {options.map((c) => (
                <label key={c} className="commit-item">
                  <input
                    type="checkbox"
                    checked={form.commitments.includes(c)}
                    onChange={() => handleCommitmentChange(c)}
                  />
                  <span>{c}</span>
                </label>
              ))}
            </div>
          </div>

          <button className="btn primary fullwidth" type="submit">
            Submit Pledge
          </button>
        </form>

        <p className="disclaimer">
          Mobile Number and Email are required for validation but never shown
          publicly. Data is used only for verification and engagement.
        </p>
      </div>
    </section>
  );
}
