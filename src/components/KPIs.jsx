import React from "react";

export default function KPIs({ pledgeCount = 0, pledges = [] }) {
  const target = 1000000;
  const studentCount = pledges.filter(
    (p) => ((p.profile || "") + "").toLowerCase() === "student"
  ).length;
  const professionalCount = pledges.filter(
    (p) => ((p.profile || "") + "").toLowerCase() === "working professional"
  ).length;
  const workshopCount = pledges.filter(
    (p) => ((p.profile || "") + "").toLowerCase() === "workshop"
  ).length;

  return (
    <section className="kpis container" aria-label="Live KPIs">

      <div className="kpis-grid">
        <div className="kpi-card kpi-target" aria-hidden={false}>
          <div className="kpi-value">{target.toLocaleString()}</div>
          <div className="kpi-label">Target Pledges</div>
        </div>

        <div className="kpi-card kpi-achieved">
          <div className="kpi-value">{pledgeCount}</div>
          <div className="kpi-label">Achieved Pledges</div>
        </div>

        <div className="kpi-card kpi-students">
          <div className="kpi-value">{studentCount}</div>
          <div className="kpi-label">Students</div>
        </div>

        <div className="kpi-card kpi-pros">
          <div className="kpi-value">{professionalCount}</div>
          <div className="kpi-label">Working Professionals</div>
        </div>

        <div className="kpi-card kpi-workshops">
          <div className="kpi-value">{workshopCount}</div>
          <div className="kpi-label">Workshops</div>
        </div>
      </div>
    </section>
  );
}
