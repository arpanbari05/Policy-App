import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const downloadComparePage = () => {
  const input = document.getElementById("printCompare");
  const comparePdfHides = document.querySelectorAll(".compare-pdf-hide");
  comparePdfHides.forEach(removeButton => {
    removeButton.style.display = "none";
    removeButton.style.opacity = 0;
  });
  html2canvas(input, { useCORS: true })
    .then(res => {
      comparePdfHides.forEach(removeButton => {
        removeButton.style.display = "block";
        removeButton.style.opacity = 1;
      });
      return res;
    })
    .then(canvas => {
      const componentWidth = input.offsetWidth;
      const componentHeight = input.offsetHeight;

      const orientation = componentWidth >= componentHeight ? "l" : "p";

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation,
        unit: "px",
        compress: true,
      });

      pdf.internal.pageSize.width = componentWidth;
      pdf.internal.pageSize.height = componentHeight;

      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        componentWidth,
        componentHeight,
        "FAST",
      );
      pdf.save("download.pdf");
    });
};
