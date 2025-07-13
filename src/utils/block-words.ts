// Lista di parolacce da bloccare (italiano e inglese)
const BLOCKED_WORDS = [
  // Italiano
  "merda",
  "cazzo",
  "figa",
  "culo",
  "troia",
  "porca",
  "porco",
  "bastardo",
  "stronzo",
  "coglione",
  "figlio",
  "puttana",
  "zoccola",
  "suca",
  "vaffanculo",
  "fanculo",
  "diocane",
  "porcodio",
  "madonna",
  "cristo",
  "gesù",
  "dio",
  "cane",
  "maiale",
  "vacca",
  "negro",
  "frocio",
  "ricchione",
  "culattone",
  "minchia",
  "cazzi",
  "merdate",
  "stronzate",
  "coglioni",
  "troie",
  "puttane",
  "bastardi",
  "porci",
  "porche",
  "boia",
  "ostia",
  "dannazione",
  "inferno",
  "diavolo",
  "satana",
  "deficiente",
  "idiota",
  "scemo",
  "stupido",
  "cretino",
  "imbecille",
  "mongoloide",
  "handicappato",
  "ritardato",
  "sfigato",

  // Inglese
  "fuck",
  "shit",
  "bitch",
  "ass",
  "damn",
  "hell",
  "crap",
  "piss",
  "cock",
  "dick",
  "pussy",
  "cunt",
  "whore",
  "slut",
  "bastard",
  "asshole",
  "motherfucker",
  "fucker",
  "fucking",
  "fucked",
  "bullshit",
  "goddamn",
  "jesus",
  "christ",
  "nigger",
  "faggot",
  "retard",
  "gay",
  "lesbian",
  "homo",
  "queer",
  "stupid",
  "idiot",
  "moron",
  "dumb",
  "loser",
  "freak",
  "weirdo",
  "creep",
  "pervert",
  "psycho",

  // Varianti e abbreviazioni
  "wtf",
  "stfu",
  "gtfo",
  "milf",
  "dilf",
  "porn",
  "sex",
  "sexy",
  "horny",
  "nazi",
  "hitler",
  "666",
  "satan",
  "devil",
  "kill",
  "die",
  "death",
  "suicide",
  "rape",
  "murder",
  "terrorist",
];

// Calcola la distanza di Levenshtein tra due stringhe
const levenshteinDistance = (str1: string, str2: string): number => {
  const matrix = Array(str2.length + 1)
    .fill(null)
    .map(() => Array(str1.length + 1).fill(null));

  for (let i = 0; i <= str1.length; i++) {
    matrix[0][i] = i;
  }

  for (let j = 0; j <= str2.length; j++) {
    matrix[j][0] = j;
  }

  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1, // insertion
        matrix[j - 1][i] + 1, // deletion
        matrix[j - 1][i - 1] + indicator // substitution
      );
    }
  }

  return matrix[str2.length][str1.length];
};

// Controlla se una parola è troppo simile a una bad word
const isSimilarToBadWord = (text: string, badWord: string): boolean => {
  const distance = levenshteinDistance(text, badWord);
  const maxLength = Math.max(text.length, badWord.length);
  const similarity = 1 - distance / maxLength;

  // Se la similarità è >= 70% e la parola è lunga almeno quanto la bad word meno 2 caratteri
  return similarity >= 0.7 && text.length >= badWord.length - 2;
};

export const containsBadWord = (text: string): boolean => {
  // Controlla se ci sono spazi
  if (text.includes(" ")) {
    return true;
  }

  const lowerText = text.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");

  return BLOCKED_WORDS.some((word) => {
    const lowerWord = word.toLowerCase();

    // Controllo esatto (contenimento)
    if (lowerText.includes(lowerWord)) {
      return true;
    }

    // Controllo similarità per parole di lunghezza simile
    if (Math.abs(lowerText.length - lowerWord.length) <= 3) {
      return isSimilarToBadWord(lowerText, lowerWord);
    }

    return false;
  });
};
