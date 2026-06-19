/* ==========================================
   ELO RATINGS
   Prior estadístico para el modelo Poisson
   ========================================== */

const ELO_RATINGS = {
    "Argentina": 2080,
    "Francia": 2050,
    "Brasil": 2020,
    "Inglaterra": 2010,
    "España": 1990,
    "Portugal": 1980,

    "Países Bajos": 1940,
    "Alemania": 1935,
    "Bélgica": 1910,
    "Uruguay": 1900,
    "Colombia": 1880,
    "Croacia": 1870,

    "México": 1810,
    "Estados Unidos": 1800,
    "Suiza": 1795,
    "Marruecos": 1790,
    "Japón": 1785,
    "Senegal": 1775,

    "Austria": 1765,
    "Ecuador": 1760,
    "Suecia": 1755,
    "Corea del Sur": 1745,
    "Australia": 1710,
    "Irán": 1705,

    "Chequia": 1700,
    "Canadá": 1695,
    "Costa de Marfil": 1690,
    "Noruega": 1685,
    "Paraguay": 1680,
    "Túnez": 1660,

    "Egipto": 1655,
    "Ghana": 1645,
    "Turquía": 1640,
    "Escocia": 1635,
    "Argelia": 1630,
    "Bosnia y Herzegovina": 1600,

    "Arabia Saudita": 1585,
    "Catar": 1580,
    "Panamá": 1560,
    "Uzbekistán": 1550,
    "Sudáfrica": 1540,
    "Jordania": 1500,

    "Irak": 1495,
    "Cabo Verde": 1490,
    "Haití": 1460,
    "RD Congo": 1455,
    "Curazao": 1420,
    "Nueva Zelanda": 1415
};

/* Valor por defecto si un equipo no tiene rating */
const DEFAULT_ELO = 1500;
