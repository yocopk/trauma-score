# 🚀 Guida alla Migrazione Locale

## ⚠️ Problema Risolto

Lo script Node.js aveva problemi di compatibilità con TypeScript e i moduli ES. Ecco le soluzioni alternative:

## 🎯 Metodo 1: Console del Browser (RACCOMANDATO)

### Passo 1: Importa la funzione di migrazione

Aggiungi temporaneamente questo import in `App.tsx`:

```typescript
import "../utils/migration";
```

### Passo 2: Esegui nell'app

1. Avvia l'app: `npm run dev`
2. Apri l'app nel browser
3. Apri la console del browser (F12)
4. Esegui: `runMigration()`

La funzione mostrerà lo stato e eseguirà la migrazione automaticamente.

## 🎯 Metodo 2: Componente UI Temporaneo

### Passo 1: Aggiungi il componente

In `App.tsx`, aggiungi temporaneamente:

```typescript
import MigrationPanel from "./components/MigrationPanel";

// Nel render, aggiungi:
{
  /* Rimuovi dopo la migrazione */
}
<MigrationPanel />;
```

### Passo 2: Usa l'interfaccia

1. Vedrai un pannello rosso in basso a destra
2. Clicca "Esegui Migrazione"
3. Monitora il progresso nell'interfaccia

### Passo 3: Rimuovi il componente

Dopo la migrazione, rimuovi:

- L'import di `MigrationPanel`
- Il componente `<MigrationPanel />`

## 🎯 Metodo 3: Script Node.js (Se vuoi usarlo)

### Prerequisiti

1. Configura `scripts/firebase-config.js` con la tua configurazione Firebase reale
2. Installa le dipendenze Firebase per Node.js se necessario

### Configurazione Firebase

Modifica `scripts/firebase-config.js`:

```javascript
export const firebaseConfig = {
  apiKey: "la-tua-api-key",
  authDomain: "il-tuo-progetto.firebaseapp.com",
  projectId: "il-tuo-project-id",
  storageBucket: "il-tuo-progetto.appspot.com",
  messagingSenderId: "123456789",
  appId: "la-tua-app-id",
};
```

### Esecuzione

```bash
npm run migrate:locale
```

## 📊 Cosa Aspettarsi

La migrazione:

- ✅ Controlla quanti documenti hanno bisogno del campo `locale`
- ✅ Aggiorna solo i documenti senza `locale` esistente
- ✅ Usa batch processing per efficienza
- ✅ Imposta `locale: "it"` per tutti i documenti esistenti
- ✅ Mostra statistiche dettagliate

## ⚡ Raccomandazione

**Usa il Metodo 1 (Console del Browser)** perché:

- ✅ Non richiede configurazione aggiuntiva
- ✅ Usa la stessa configurazione Firebase dell'app
- ✅ Più semplice e veloce
- ✅ Feedback immediato nella console

## 🔍 Verifica Post-Migrazione

Dopo la migrazione, puoi verificare che sia andata a buon fine:

```javascript
// Nella console del browser
import { checkDocsWithoutLocale } from "./src/firebase/database";
const stats = await checkDocsWithoutLocale();
console.log(stats); // Dovrebbe mostrare withoutLocale: 0
```
