import React from "react";

export default function PledgeWall({ pledges }) {
  return (
    <section className="pledge-wall">
      <div className="container">
        <h2>Public Pledge Wall</h2>
        {pledges.length === 0 ? (
          <p className="muted">
            No pledges yet — be the first to take the pledge!
          </p>
        ) : (
          <div className="table-wrap">
            <table className="pledge-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>State</th>
                  <th>Profile</th>
                  <th>Commitments ⭐</th>
                </tr>
              </thead>
              <tbody>
                {pledges.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.name}</td>
                    <td>{p.date}</td>
                    <td>{p.state}</td>
                    <td>{p.profile}</td>
                    <td className="stars">
                      {"⭐".repeat(Math.max(0, p.stars || 0))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
