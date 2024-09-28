function toggleSubunits(unitId) {
    const subunitList = document.getElementById(unitId);
    if (subunitList.style.display === "block") {
        subunitList.style.display = "none";
    } else {
        subunitList.style.display = "block";
    }
}

function openPDF(file) {
    document.getElementById('pdfViewer').src = file;
}

// Load the first unit and session by default
openPDF('pdfs/session0.pdf');