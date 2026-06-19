/* ==========================================
   SIMULATION WORKER
   Ejecuta Monte Carlo fuera del hilo principal
   ========================================== */

importScripts(
    "../data/elo-ratings.js",
    "../data/groups.js",
    "../data/standings.js",
    "../data/fixtures.js",
    "../simulation/poisson.js",
    "../simulation/tiebreakers.js",
    "../simulation/groupstage.js",
    "../simulation/knockout.js",
    "../simulation/montecarlo.js"
);

self.onmessage = async function (event) {

    const { type, iterations } = event.data;

    if (type !== "RUN_SIMULATION") {
        return;
    }

    try {

        const results = await runMonteCarlo(
            iterations,
            progress => {
                self.postMessage({
                    type: "PROGRESS",
                    completed: progress.completed,
                    iterations: progress.iterations,
                    progress: progress.progress
                });
            }
        );

        self.postMessage({
            type: "DONE",
            results
        });

    } catch (error) {

        self.postMessage({
            type: "ERROR",
            message: error.message
        });

    }

};
