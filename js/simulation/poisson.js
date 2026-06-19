/* ==========================================
   POISSON MODEL
   Modelo de goles basado en Elo
   ========================================== */

function getElo(team) {
    return ELO_RATINGS[team] || DEFAULT_ELO;
}

function poissonRandom(lambda) {

    const L = Math.exp(-lambda);

    let k = 0;
    let p = 1;

    do {
        k++;
        p *= Math.random();
    } while (p > L);

    return k - 1;

}

function expectedGoals(homeTeam, awayTeam) {

    const homeElo = getElo(homeTeam);
    const awayElo = getElo(awayTeam);

    const eloDiff = (homeElo - awayElo) / 400;

    let homeLambda = 1.32 * Math.exp(eloDiff * 0.55);
    let awayLambda = 1.32 * Math.exp(-eloDiff * 0.55);

    homeLambda = Math.max(0.2, Math.min(3.8, homeLambda));
    awayLambda = Math.max(0.2, Math.min(3.8, awayLambda));

    return {
        homeLambda,
        awayLambda
    };

}

function simulateScore(homeTeam, awayTeam) {

    const lambdas = expectedGoals(homeTeam, awayTeam);

    const homeGoals = poissonRandom(lambdas.homeLambda);
    const awayGoals = poissonRandom(lambdas.awayLambda);

    return {
        homeTeam,
        awayTeam,
        homeGoals,
        awayGoals
    };

}

function winProbability(teamA, teamB) {

    const eloA = getElo(teamA);
    const eloB = getElo(teamB);

    return 1 / (1 + Math.pow(10, -(eloA - eloB) / 400));

}

function simulateKnockoutWinner(teamA, teamB) {

    const score = simulateScore(teamA, teamB);

    if (score.homeGoals > score.awayGoals) {
        return teamA;
    }

    if (score.awayGoals > score.homeGoals) {
        return teamB;
    }

    const p = winProbability(teamA, teamB);

    return Math.random() < p ? teamA : teamB;

}
