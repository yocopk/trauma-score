# 🎯 TraumaScore

Un'app web interattiva per calcolare il proprio "trauma score" attraverso un questionario autoironico basato su esperienze di vita. Progettata con un approccio mobile-first e un'interfaccia moderna.

## 📱 Panoramica

TraumaScore è un'applicazione single-page che guida l'utente attraverso diverse categorie di esperienze potenzialmente traumatiche, permettendo di selezionare quelle vissute e calcolando un punteggio finale con commenti ironici personalizzati.

### ✨ Caratteristiche Principali

- **📱 Mobile First**: Ottimizzata per dispositivi mobili con design responsive
- **🎨 UI Moderna**: Interfaccia pulita realizzata con TailwindCSS
- **🌍 Multilingue**: Supporto per italiano e inglese con i18next
- **📊 Punteggio Dinamico**: Calcolo in tempo reale del trauma score
- **💾 Persistenza**: Salvataggio automatico delle selezioni in localStorage
- **🎭 Commenti Ironici**: Feedback personalizzato basato sul punteggio ottenuto
- **🔄 Cambio Lingua**: Selettore lingua in tempo reale

## 🛠️ Tecnologie

- **React 18** + **Vite** - Framework e build tool
- **TypeScript** - Type safety
- **TailwindCSS** - Styling e design system
- **react-i18next** - Internazionalizzazione
- **Firebase** - Database e hosting (opzionale)
- **LocalStorage** - Persistenza dati lato client

## 🚀 Installazione e Avvio

### Prerequisiti

- Node.js (versione 16 o superiore)
- npm o yarn

### Setup del Progetto

```bash
# Clona il repository
git clone <url-repository>
cd trauma-score

# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev

# Build per produzione
npm run build
```

## 🎮 Come Funziona

1. **Benvenuto**: L'utente vede una schermata di benvenuto con il titolo "TraumaScore" e un pulsante "Inizia"
2. **Selezione Lingua**: Possibilità di scegliere tra italiano e inglese
3. **Categorie Progressive**: Navigazione attraverso 7 categorie di traumi:
   - 👨‍👩‍👧‍👦 Famiglia & Infanzia
   - 💔 Amore & Relazioni
   - 🧠 Mente & Emozioni
   - 🏥 Corpo & Salute
   - ⚰️ Lutti & Perdita
   - 💼 Lavoro & Soldi
   - 🎯 Bonus Trauma
4. **Selezione Interattiva**: Checkbox per ogni esperienza con punteggio visibile
5. **Risultato Finale**: Punteggio totale con commento ironico personalizzato
6. **Reset e Ricomincia**: Possibilità di rifare il test

## 📊 Sistema di Punteggio

Il punteggio viene calcolato sommando i punti di ogni esperienza selezionata:

- **Traumi lievi**: 4-7 punti
- **Traumi moderati**: 8-12 punti
- **Traumi gravi**: 15-25 punti
- **Punteggio massimo teorico**: 1146 punti

### Categorie di Risultato

- **0-50**: "Vita abbastanza serena" 😌
- **51-150**: "Qualche botta, ma si sopravvive" 😅
- **151-300**: "La vita ti ha testato parecchio" 😰
- **300+**: "Meriti una medaglia al valore" 🏅

## 📋 Struttura del Progetto

```
trauma-score/
├── src/
│   ├── components/          # Componenti React riutilizzabili
│   │   ├── Button.tsx
│   │   └── LanguageSelector.tsx
│   ├── data/               # Dati statici
│   │   └── traumaData.ts   # Database dei traumi e categorie
│   ├── firebase/           # Configurazione Firebase
│   │   ├── config.ts
│   │   └── database.ts
│   ├── locales/            # File di traduzione
│   │   ├── en.json
│   │   └── it.json
│   ├── types/              # Definizioni TypeScript
│   │   └── quiz.ts
│   ├── utils/              # Utilità e helper
│   │   ├── messages.ts
│   │   ├── translations.ts
│   │   └── util.ts
│   ├── App.tsx             # Componente principale
│   └── main.tsx            # Entry point
├── public/                 # Asset statici
└── README.md
```

## 🎯 Funzionalità Avanzate

- **Salvataggio Automatico**: Le selezioni vengono salvate automaticamente nel localStorage
- **Responsive Design**: Perfettamente utilizzabile su desktop, tablet e mobile
- **Accessibilità**: Progettato seguendo le best practice per l'accessibilità web
- **Performance**: Ottimizzato per caricamenti rapidi e fluidità d'uso

## 🔧 Personalizzazione

### Aggiungere Nuovi Traumi

I traumi sono definiti in `src/data/traumaData.ts`. Per aggiungerne di nuovi:

```typescript
{
  id: "nuovo-trauma",
  text: "Descrizione del trauma",
  points: 10,
}
```

### Modificare i Commenti Finali

I messaggi personalizzati sono configurabili in `src/utils/messages.ts`.

## 🌍 Internazionalizzazione (i18n)

L'app supporta la traduzione in più lingue utilizzando **react-i18next**.

### Lingue Supportate

- 🇮🇹 **Italiano** (lingua predefinita)
- 🇺🇸 **Inglese**

### Struttura delle Traduzioni

I file di traduzione si trovano in `src/locales/`:

```
src/locales/
├── it.json    # Traduzioni italiane
└── en.json    # Traduzioni inglesi
```

### Aggiungere Nuove Lingue

1. Crea un nuovo file JSON in `src/locales/` (es: `fr.json`)
2. Copia la struttura da `it.json` e traduci i testi
3. Registra la nuova lingua in `src/i18n/index.ts`:

```typescript
import frTranslations from "../locales/fr.json";

const resources = {
  it: { translation: itTranslations },
  en: { translation: enTranslations },
  fr: { translation: frTranslations }, // Nuova lingua
};
```

4. Aggiungi l'opzione nel componente `LanguageSelector.tsx`

### Utilizzare le Traduzioni

```typescript
import { useTranslation } from "react-i18next";

const { t } = useTranslation();
const welcomeTitle = t("welcome.title");
```

### Hooks Personalizzati

- **`useTraumaData()`**: Restituisce i dati dei traumi tradotti
- **`useTraumaMessages()`**: Gestisce i messaggi di punteggio e partecipanti tradotti

## 🤝 Contribuire

1. Fork del progetto
2. Crea un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Commit delle modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📄 Licenza

Questo progetto è distribuito sotto licenza MIT. Vedi `LICENSE` per maggiori informazioni.

## ⚠️ Disclaimer

Questa applicazione ha scopo puramente di intrattenimento e autoriflessione ironica. Non sostituisce in alcun modo un consulto professionale psicologico o medico. Se stai vivendo difficoltà emotive serie, ti invitiamo a rivolgerti a un professionista qualificato.
