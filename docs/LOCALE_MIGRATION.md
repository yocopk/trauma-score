# 🌍 Migrazione Locale Database

## Panoramica

È stato aggiunto il supporto per salvare la lingua scelta dall'utente (locale) insieme ai risultati del quiz in Firebase. Questa implementazione include:

1. **Nuovo campo `locale`** in tutti i nuovi risultati salvati
2. **Migrazione automatica** per i documenti esistenti
3. **Script di utilità** per gestire la migrazione

## 🔄 Cosa è cambiato

### Nuova struttura dati

```typescript
interface QuizResult {
  id?: string;
  answers: QuizAnswer[];
  totalPoints: number;
  locale: string; // ← NUOVO CAMPO
  completedAt: Date;
}
```

### Funzionalità implementate

- ✅ **Salvataggio automatico del locale** per tutti i nuovi quiz
- ✅ **Rilevamento automatico della lingua** dall'i18n
- ✅ **Migrazione batch** per documenti esistenti
- ✅ **Script di utilità** per gestire la migrazione
- ✅ **Statistiche pre-migrazione** per verificare lo stato del database

## 🚀 Come eseguire la migrazione

### Opzione 1: Script da terminale

```bash
npm run migrate:locale
```

### Opzione 2: Console del browser

1. Apri l'app nel browser
2. Apri la console del browser (F12)
3. Vai su `public/migrate-helper.js` e segui le istruzioni

### Opzione 3: Manualmente via codice

```typescript
import {
  addLocaleToExistingDocs,
  checkDocsWithoutLocale,
} from "./src/firebase/database";

// Controlla lo stato attuale
const stats = await checkDocsWithoutLocale();
console.log(stats); // { total, withLocale, withoutLocale }

// Esegui la migrazione
const result = await addLocaleToExistingDocs();
console.log(result); // { updated, errors }
```

## 📊 Funzioni di utilità

### `checkDocsWithoutLocale()`

Restituisce statistiche sui documenti che hanno bisogno di migrazione:

```typescript
{
  total: number; // Totale documenti
  withLocale: number; // Documenti già aggiornati
  withoutLocale: number; // Documenti da migrare
}
```

### `addLocaleToExistingDocs()`

Esegue la migrazione batch di tutti i documenti senza locale:

```typescript
{
  updated: number; // Documenti aggiornati con successo
  errors: number; // Documenti con errori
}
```

## ⚡ Ottimizzazioni implementate

- **Batch processing**: Usa `writeBatch` per aggiornamenti efficienti
- **Limite batch**: Massimo 500 documenti per batch (limite Firestore)
- **Error handling**: Gestione errori per batch singoli
- **Sicurezza**: Aggiorna solo documenti senza campo locale esistente

## 🔍 Valore del locale

Per tutti i documenti esistenti, il valore sarà impostato a:

```typescript
locale: "it"; // Lingua italiana come default
```

Per i nuovi documenti, il valore sarà dinamico basato sulla scelta dell'utente:

```typescript
locale: i18n.language; // "it" | "en" | altra lingua supportata
```

## 🎯 Prossimi passi

Dopo aver eseguito la migrazione, potrai:

1. **Analizzare le preferenze linguistiche** degli utenti
2. **Filtrare i risultati per lingua** nelle statistiche
3. **Personalizzare l'esperienza** basata sul locale
4. **Aggiungere nuove lingue** facilmente

## ⚠️ Note importanti

- La migrazione è **sicura** e non sovrascrive dati esistenti
- I documenti già con campo `locale` vengono **ignorati**
- È possibile **eseguire la migrazione più volte** senza problemi
- Il campo `locale` è **obbligatorio** per tutti i nuovi salvataggi
