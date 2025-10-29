import React, { useRef } from "react";

export default function Certificate({ pledge, onClose }) {
  const ref = useRef(null);
  if (!pledge) return null;

  const handleDownload = async () => {
    try {
      const html2canvasMod = await import("html2canvas").catch(() => null);
      const jspdfMod = await import("jspdf").catch(() => null);

      if (!html2canvasMod) {
        alert(
          "Please run `npm install html2canvas jspdf` in the project to enable certificate download."
        );
        return;
      }

      const html2canvas = html2canvasMod.default || html2canvasMod;
      const canvas = await html2canvas(ref.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      if (jspdfMod && (jspdfMod.jsPDF || jspdfMod.default)) {
        const { jsPDF } = jspdfMod.jsPDF
          ? jspdfMod
          : jspdfMod.default
          ? jspdfMod.default
          : jspdfMod;
        const pdf = new jsPDF({ orientation: "landscape" });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const imgProps = { width: canvas.width, height: canvas.height };
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 10, pdfWidth, pdfHeight);
        pdf.save(`${pledge.name || "pledge"}-certificate.pdf`);
        return;
      }

      // fallback: trigger PNG download
      const link = document.createElement("a");
      link.href = imgData;
      link.download = `${pledge.name || "pledge"}-certificate.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
      alert("Failed to export certificate. See console for details.");
    }
  };

  const handleShare = async () => {
    try {
      // try to share an image file if supported
      const html2canvasMod = await import("html2canvas").catch(() => null);
      if (!navigator.share) {
        alert(
          "Sharing is not supported on this device. You can download the certificate instead."
        );
        return;
      }

      if (html2canvasMod && navigator.canShare) {
        const html2canvas = html2canvasMod.default || html2canvasMod;
        const canvas = await html2canvas(ref.current, { scale: 2 });
        const blob = await new Promise((res) =>
          canvas.toBlob(res, "image/png")
        );
        const file = new File(
          [blob],
          `${pledge.name || "pledge"}-certificate.png`,
          { type: "image/png" }
        );

        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: "My Climate Action Pledge",
            text: `I took the Climate Action Pledge!`,
          });
          return;
        }
      }

      // fallback to Web Share text / url
      await navigator.share({
        title: "My Climate Action Pledge",
        text: `I just took the Climate Action Pledge — join me!`,
        url: window.location.href,
      });
    } catch (err) {
      console.error(err);
      alert(
        "Sharing failed or is not supported. You can download the certificate instead."
      );
    }
  };

  return (
    <section className="certificate">
      <div className="container">
        <div className="cert-card" ref={ref} id="cert-card">
          <span className="cert-deco" aria-hidden="true" />
          <div className="cert-hero">
            <p className="cert-quote">
              “Small steps, big impact — your pledge matters.”
            </p>
            <p className="cert-sub">Thank you for joining the movement.</p>
          </div>

          <div className="cert-body">
            <h3>Certificate of Commitment</h3>
            <p className="muted">This certifies that</p>
            <p className="cert-name">{pledge.name}</p>
            <p className="cert-msg">
              is <strong>Cool Enough to Care!</strong>
            </p>
            <p className="stars">
              {"⭐".repeat(Math.max(0, pledge.stars || 0))}
            </p>
            <p className="muted small">Date: {pledge.date}</p>
            {pledge.profileDetail && (
              <p className="muted small">Detail: {pledge.profileDetail}</p>
            )}
          </div>
        </div>

        <div
          className="btn-row"
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            marginTop: 12,
          }}
        >
          <button
            className="btn primary"
            onClick={handleDownload}
            type="button"
          >
            Download Certificate
          </button>
          <button className="btn" onClick={handleShare} type="button">
            Share
          </button>
          <button className="btn" onClick={onClose} type="button">
            Close
          </button>
        </div>
      </div>
    </section>
  );
}
