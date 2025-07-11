// Memoizzazione dei messaggi per ottimizzare le performance
const scoreMessages = new Map<number, string>();
const participantMessages = new Map<number, string>();

export const getScoreMessage = (score: number): string => {
  // Controlla se il messaggio è già stato calcolato
  if (scoreMessages.has(score)) {
    return scoreMessages.get(score)!;
  }

  let message: string;
  switch (true) {
    case score === 0:
      message = "Wow, sei praticamente invincibile! Oppure hai mentito... 🤔";
      break;
    case score <= 10:
      message = "Vita abbastanza tranquilla, complimenti! 🌈";
      break;
    case score <= 20:
      message = "Tutto sommato potresti stare peggio! 😌";
      break;
    case score <= 30:
      message = "Qualche botta ma niente di grave 💪";
      break;
    case score <= 40:
      message = "Beh, almeno non sei l'unico con qualche problemino... 😅";
      break;
    case score <= 50:
      message = "Inizia a farsi interessante la situazione 🤨";
      break;
    case score <= 60:
      message = "Congratulazioni! Sei ufficialmente 'damaged' 🎉";
      break;
    case score <= 70:
      message = "Il trauma è forte in questo... 🌪️";
      break;
    case score <= 80:
      message = "A questo punto dovresti scrivere un libro sulla resilienza 📚";
      break;
    case score <= 90:
      message = "Sei un sopravvissuto professionista 🏆";
      break;
    case score <= 100:
      message = "Ok, forse è ora di chiamare un terapeuta... o cinque 🧠";
      break;
    case score <= 110:
      message = "Livello 'Ho visto cose che voi umani...' raggiunto 👁️";
      break;
    case score <= 120:
      message = "Plot armor activated! Come fai ad essere ancora qui? 🛡️";
      break;
    case score <= 130:
      message = "Sei diventato immune al dolore per pura abitudine 💉";
      break;
    case score <= 140:
      message = "Il trauma ti ha dato superpoteri, evidentemente 🦸‍♂️";
      break;
    case score <= 150:
      message = "Sei letteralmente un anime protagonist. Rispetto! 🔥";
      break;
    case score <= 160:
      message = "A questo punto il trauma è il tuo spirit animal 🐺";
      break;
    case score <= 170:
      message = "Hai collezionato traumi come fossero Pokemon 🎮";
      break;
    case score <= 180:
      message = "Il tuo CV di sopravvivenza è impressionante 📜";
      break;
    case score <= 190:
      message = "Sei la definizione vivente di 'character development' 📖";
      break;
    case score <= 200:
      message = "A questo punto sei immortale per puro dispetto 😈";
      break;
    case score <= 220:
      message = "Hai raggiunto l'illuminazione tramite sofferenza 🧘‍♂️";
      break;
    case score <= 250:
      message = "Sei diventato una leggenda metropolitana 🏛️";
      break;
    case score <= 300:
      message = "Il trauma ti deve dei soldi a questo punto 💸";
      break;
    default:
      message = "Hai sbloccato il trauma infinito. Achievement unlocked! 🏅✨";
  }

  // Memorizza il risultato per future chiamate
  scoreMessages.set(score, message);
  return message;
};

export const getParticipantsMessage = (count: number): string => {
  // Controlla se il messaggio è già stato calcolato
  if (participantMessages.has(count)) {
    return participantMessages.get(count)!;
  }

  let message: string;
  switch (true) {
    case count === 0:
      message = "Sii il primo coraggioso a scoprire il tuo trauma score! 🏆";
      break;
    case count === 1:
      message = "1 persona ha già scoperto quanto è danneggiata 😅";
      break;
    case count <= 5:
      message = `${count} persone hanno già confessato i loro traumi 🤝`;
      break;
    case count <= 10:
      message = `${count} anime coraggiose si sono già messe a nudo 💪`;
      break;
    case count <= 25:
      message = `${count} danneggiati si sono già uniti al club! 🎭`;
      break;
    case count <= 50:
      message = `${count} persone hanno già scoperto di essere più traumatizzate di quanto pensassero 😱`;
      break;
    case count <= 100:
      message = `${count} sopravvissuti hanno già condiviso le loro cicatrici 🏅`;
      break;
    case count <= 250:
      message = `${count} guerrieri del trauma si sono già fatti avanti! ⚔️`;
      break;
    case count <= 500:
      message = `${count} leggende del trauma hanno già lasciato il segno 🔥`;
      break;
    case count <= 1000:
      message = `${count} eroi danneggiati nella nostra hall of fame! 🏛️`;
      break;
    default:
      message = `${count} persone hanno già scoperto il loro livello di trauma. Unisciti all'esercito dei danneggiati! 🚀`;
  }

  // Memorizza il risultato per future chiamate
  participantMessages.set(count, message);
  return message;
};
