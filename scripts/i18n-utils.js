#!/usr/bin/env node

/**
 * Script di utilità per la gestione delle traduzioni i18n
 *
 * Uso:
 * node scripts/i18n-utils.js validate          # Valida la completezza delle traduzioni
 * node scripts/i18n-utils.js generate [lang]   # Genera un template per una nuova lingua
 */

const fs = require("fs");
const path = require("path");

const LOCALES_DIR = path.join(__dirname, "..", "src", "locales");

// Carica le traduzioni esistenti
function loadTranslations() {
  const translations = {};
  const files = fs.readdirSync(LOCALES_DIR);

  files
    .filter((file) => file.endsWith(".json"))
    .forEach((file) => {
      const lang = path.basename(file, ".json");
      const content = fs.readFileSync(path.join(LOCALES_DIR, file), "utf8");
      translations[lang] = JSON.parse(content);
    });

  return translations;
}

// Valida che tutte le lingue abbiano le stesse chiavi
function validateTranslations() {
  const translations = loadTranslations();
  const languages = Object.keys(translations);

  if (languages.length === 0) {
    console.log("❌ Nessuna traduzione trovata");
    return false;
  }

  const referenceKeys = getAllKeys(translations[languages[0]]);

  for (let i = 1; i < languages.length; i++) {
    const lang = languages[i];
    const keys = getAllKeys(translations[lang]);

    const missingKeys = referenceKeys.filter((key) => !keys.includes(key));
    const extraKeys = keys.filter((key) => !referenceKeys.includes(key));

    if (missingKeys.length > 0) {
      console.log(`❌ ${lang} - Chiavi mancanti:`, missingKeys);
    }

    if (extraKeys.length > 0) {
      console.log(`⚠️  ${lang} - Chiavi extra:`, extraKeys);
    }

    if (missingKeys.length === 0 && extraKeys.length === 0) {
      console.log(`✅ ${lang} - Traduzione completa`);
    }
  }

  return true;
}

// Ottiene tutte le chiavi annidate da un oggetto
function getAllKeys(obj, prefix = "") {
  const keys = [];

  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (typeof obj[key] === "object" && obj[key] !== null) {
      keys.push(...getAllKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }

  return keys;
}

// Genera un template per una nuova lingua
function generateTemplate(newLang) {
  const translations = loadTranslations();
  const referenceTranslation =
    translations["it"] || translations[Object.keys(translations)[0]];

  if (!referenceTranslation) {
    console.log("❌ Nessuna traduzione di riferimento trovata");
    return;
  }

  // Crea un template con le stesse chiavi ma valori vuoti
  const template = createTemplate(referenceTranslation);

  const outputPath = path.join(LOCALES_DIR, `${newLang}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(template, null, 2), "utf8");

  console.log(`✅ Template per ${newLang} creato in: ${outputPath}`);
  console.log("📝 Ricorda di tradurre tutti i valori e aggiornare:");
  console.log("   - src/i18n/index.ts");
  console.log("   - src/components/LanguageSelector.tsx");
}

function createTemplate(obj) {
  const template = {};

  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      template[key] = createTemplate(obj[key]);
    } else {
      template[key] = `[TODO: Translate] ${obj[key]}`;
    }
  }

  return template;
}

// Script principale
function main() {
  const command = process.argv[2];

  if (!command) {
    console.log("Uso: node i18n-utils.js <comando>");
    console.log("Comandi disponibili:");
    console.log("  validate           - Valida le traduzioni");
    console.log("  generate <lang>    - Genera template per nuova lingua");
    return;
  }

  switch (command) {
    case "validate":
      validateTranslations();
      break;

    case "generate":
      const newLang = process.argv[3];
      if (!newLang) {
        console.log("❌ Specifica il codice della lingua (es: fr, de, es)");
        return;
      }
      generateTemplate(newLang);
      break;

    default:
      console.log(`❌ Comando sconosciuto: ${command}`);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  validateTranslations,
  generateTemplate,
  loadTranslations,
};
