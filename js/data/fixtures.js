/* ==========================================
   REMAINING FIXTURES
   Partidos pendientes de fase de grupos
   ==========================================

   Estos partidos se simulan con Monte Carlo.
   Si un partido ya fue jugado, debe eliminarse de esta lista
   y actualizarse en standings.js.
*/

const FIXTURES = [

    // Grupo A
    { group: "A", home: "México", away: "Sudáfrica" },
    { group: "A", home: "Corea del Sur", away: "Chequia" },

    // Grupo B
    { group: "B", home: "Canadá", away: "Catar" },
    { group: "B", home: "Suiza", away: "Bosnia y Herzegovina" },

    // Grupo C
    { group: "C", home: "Brasil", away: "Escocia" },
    { group: "C", home: "Brasil", away: "Haití" },
    { group: "C", home: "Marruecos", away: "Escocia" },
    { group: "C", home: "Marruecos", away: "Haití" },

    // Grupo D
    { group: "D", home: "Estados Unidos", away: "Australia" },
    { group: "D", home: "Estados Unidos", away: "Turquía" },
    { group: "D", home: "Australia", away: "Paraguay" },
    { group: "D", home: "Turquía", away: "Paraguay" },

    // Grupo E
    { group: "E", home: "Alemania", away: "Costa de Marfil" },
    { group: "E", home: "Alemania", away: "Ecuador" },
    { group: "E", home: "Costa de Marfil", away: "Curazao" },
    { group: "E", home: "Ecuador", away: "Curazao" },

    // Grupo F
    { group: "F", home: "Países Bajos", away: "Suecia" },
    { group: "F", home: "Países Bajos", away: "Túnez" },
    { group: "F", home: "Suecia", away: "Japón" },
    { group: "F", home: "Japón", away: "Túnez" },

    // Grupo G
    { group: "G", home: "Bélgica", away: "Irán" },
    { group: "G", home: "Bélgica", away: "Nueva Zelanda" },
    { group: "G", home: "Egipto", away: "Irán" },
    { group: "G", home: "Egipto", away: "Nueva Zelanda" },

    // Grupo H
    { group: "H", home: "España", away: "Uruguay" },
    { group: "H", home: "España", away: "Arabia Saudita" },
    { group: "H", home: "Cabo Verde", away: "Uruguay" },
    { group: "H", home: "Cabo Verde", away: "Arabia Saudita" },

    // Grupo I
    { group: "I", home: "Francia", away: "Noruega" },
    { group: "I", home: "Francia", away: "Irak" },
    { group: "I", home: "Noruega", away: "Senegal" },
    { group: "I", home: "Senegal", away: "Irak" },

    // Grupo J
    { group: "J", home: "Argentina", away: "Austria" },
    { group: "J", home: "Argentina", away: "Jordania" },
    { group: "J", home: "Austria", away: "Argelia" },
    { group: "J", home: "Argelia", away: "Jordania" },

    // Grupo K
    { group: "K", home: "Portugal", away: "Colombia" },
    { group: "K", home: "Portugal", away: "Uzbekistán" },
    { group: "K", home: "Colombia", away: "RD Congo" },
    { group: "K", home: "RD Congo", away: "Uzbekistán" },

    // Grupo L
    { group: "L", home: "Inglaterra", away: "Croacia" },
    { group: "L", home: "Inglaterra", away: "Panamá" },
    { group: "L", home: "Croacia", away: "Ghana" },
    { group: "L", home: "Ghana", away: "Panamá" }

];

function getFixturesByGroup(group) {
    return FIXTURES.filter(match => match.group === group);
}

function getAllFixtures() {
    return FIXTURES;
}
