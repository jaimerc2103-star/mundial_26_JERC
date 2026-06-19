/* ==========================================
   KNOCKOUT STAGE SIMULATION
   Genera llaves desde 16avos hasta final
   ========================================== */

/*
   Nota profesional:
   Esta v1 usa un emparejamiento determinista por fuerza Elo
   para construir una llave estable a partir de los 32 clasificados.

   v2 puede reemplazarse por la matriz oficial exacta FIFA 2026
   para terceros clasificados según combinaciones A-L.
*/

function buildRoundOf32(qualifiedTeams) {

    const sorted = [...qualifiedTeams]
        .sort((a, b) => getElo(b.team) - getElo(a.team));

    const round32 = [];

    for (let i = 0; i < 16; i++) {

        round32.push({
            round: "16avos",
            matchId: i + 1,
            home: sorted[i].team,
            away: sorted[31 - i].team
        });

    }

    return round32;

}

function simulateKnockoutRound(matches, roundName) {

    return matches.map((match, index) => {

        const winner = simulateKnockoutWinner(
            match.home,
            match.away
        );

        return {
            round: roundName,
            matchId: index + 1,
            home: match.home,
            away: match.away,
            winner
        };

    });

}

function buildNextRound(previousRound, nextRoundName) {

    const nextMatches = [];

    for (let i = 0; i < previousRound.length; i += 2) {

        nextMatches.push({
            round: nextRoundName,
            matchId: nextMatches.length + 1,
            home: previousRound[i].winner,
            away: previousRound[i + 1].winner
        });

    }

    return nextMatches;

}

function simulateFullKnockout(qualifiedTeams) {

    const round32Matches = buildRoundOf32(qualifiedTeams);
    const round32 = simulateKnockoutRound(round32Matches, "16avos");

    const round16Matches = buildNextRound(round32, "Octavos");
    const round16 = simulateKnockoutRound(round16Matches, "Octavos");

    const quarterMatches = buildNextRound(round16, "Cuartos");
    const quarterFinals = simulateKnockoutRound(quarterMatches, "Cuartos");

    const semiMatches = buildNextRound(quarterFinals, "Semifinales");
    const semiFinals = simulateKnockoutRound(semiMatches, "Semifinales");

    const finalMatches = buildNextRound(semiFinals, "Final");
    const final = simulateKnockoutRound(finalMatches, "Final");

    return {
        round32,
        round16,
        quarterFinals,
        semiFinals,
        final,
        champion: final[0].winner,
        runnerUp: final[0].home === final[0].winner
            ? final[0].away
            : final[0].home
    };

}
