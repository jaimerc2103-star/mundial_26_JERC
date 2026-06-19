/* ==========================================
   WORLD CUP 2026
   GROUP CONFIGURATION
   ========================================== */

const GROUPS = {

    A: [
        "México",
        "Corea del Sur",
        "Chequia",
        "Sudáfrica"
    ],

    B: [
        "Canadá",
        "Suiza",
        "Bosnia y Herzegovina",
        "Catar"
    ],

    C: [
        "Brasil",
        "Marruecos",
        "Escocia",
        "Haití"
    ],

    D: [
        "Estados Unidos",
        "Australia",
        "Turquía",
        "Paraguay"
    ],

    E: [
        "Alemania",
        "Costa de Marfil",
        "Ecuador",
        "Curazao"
    ],

    F: [
        "Países Bajos",
        "Suecia",
        "Japón",
        "Túnez"
    ],

    G: [
        "Bélgica",
        "Irán",
        "Egipto",
        "Nueva Zelanda"
    ],

    H: [
        "España",
        "Uruguay",
        "Arabia Saudita",
        "Cabo Verde"
    ],

    I: [
        "Francia",
        "Noruega",
        "Senegal",
        "Irak"
    ],

    J: [
        "Argentina",
        "Austria",
        "Argelia",
        "Jordania"
    ],

    K: [
        "Portugal",
        "Colombia",
        "RD Congo",
        "Uzbekistán"
    ],

    L: [
        "Inglaterra",
        "Croacia",
        "Ghana",
        "Panamá"
    ]
};

/* ==========================================
   HELPERS
   ========================================== */

function getGroupByTeam(teamName) {

    for (const [group, teams] of Object.entries(GROUPS)) {

        if (teams.includes(teamName)) {
            return group;
        }

    }

    return null;
}

function getAllTeams() {

    return Object.values(GROUPS)
        .flat();

}

function getGroupTeams(group) {

    return GROUPS[group] || [];

}
