/* ==========================================
   CHARTS
   Visualizaciones con Chart.js
   ========================================== */

let championChartInstance = null;

function renderChampionChart(results) {

    const canvas = document.getElementById("championChart");

    if (!canvas) {
        return;
    }

    const topTeams = results.champion.slice(0, 12);

    const labels = topTeams.map(row => row.team);

    const data = topTeams.map(row =>
        Number((row.probability * 100).toFixed(2))
    );

    if (championChartInstance) {
        championChartInstance.destroy();
    }

    championChartInstance = new Chart(canvas, {
        type: "bar",
        data: {
            labels,
            datasets: [
                {
                    label: "Probabilidad de campeón (%)",
                    data,
                    backgroundColor: [
                        "#22c55e",
                        "#38bdf8",
                        "#facc15",
                        "#a78bfa",
                        "#fb7185",
                        "#34d399",
                        "#60a5fa",
                        "#f97316",
                        "#e879f9",
                        "#14b8a6",
                        "#c084fc",
                        "#f43f5e"
                    ],
                    borderColor: "#eaf2ff",
                    borderWidth: 1
                }
            ]
        },
        options: {
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: "#eaf2ff"
                    }
                },
                tooltip: {
                    callbacks: {
                        label: context => {
                            return `${context.raw.toFixed(2)}%`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        color: "#9db3cc",
                        callback: value => `${value}%`
                    },
                    grid: {
                        color: "rgba(148,163,184,0.15)"
                    }
                },
                y: {
                    ticks: {
                        color: "#eaf2ff"
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

}
