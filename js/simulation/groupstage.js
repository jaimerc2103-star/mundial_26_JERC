/* ==========================================
   GROUP STAGE SIMULATION
   Simula partidos pendientes y calcula clasificados
   ========================================== */

function cloneCurrentStandings() {

    const cloned = {};

    for (const [group, teams] of Object.entries(CURRENT_STANDINGS)) {

        cloned[group] = teams.map(team => ({
            team: team.team,
            group: team.group,
            mp: team.mp,
            pts: team.pts,
            gf: team.gf,
            ga: team.ga,
            gd: team.gf - team.ga
        }));

    }

    return cloned;

}

function applyMatchResult(standings, group, result) {

    const home = standings[group].find(row => row.team === result.homeTeam);
    const away = standings[group].find(row => row.team === result.awayTeam);

    home.mp += 1;
    away.mp += 1;

    home.gf += result.homeGoals;
    home.ga += result.awayGoals;

    away.gf += result.awayGoals;
    away.ga += result.homeGoals;

    home.gd = home.gf - home.ga;
    away.gd = away.gf - away.ga;

    if (result.homeGoals > result.awayGoals) {
        home.pts += 3;
    } else if (result.awayGoals > result.homeGoals) {
        away.pts += 3;
    } else {
        home.pts += 1;
        away.pts += 1;
    }

}

function simulateRemainingGroupMatches() {

    const standings = cloneCurrentStandings();

    for (const fixture of FIXTURES) {

        const result = simulateScore(
            fixture.home,
            fixture.away
        );

        applyMatchResult(
            standings,
            fixture.group,
            result
        );

    }

    return standings;

}

function getQualifiedTeams(standings) {

    const qualified = [];
    const thirdPlacedTeams = [];

    for (const [group, rows] of Object.entries(standings)) {

        const sorted = sortGroupStandings(rows);

        qualified.push({
            ...sorted[0],
            qualificationType: "1º grupo"
        });

        qualified.push({
            ...sorted[1],
            qualificationType: "2º grupo"
        });

        thirdPlacedTeams.push({
            ...sorted[2],
            qualificationType: "3º grupo"
        });

    }

    const bestThirds = sortBestThirds(thirdPlacedTeams)
        .slice(0, 8)
        .map(team => ({
            ...team,
            qualificationType: "mejor tercero"
        }));

    return {
        qualified: [
            ...qualified,
            ...bestThirds
        ],
        bestThirds
    };

}
