export interface TraumaItem {
  id: string;
  text: string;
  points: number;
}

export interface Category {
  id: string;
  title: string;
  items: TraumaItem[];
}

export const traumaData: Category[] = [
  {
    id: "famiglia",
    title: "👨‍👩‍👧‍👦 Famiglia & Infanzia",
    items: [
      { id: "genitori-separati", text: "Genitori separati", points: 5 },
      { id: "genitore-assente", text: "Genitore assente", points: 7 },
      {
        id: "morte-genitore",
        text: "Morte di un genitore da bambino/ragazzo",
        points: 15,
      },
      {
        id: "abbandono-genitori",
        text: "Abbandono da parte dei genitori",
        points: 12,
      },
      {
        id: "violenza-psicologica",
        text: "Violenza psicologica ripetuta",
        points: 10,
      },
      { id: "violenza-fisica", text: "Violenza fisica", points: 15 },
      { id: "abusi-sessuali", text: "Abusi sessuali", points: 20 },
      { id: "poverta", text: "Povertà seria da piccolo", points: 10 },
      { id: "bullismo", text: "Bullismo scolastico", points: 6 },
      { id: "cyberbullismo", text: "Cyberbullismo persistente", points: 7 },
      {
        id: "terapeuta-famiglia",
        text: 'Sei stato il "terapeuta" della famiglia',
        points: 8,
      },
      {
        id: "fratello-malato",
        text: "Fratello/sorella con gravi problemi",
        points: 6,
      },
      {
        id: "famiglia-disfunzionale",
        text: "Famiglia gravemente disfunzionale",
        points: 9,
      },
      {
        id: "assistito-tradimento-genitore",
        text: "Hai assistito al tradimento di uno dei tuoi genitori",
        points: 15,
      },
      {
        id: "cresciuto-fratello-sorella",
        text: "Hai cresciuto tuo fratello o sorella",
        points: 8,
      },
    ],
  },
  {
    id: "amore",
    title: "💔 Amore & Relazioni",
    items: [
      { id: "ghosting", text: "Ghosting dopo 3+ mesi", points: 5 },
      { id: "tradimento", text: "Tradimento", points: 7 },
      {
        id: "tradimento-matrimonio",
        text: "Tradimento in matrimonio/convivenza",
        points: 10,
      },
      { id: "relazione-tossica", text: "Relazione tossica", points: 10 },
      { id: "violenza-domestica", text: "Violenza domestica", points: 15 },
      { id: "stalking", text: "Stalking da ex partner", points: 12 },
      {
        id: "amore-non-corrisposto",
        text: "Amore non corrisposto durato anni",
        points: 6,
      },
      {
        id: "persona-giusta-rovinato",
        text: '"Era la persona giusta" ma ti ha rovinato',
        points: 10,
      },
      { id: "matrimonio-fallito", text: "Matrimonio finito male", points: 8 },
      { id: "aborto-traumatico", text: "Aborto traumatico", points: 12 },
      { id: "infertilita", text: "Problemi di infertilità", points: 8 },
      {
        id: "relazione-segreta",
        text: "Relazione segreta durata anni",
        points: 6,
      },
      {
        id: "amante-sposato",
        text: "Sei stato l'amante di una persona sposata",
        points: 7,
      },
      {
        id: "abbandonato-gravidanza",
        text: "Abbandonato/a durante la gravidanza",
        points: 12,
      },
    ],
  },
  {
    id: "mente",
    title: "🧠 Mente & Emozioni",
    items: [
      { id: "attacchi-panico", text: "Attacchi di panico", points: 6 },
      { id: "depressione", text: "Depressione diagnosticata", points: 10 },
      {
        id: "depressione-maggiore",
        text: "Depressione maggiore/ricovero psichiatrico",
        points: 15,
      },
      { id: "disturbo-bipolare", text: "Disturbo bipolare", points: 12 },
      {
        id: "disturbi-alimentari",
        text: "Disturbi alimentari gravi",
        points: 10,
      },
      { id: "autolesionismo", text: "Autolesionismo", points: 12 },
      { id: "burnout", text: "Burnout scolastico/lavorativo", points: 5 },
      {
        id: "finto-stare-bene",
        text: "Hai finto di stare bene per anni",
        points: 8,
      },
      { id: "ansia-sociale", text: "Ansia sociale invalidante", points: 6 },
      {
        id: "disturbo-stress-post-traumatico",
        text: "PTSD diagnosticato",
        points: 15,
      },
      {
        id: "pensieri-suicidi",
        text: "Pensieri suicidi ricorrenti",
        points: 12,
      },
      {
        id: "dipendenze",
        text: "Dipendenze (alcol, droghe, gioco)",
        points: 10,
      },
      {
        id: "isolamento-sociale",
        text: "Isolamento sociale prolungato",
        points: 8,
      },
      {
        id: "sindrome-impostore",
        text: "Sindrome dell'impostore invalidante",
        points: 5,
      },
      {
        id: "perfezionismo-tossico",
        text: "Perfezionismo tossico che ti ha rovinato",
        points: 6,
      },
      {
        id: "dismorfia-corporea",
        text: "Dismorfia corporea/odio per il proprio corpo",
        points: 8,
      },
      {
        id: "stress-emotivo-cronico",
        text: "Stress emotivo cronico prolungato",
        points: 6,
      },
    ],
  },
  {
    id: "corpo",
    title: "🏥 Corpo & Salute",
    items: [
      { id: "ricoveri-gravi", text: "Ricoveri ospedalieri gravi", points: 10 },
      { id: "malattia-cronica", text: "Malattia cronica", points: 12 },
      {
        id: "malattia-terminale",
        text: "Diagnosi di malattia terminale",
        points: 20,
      },
      {
        id: "incidente-grave",
        text: "Incidente grave/trauma fisico",
        points: 12,
      },
      { id: "disabilita", text: "Disabilità acquisita", points: 15 },
      { id: "curato-qualcuno", text: "Hai curato qualcuno a lungo", points: 7 },
      { id: "tentato-suicidio", text: "Tentato suicidio", points: 15 },
      { id: "violenza-sessuale", text: "Violenza sessuale", points: 20 },
      {
        id: "interventi-chirurgici",
        text: "Multipli interventi chirurgici",
        points: 8,
      },
      { id: "dolore-cronico", text: "Dolore cronico invalidante", points: 10 },
      {
        id: "operazione-estetica-fallita",
        text: "Operazione estetica andata male",
        points: 8,
      },
      {
        id: "dipendenza-farmaci",
        text: "Dipendenza da farmaci prescritti",
        points: 9,
      },
      {
        id: "stress-fisico-cronico",
        text: "Stress fisico cronico che ha danneggiato la salute",
        points: 7,
      },
      {
        id: "cicatrice-evidente",
        text: "Hai una cicatrice evidente per un motivo particolare",
        points: 9,
      },
    ],
  },
  {
    id: "lutti",
    title: "⚰️ Lutti & Perdita",
    items: [
      {
        id: "morte-improvvisa",
        text: "Morte improvvisa persona cara",
        points: 12,
      },
      {
        id: "morte-genitore-adulto",
        text: "Morte di un genitore da adulto",
        points: 10,
      },
      {
        id: "morte-figlio",
        text: "Morte di un figlio",
        points: 25,
      },
      {
        id: "morte-coniuge",
        text: "Morte del coniuge/compagno",
        points: 15,
      },
      {
        id: "morte-animale",
        text: "Morte animale a cui eri legatissimo",
        points: 5,
      },
      {
        id: "lutto-complicato",
        text: "Lutto complicato (trauma/senso di colpa)",
        points: 8,
      },
      {
        id: "suicidio-persona-cara",
        text: "Suicidio di persona cara",
        points: 18,
      },
      {
        id: "morte-violenta",
        text: "Morte violenta di persona cara",
        points: 15,
      },
      {
        id: "perdita-casa",
        text: "Perdita della casa/sfratto",
        points: 7,
      },
      {
        id: "morte-durante-evento",
        text: "Qualcuno è morto durante un evento importante per te",
        points: 10,
      },
      {
        id: "perdita-oggetto-importante",
        text: "Perdita di oggetto/ricordo insostituibile",
        points: 4,
      },
    ],
  },
  {
    id: "lavoro",
    title: "💼 Lavoro & Soldi",
    items: [
      {
        id: "sfruttamento-lavoro",
        text: "Sfruttamento o umiliazione sul lavoro",
        points: 5,
      },
      {
        id: "licenziamento-traumatico",
        text: "Licenziamento traumatico",
        points: 6,
      },
      { id: "mobbing", text: "Mobbing sul posto di lavoro", points: 8 },
      { id: "sottopagato", text: "Sottopagato per anni", points: 4 },
      {
        id: "mantenuto-famiglia",
        text: "Hai mantenuto economicamente la famiglia",
        points: 7,
      },
      {
        id: "fallimento-aziendale",
        text: "Fallimento della propria azienda",
        points: 10,
      },
      { id: "debiti-gravi", text: "Debiti gravi/bancarotta", points: 12 },
      {
        id: "disoccupazione-lunga",
        text: "Disoccupazione prolungata",
        points: 6,
      },
      {
        id: "lavoro-usurante",
        text: "Lavoro fisicamente/mentalmente usurante",
        points: 5,
      },
      {
        id: "truffa-finanziaria",
        text: "Vittima di truffa/raggiro finanziario",
        points: 8,
      },
      {
        id: "famiglia-contro-lavoro",
        text: "Famiglia contraria alla tua carriera/sogni",
        points: 6,
      },
    ],
  },
  {
    id: "bonus",
    title: "🎯 Bonus Trauma",
    items: [
      {
        id: "autostima-distrutta",
        text: "Persona ha distrutto la tua autostima",
        points: 8,
      },
      {
        id: "cambiamento-personalita",
        text: "Cambiamento radicale di personalità dopo evento",
        points: 6,
      },
      {
        id: "rinascita-multipla",
        text: '"Rinascita" dichiarata 3+ volte nella vita',
        points: 5,
      },
      { id: "terapia-lunga", text: "Terapia lunga 3+ anni", points: 5 },
      {
        id: "solitudine-prolungata",
        text: "Solitudine prolungata",
        points: 10,
      },
      {
        id: "tradimento-amico",
        text: "Tradimento di migliore amico/a",
        points: 6,
      },
      {
        id: "essere-testimone",
        text: "Essere testimone di evento traumatico",
        points: 8,
      },
      {
        id: "guerra-conflitto",
        text: "Esperienza di guerra o conflitto",
        points: 15,
      },
      {
        id: "discriminazione",
        text: "Discriminazione grave per etnia/orientamento",
        points: 7,
      },
      {
        id: "ricatto-emotivo",
        text: "Ricatto emotivo prolungato",
        points: 6,
      },
      {
        id: "crisi-identita",
        text: "Crisi di identità profonda",
        points: 7,
      },
      {
        id: "coming-out-traumatico",
        text: "Coming out andato molto male",
        points: 8,
      },
      {
        id: "social-media-trauma",
        text: "Umiliazione pubblica sui social media",
        points: 6,
      },
      {
        id: "gaslighting-prolungato",
        text: "Gaslighting prolungato da parte di qualcuno",
        points: 9,
      },
      {
        id: "catfish",
        text: "Sei stato vittima di catfish",
        points: 5,
      },
      {
        id: "revenge-porn",
        text: "Revenge porn o ricatto con foto/video",
        points: 12,
      },
      {
        id: "abuso-di-fiducia",
        text: "Grave abuso di fiducia da persona cara",
        points: 8,
      },
    ],
  },
];
