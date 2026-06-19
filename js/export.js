/* ==========================================
   EXPORT RESULTS
   Exporta resultados a CSV y JSON
   ========================================== */

let LAST_SIMULATION_RESULTS = null;

function storeLastResults(results) {
    LAST_SIMULATION_RESULTS = results;
}

function downloadFile(filename, content, mimeType) {

    const blob = new Blob(
        [content],
        { type: mimeType }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

}

function exportResultsAsJSON() {

    if (!LAST_SIMULATION_RESULTS) {
        alert("Primero ejecuta una simulación.");
        return;
    }

    const content = JSON.stringify(
        LAST_SIMULATION_RESULTS,
        null,
        2
    );

    downloadFile(
        "mundial2026_montecarlo_results.json",
        content,
        "application/json"
    );

}

function exportResultsAsCSV() {

    if (!LAST_SIMULATION_RESULTS) {
        alert("Primero ejecuta una simulación.");
        return;
    }

    const rows = [];

    rows.push([
        "category",
        "team",
        "count",
        "probability"
    ]);

    function addRows(category, data) {

        data.forEach(row => {

            rows.push([
                category,
                row.team,
                row.count,
                row.probability
            ]);

        });

    }

    addRows("champion", LAST_SIMULATION_RESULTS.champion);
    addRows("runner_up", LAST_SIMULATION_RESULTS.runnerUp);
    addRows("qualified", LAST_SIMULATION_RESULTS.qualified);
    addRows("best_third", LAST_SIMULATION_RESULTS.bestThird);

    const csv = rows
        .map(row =>
            row.map(value => `"${String(value).replaceAll('"', '""')}"`)
                .join(",")
        )
        .join("\n");

    downloadFile(
        "mundial2026_montecarlo_results.csv",
        csv,
        "text/csv"
    );

}

function setupExportButtons() {

    const csvButton = document.getElementById("exportCSV");
    const jsonButton = document.getElementById("exportJSON");

    if (csvButton) {
        csvButton.addEventListener(
            "click",
            exportResultsAsCSV
        );
    }

    if (jsonButton) {
        jsonButton.addEventListener(
            "click",
            exportResultsAsJSON
        );
    }

}
