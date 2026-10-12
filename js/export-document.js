(function () {
  const PDF_FILENAME = "yovenia-sjalvbestammande-lss.pdf";
  const root = document.getElementById("document-export");
  const printBtn = document.getElementById("btn-print");
  const pdfBtn = document.getElementById("btn-pdf");
  const statusEl = document.getElementById("export-status");

  function setStatus(message, isError) {
    if (!statusEl) return;
    statusEl.hidden = !message;
    statusEl.textContent = message || "";
    statusEl.classList.toggle("export-status--error", Boolean(isError));
  }

  function onPrint() {
    setStatus("");
    window.print();
  }

  function loadHtml2Pdf() {
    return new Promise(function (resolve, reject) {
      if (window.html2pdf) {
        resolve(window.html2pdf);
        return;
      }
      var script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.2/html2pdf.bundle.min.js";
      script.async = true;
      script.onload = function () {
        if (window.html2pdf) resolve(window.html2pdf);
        else reject(new Error("html2pdf failed to load"));
      };
      script.onerror = function () {
        reject(new Error("Could not load PDF library"));
      };
      document.head.appendChild(script);
    });
  }

  function onPdfDownload() {
    if (!root || !pdfBtn) return;

    var originalLabel = pdfBtn.textContent;
    pdfBtn.disabled = true;
    printBtn && (printBtn.disabled = true);
    setStatus("Skapar PDF …");

    loadHtml2Pdf()
      .then(function (html2pdf) {
        var opt = {
          margin: [12, 14, 14, 14],
          filename: PDF_FILENAME,
          image: { type: "jpeg", quality: 0.95 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            letterRendering: true,
          },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
          pagebreak: { mode: ["avoid-all", "css", "legacy"] },
        };
        return html2pdf().set(opt).from(root).save();
      })
      .then(function () {
        setStatus("PDF sparad.");
        window.setTimeout(function () {
          setStatus("");
        }, 4000);
      })
      .catch(function () {
        setStatus(
          "Kunde inte skapa PDF. Använd Skriv ut och välj Spara som PDF.",
          true
        );
      })
      .finally(function () {
        pdfBtn.disabled = false;
        pdfBtn.textContent = originalLabel;
        printBtn && (printBtn.disabled = false);
      });
  }

  if (printBtn) printBtn.addEventListener("click", onPrint);
  if (pdfBtn) pdfBtn.addEventListener("click", onPdfDownload);

  if (window.location.hash === "#pdf" && pdfBtn) {
    window.setTimeout(onPdfDownload, 400);
  }
})();
