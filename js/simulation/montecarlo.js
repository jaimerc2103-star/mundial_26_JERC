/* ==========================================
   MONTE CARLO SIMULATION ENGINE
   Versión para ejecución directa sin Worker
   Útil para pruebas locales y fallback
   ========================================== */

function initializeSimulationCounters() {

    const teams = getAllTeams();

    const counters = {
        champion: {},
        runnerUp: {},
        qualified: {},
        bestThird: {},
        lastBracket: null
    };

    teams.forEach(team => {
        counters.champion[team] = 0;
        counters.runnerUp[team] = 0;
        counters.qualified[team] = 0;
        counters.bestThird[team] = 0;
    });

    return counters;

}

function runSingleSimulation() {

    const standings = simulateRemainingGroupMatches();

    const qualification = getQualifiedTeams(standings);

    const knockout = simulateFullKnockout(
        qualification.qualified
    );

    return {
        standings,
        qualified: qualification.qualified,
        bestThirds: qualification.bestThirds,
        knockout,
        champion: knockout.champion,
        runnerUp: knockout.runnerUp
    };

}

function updateSimulationCounters(counters, simulationResult) {

    simulationResult.qualified.forEach(team => {
        counters.qualified[team.team] += 1;
    });

    simulationResult.bestThirds.forEach(team => {
        counters.bestThird[team.team] += 1;
    });

    counters.champion[simulationResult.champion] += 1;
    counters.runnerUp[simulationResult.runnerUp] += 1;

    counters.lastBracket = simulationResult.knockout;

}

function runMonteCarlo(iterations, onProgress = null) {

    const counters = initializeSimulationCounters();

    const batchSize = iterations >= 1000000
        ? 5000
        : iterations >= 100000
            ? 2000
            : 500;

    let completed = 0;

    return new Promise(resolve => {

        function step() {

            const limit = Math.min(
                completed + batchSize,
                iterations
            );

            for (let i = completed; i < limit; i++) {

                const result = runSingleSimulation();

                updateSimulationCounters(
                    counters,
                    result
                );

            }

            completed = limit;

            if (onProgress) {
                onProgress({
                    completed,
                    iterations,
                    progress: completed / iterations
                });
            }

            if (completed < iterations) {
                setTimeout(step, 1);
            } else {
                resolve(
                    summarizeSimulationResults(
                        counters,
                        iterations
                    )
                );
            }

        }

        step();

    });

}

function summarizeSimulationResults(counters, iterations) {

    return {
        iterations,
        champion: toProbabilityArray(
            counters.champion,
            iterations
        ),
        runnerUp: toProbabilityArray(
            counters.runnerUp,
            iterations
        ),
        qualified: toProbabilityArray(
            counters.qualified,
            iterations
        ),
        bestThird: toProbabilityArray(
            counters.bestThird,
            iterations
        ),
        lastBracket: counters.lastBracket
    };

}

function toProbabilityArray(counterObject, iterations) {

    return Object.entries(counterObject)
        .map(([team, count]) => ({
            team,
            count,
            probability: count / iterations
        }))
        .sort((a, b) => b.probability - a.probability);

}
