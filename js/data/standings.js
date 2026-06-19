/* ==========================================
   CURRENT GROUP STANDINGS
   Base inicial para la simulación Monte Carlo
   ==========================================

   Campos:
   team = selección
   group = grupo
   mp = partidos jugados
   pts = puntos
   gf = goles a favor
   ga = goles en contra
   gd = diferencia de gol

   Para actualizar resultados:
   - Cambia mp, pts, gf y ga.
   - gd se recalcula automáticamente con createInitialStandings().
*/

const CURRENT_STANDINGS = {

    A: [
        { team: "México", group: "A", mp: 2, pts: 6, gf: 3, ga: 0 },
        { team: "Corea del Sur", group: "A", mp: 2, pts: 3, gf: 2, ga: 2 },
        { team: "Chequia", group: "A", mp: 2, pts: 1, gf: 2, ga: 3 },
        { team: "Sudáfrica", group: "A", mp: 2, pts: 1, gf: 1, ga: 3 }
    ],

    B: [
        { team: "Canadá", group: "B", mp: 2, pts: 4, gf: 7, ga: 1 },
        { team: "Suiza", group: "B", mp: 2, pts: 4, gf: 5, ga: 2 },
        { team: "Bosnia y Herzegovina", group: "B", mp: 2, pts: 1, gf: 2, ga: 5 },
        { team: "Catar", group: "B", mp: 2, pts: 1, gf: 1, ga: 7 }
    ],

    C: [
        { team: "Escocia", group: "C", mp: 1, pts: 3, gf: 1, ga: 0 },
        { team: "Marruecos", group: "C", mp: 1, pts: 1, gf: 1, ga: 1 },
        { team: "Brasil", group: "C", mp: 1, pts: 1, gf: 1, ga: 1 },
        { team: "Haití", group: "C", mp: 1, pts: 0, gf: 0, ga: 1 }
    ],

    D: [
        { team: "Estados Unidos", group: "D", mp: 1, pts: 3, gf: 4, ga: 1 },
        { team: "Australia", group: "D", mp: 1, pts: 3, gf: 2, ga: 0 },
        { team: "Turquía", group: "D", mp: 1, pts: 0, gf: 0, ga: 2 },
        { team: "Paraguay", group: "D", mp: 1, pts: 0, gf: 1, ga: 4 }
    ],

    E: [
        { team: "Alemania", group: "E", mp: 1, pts: 3, gf: 7, ga: 1 },
        { team: "Costa de Marfil", group: "E", mp: 1, pts: 3, gf: 1, ga: 0 },
        { team: "Ecuador", group: "E", mp: 1, pts: 0, gf: 0, ga: 1 },
        { team: "Curazao", group: "E", mp: 1, pts: 0, gf: 1, ga: 7 }
    ],

    F: [
        { team: "Suecia", group: "F", mp: 1, pts: 3, gf: 5, ga: 1 },
        { team: "Japón", group: "F", mp: 1, pts: 1, gf: 2, ga: 2 },
        { team: "Países Bajos", group: "F", mp: 1, pts: 1, gf: 2, ga: 2 },
        { team: "Túnez", group: "F", mp: 1, pts: 0, gf: 1, ga: 5 }
    ],

    G: [
        { team: "Nueva Zelanda", group: "G", mp: 1, pts: 1, gf: 2, ga: 2 },
        { team: "Irán", group: "G", mp: 1, pts: 1, gf: 2, ga: 2 },
        { team: "Bélgica", group: "G", mp: 1, pts: 1, gf: 1, ga: 1 },
        { team: "Egipto", group: "G", mp: 1, pts: 1, gf: 1, ga: 1 }
    ],

    H: [
        { team: "Uruguay", group: "H", mp: 1, pts: 1, gf: 1, ga: 1 },
        { team: "Arabia Saudita", group: "H", mp: 1, pts: 1, gf: 1, ga: 1 },
        { team: "España", group: "H", mp: 1, pts: 1, gf: 0, ga: 0 },
        { team: "Cabo Verde", group: "H", mp: 1, pts: 1, gf: 0, ga: 0 }
    ],

    I: [
        { team: "Noruega", group: "I", mp: 1, pts: 3, gf: 4, ga: 1 },
        { team: "Francia", group: "I", mp: 1, pts: 3, gf: 3, ga: 1 },
        { team: "Senegal", group: "I", mp: 1, pts: 0, gf: 1, ga: 3 },
        { team: "Irak", group: "I", mp: 1, pts: 0, gf: 1, ga: 4 }
    ],

    J: [
        { team: "Argentina", group: "J", mp: 1, pts: 3, gf: 3, ga: 0 },
        { team: "Austria", group: "J", mp: 1, pts: 3, gf: 3, ga: 1 },
        { team: "Jordania", group: "J", mp: 1, pts: 0, gf: 1, ga: 3 },
        { team: "Argelia", group: "J", mp: 1, pts: 0, gf: 0, ga: 3 }
    ],

    K: [
        { team: "Colombia", group: "K", mp: 1, pts: 3, gf: 3, ga: 1 },
        { team: "RD Congo", group: "K", mp: 1, pts: 1, gf: 1, ga: 1 },
        { team: "Portugal", group: "K", mp: 1, pts: 1, gf: 1, ga: 1 },
        { team: "Uzbekistán", group: "K", mp: 1, pts: 0, gf: 1, ga: 3 }
    ],

    L: [
        { team: "Inglaterra", group: "L", mp: 1, pts: 3, gf: 4, ga: 2 },
        { team: "Ghana", group: "L", mp: 1, pts: 3, gf: 1, ga: 0 },
        { team: "Panamá", group: "L", mp: 1, pts: 0, gf: 0, ga: 1 },
        { team: "Croacia", group: "L", mp: 1, pts: 0, gf: 2, ga: 4 }
    ]

};

/* ==========================================
   HELPERS
   ========================================== */

function createInitialStandings() {

    const standings = {};

    for (const [group, teams] of Object.entries(CURRENT_STANDINGS)) {

        standings[group] = teams.map(team => ({
            ...team,
            gd: team.gf - team.ga
        }));

    }

    return standings;

}

function getCurrentStandingByTeam(teamName) {

    for (const teams of Object.values(CURRENT_STANDINGS)) {

        const found = teams.find(row => row.team === teamName);

        if (found) {
            return found;
        }

    }

    return null;

}
