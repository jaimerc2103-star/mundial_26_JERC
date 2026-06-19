/* ==========================================
   UI HELPERS
   Renderiza tablas, progreso, KPIs y llaves
   ========================================== */

function setStatus(message, cssClass = "") {

    const status = document.getElementById("simulationStatus");

    status.className = cssClass;
    status.textContent = message;

}

function setProgress(progress) {

    const percentage = Math.round(progress * 100);

    document.getElementById("progressBar").style.width =
        `${percentage}%`;

    document.getElementById("progressText").textContent =
        `${percentage}%`;

}

function formatProbability(probability) {
    return `${(probability * 100).toFixed(2)}%`;
}

function renderProbabilityBar(probability) {

    return `
        <span class="probability-value">
            ${formatProbability(probability)}
        </span>

        <div class="probability-bar">
            <div
                class="probability-fill"
                style="width:${probability * 100}%">
            </div>
        </div>
    `;

}

function renderQualificationTable(results) {

    const table = document.getElementById("qualificationTable");

    table.innerHTML = results.qualified
        .slice(0, 32)
        .map(row => `
            <tr>
                <td class="team-cell">${row.team}</td>
                <td>
                    <span class="group-badge">
                        ${getGroupByTeam(row.team)}
                    </span>
                </td>
                <td>${renderProbabilityBar(row.probability)}</td>
            </tr>
        `)
        .join("");

}

function renderBestThirdsTable(results) {

    const table = document.getElementById("bestThirdsTable");

    table.innerHTML = results.bestThird
        .slice(0, 8)
        .map(row => `
            <tr>
                <td class="team-cell">${row.team}</td>
                <td>
                    <span class="group-badge">
                        ${getGroupByTeam(row.team)}
                    </span>
                </td>
                <td>${renderProbabilityBar(row.probability)}</td>
            </tr>
        `)
        .join("");

}

function renderKpis(results) {

    const champion = results.champion[0];
    const runnerUp = results.runnerUp[0];

    document.getElementById("predictedChampion").textContent =
        champion ? champion.team : "-";

    document.getElementById("predictedRunnerUp").textContent =
        runnerUp ? runnerUp.team : "-";

}

function renderMatch(match) {

    return `
        <div class="match-card">

            <div class="match-header">
                <span>Partido ${match.matchId}</span>
                <span>${match.round}</span>
            </div>

            <div class="team-row ${match.winner === match.home ? "predicted-winner" : ""}">
                <span class="team-name">${match.home}</span>
                <span class="team-score">
                    ${match.winner === match.home ? "✓" : ""}
                </span>
            </div>

            <div class="vs-text">
                VS
            </div>

            <div class="team-row ${match.winner === match.away ? "predicted-winner" : ""}">
                <span class="team-name">${match.away}</span>
                <span class="team-score">
                    ${match.winner === match.away ? "✓" : ""}
                </span>
            </div>

            <div class="winner-label">
                Gana: ${match.winner}
            </div>

        </div>
    `;

}

function renderBracket(results) {

    const bracket = results.lastBracket;

    if (!bracket) {
        return;
    }

    document.getElementById("round32").innerHTML =
        bracket.round32.map(renderMatch).join("");

    document.getElementById("round16").innerHTML =
        bracket.round16.map(renderMatch).join("");

    document.getElementById("quarterFinals").innerHTML =
        bracket.quarterFinals.map(renderMatch).join("");

    document.getElementById("semiFinals").innerHTML =
        bracket.semiFinals.map(renderMatch).join("");

    document.getElementById("finalMatch").innerHTML =
        bracket.final.map(renderMatch).join("");

}

function renderAll(results) {

    renderKpis(results);
    renderQualificationTable(results);
    renderBestThirdsTable(results);
    renderChampionChart(results);
    renderBracket(results);

}
