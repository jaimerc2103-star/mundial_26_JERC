/* ==========================================
   MAIN APPLICATION
   Punto de entrada del dashboard
   ========================================== */

let simulationWorker = null;

function createWorker() {

    if (simulationWorker) {
        simulationWorker.terminate();
    }

    simulationWorker = new Worker(
        "js/workers/simulation-worker.js"
    );

    simulationWorker.onmessage = handleWorkerMessage;

}

function handleWorkerMessage(event) {

    const data = event.data;

    switch (data.type) {

        case "PROGRESS":

            setProgress(data.progress);

            setStatus(
                `Simulando ${data.completed.toLocaleString()} / ${data.iterations.toLocaleString()}`,
                "status-running"
            );

            break;

        case "DONE":

            setProgress(1);

            setStatus(
                "Simulación completada",
                "status-success"
            );

            storeLastResults(data.results);

            renderAll(data.results);

            enableControls();

            break;

        case "ERROR":

            console.error(data.message);

            setStatus(
                "Error durante la simulación",
                "status-error"
            );

            enableControls();

            break;
    }

}

function disableControls() {

    const button =
        document.getElementById("runSimulationBtn");

    if (button) {
        button.disabled = true;
    }

}

function enableControls() {

    const button =
        document.getElementById("runSimulationBtn");

    if (button) {
        button.disabled = false;
    }

}

function getSimulationCount() {

    const select =
        document.getElementById("simulationCount");

    return Number(select.value);

}

function startSimulation() {

    const iterations =
        getSimulationCount();

    setProgress(0);

    setStatus(
        "Inicializando simulación...",
        "status-running"
    );

    disableControls();

    createWorker();

    simulationWorker.postMessage({
        type: "RUN_SIMULATION",
        iterations
    });

}

function setupSimulationButton() {

    const button =
        document.getElementById("runSimulationBtn");

    if (!button) {
        return;
    }

    button.addEventListener(
        "click",
        startSimulation
    );

}

function registerServiceWorker() {

    if (
        "serviceWorker" in navigator
    ) {

        navigator.serviceWorker
            .register("./sw.js")
            .catch(console.error);

    }

}

function initializeApplication() {

    setupSimulationButton();

    setupExportButtons();

    registerServiceWorker();

    setStatus(
        "Listo para ejecutar simulaciones",
        "status-success"
    );

}

document.addEventListener(
    "DOMContentLoaded",
    initializeApplication
);
