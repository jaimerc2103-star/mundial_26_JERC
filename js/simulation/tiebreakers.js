/* ==========================================
   FIFA GROUP TIEBREAKERS
   Desempates simplificados para fase de grupos
   ==========================================

   Orden usado:
   1. Puntos
   2. Diferencia de goles
   3. Goles a favor
   4. Elo como aproximación estadística
*/

function sortGroupStandings(standings) {

    return standings.sort((a, b) => {

        if (b.pts !== a.pts) {
            return b.pts - a.pts;
        }

        if (b.gd !== a.gd) {
            return b.gd - a.gd;
        }

        if (b.gf !== a.gf) {
            return b.gf - a.gf;
        }

        return getElo(b.team) - getElo(a.team);

    });

}

function sortBestThirds(thirdPlacedTeams) {

    return thirdPlacedTeams.sort((a, b) => {

        if (b.pts !== a.pts) {
            return b.pts - a.pts;
        }

        if (b.gd !== a.gd) {
            return b.gd - a.gd;
        }

        if (b.gf !== a.gf) {
            return b.gf - a.gf;
        }

        return getElo(b.team) - getElo(a.team);

    });

}
