## Obiettivo

Creare un'app single player in React (mobile first) per calcolare il proprio "trauma score" selezionando eventi traumatici da una lista. Lo stile deve essere TailwindCSS.

## Tecnologie

- React + Vite
- TailwindCSS
- LocalStorage (facoltativo)

---

## Flow

1. All'avvio, l'utente vede una schermata di benvenuto con il titolo "TraumaScore" e un pulsante "Inizia".
2. Dopo il click, viene mostrata la prima categoria (es: "Famiglia & Infanzia").
3. Ogni categoria mostra una lista di domande (traumi) con checkbox e il punteggio relativo.
4. L'utente può selezionare qualsiasi numero di esperienze.
5. In fondo a ogni categoria, pulsante "Avanti" per passare alla successiva.
6. Alla fine dell'ultima categoria, viene mostrato:

   - Il punteggio totale
   - Un breve commento ironico in base al punteggio
   - Pulsante per ricominciare

---

## Categorie e Domande con Punti

### Famiglia & Infanzia

- [ ] Genitori separati (+5)
- [ ] Genitore assente (+7)
- [ ] Violenza psicologica ripetuta (+10)
- [ ] Violenza fisica (+15)
- [ ] Povertà seria da piccolo (+10)
- [ ] Bullismo scolastico (+6)
- [ ] Sei stato il "terapeuta" della famiglia (+8)

### Amore & Relazioni

- [ ] Ghosting dopo 3+ mesi (+5)
- [ ] Tradimento (+7)
- [ ] Relazione tossica (+10)
- [ ] Amore non corrisposto durato anni (+6)
- [ ] "Era la persona giusta" ma ti ha rovinato (+10)

### Mente & Emozioni

- [ ] Attacchi di panico (+6)
- [ ] Depressione diagnosticata (+10)
- [ ] Burnout scolastico/lavorativo (+5)
- [ ] Hai finto di stare bene per anni (+8)
- [ ] Ansia sociale invalidante (+6)

### Corpo & Salute

- [ ] Ricoveri ospedalieri gravi (+10)
- [ ] Malattia cronica (+12)
- [ ] Hai curato qualcuno a lungo (+7)
- [ ] Tentato suicidio (+15)

### Lutti & Perdita

- [ ] Morte improvvisa persona cara (+12)
- [ ] Morte animale a cui eri legatissimo (+5)
- [ ] Lutto complicato (trauma/senso di colpa) (+8)

### Lavoro & Soldi

- [ ] Sfruttamento o umiliazione sul lavoro (+5)
- [ ] Licenziamento traumatico (+6)
- [ ] Sottopagato per anni (+4)
- [ ] Hai mantenuto economicamente la famiglia (+7)

### Bonus Trauma

- [ ] Persona ha distrutto la tua autostima (+8)
- [ ] Cambiamento radicale di personalità dopo evento (+6)
- [ ] "Rinascita" dichiarata 3+ volte nella vita (+5)
- [ ] Terapia lunga 3+ anni (+5)
- [ ] Solitudine prolungata (+10)

---

## Prompt per Copilot (da usare come commento iniziale del file React)

```jsx
/*
  Obiettivo: TraumaScore app single player
  Stack: React + Vite, TailwindCSS, Mobile First
  Features:
    - Lista categorie con checkbox + punteggio
    - Navigazione step by step tra categorie
    - Punteggio totale al termine + frase ironica
    - UI mobile friendly (max 1 colonna, testo leggibile)
    - Possibile uso di useState per score tracking
    - Facoltativo: localStorage per persistenza selezioni
*/
```
