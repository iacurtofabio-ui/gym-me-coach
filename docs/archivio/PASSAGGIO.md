# Passaggio — dalla chat di progettazione alla prima sessione di Claude Code

> Scritto il 14/10/2026 alla fine della chat in cui sono nati lo studio di fattibilità, i piani
> Lavaredo e questo progetto. Serve **una volta sola**: dopo la prima sessione si sposta in
> `docs/archivio/`. Le regole valide restano in `CLAUDE.md`.

---

## 1. Chi è Fabio e come vuole lavorare

- Sviluppatore .NET in transizione verso il **full stack** con Angular e React. Ha **pochissima
  esperienza nel frontend**: lì va guidato di più e ogni scelta spiegata. Vive a Treviso. Ha già un
  progetto da portfolio, **Gestora** (React + .NET 9, su Azure + Vercel + Neon)
- Si parla **in italiano**, in modo **diretto e strutturato**: prima il quadro, poi i dettagli
- **Linguaggio semplice**: niente termini tecnici complessi senza spiegazione, niente tono da
  "senior che fa lezione". Il ragionamento si spiega, in breve
- Ruoli concordati: **Claude è la mente** (architettura, logica, codice), **Fabio è il braccio**
  (passaggi manuali, account, chiavi, commit, decisioni finali). Le logiche si ragionano insieme

## 2. Come è nato il progetto

Fabio si prepara al **GT3 Lavaredo** ad Auronzo di Cadore (data provvisoria 10/07/2027). Due gare
possibili:

| | Nuoto | Bici | Corsa |
|---|---|---|---|
| **Sprint Cross Country** | 1 km | 20 km MTB, 4 giri, 520 m D+ | 6 km |
| **Gravel Cross Triathlon Tre Cime** | 1 km | 26 km sterrato, circa 1000 m D+ fino a Misurina | 7,5 km, circa 600 m D+ fino al Rifugio Auronzo (2333 m) |

Per lui sono stati scritti due piani di allenamento su claude.ai (link in `CLAUDE.md` §9) e una
pagina «Oggi verso Lavaredo» con l'allenamento e il menu del giorno. Fabio segue il **piano Gravel**
fino alle prove di scelta: se le supera continua, altrimenti passa al **piano Sprint**. Questi
documenti fanno da ponte finché l'app non li sostituisce (v0.5).

Da lì l'idea: trasformare quel ragionamento in un'app per tutti → **Gym Me Coach**.

## 3. Cosa è già deciso

Tutto è nello **studio di fattibilità** (link in `CLAUDE.md` §9) e nel foglio *Decisioni* del
tracker. In breve:

- **Motore a regole** che crea il piano; l'AI spiega e propone, mai oltre i limiti del motore
- **Prima versione stretta**: triathlon (sprint, olimpico, cross); prima Fabio, poi beta su invito
- **Stack**: .NET 10 LTS, EF Core + PostgreSQL, Identity + JWT, Angular ultima stabile, PrimeNG,
  PWA, API di Claude solo dal backend
- **Azure** (App Service + Static Web Apps, «Azure subscription 1», regione europea). Railway è
  stato scartato
- **Tutto da zero**: nessun codice, componente o libreria dal vecchio progetto «Gym Me» (Angular 18
  + .NET 8 + SQLite), che Fabio rimuoverà
- **Cartella separata** da Gestora; Gestora solo con `--add-dir` quando serve
- **Nessuna app esterna collegata**. Verificato a ottobre 2026: il Garmin Connect Developer Program
  è in pausa dalla primavera 2026; la Strava API vieta l'uso dei dati con l'AI; i file FIT esportati
  a mano + FIT SDK funzionano (idea per la v2.0)

**Prese il 14/10/2026**: D2 solo triathlon, D3 prima Fabio poi beta su invito, D5 app in italiano
e codice in inglese, D8 database Neon in regione Europa, D9 repository pubblico. **Resta aperta**:
D6, il budget mensile del coach AI, da decidere in F7.

## 4. Il caso di prova n. 1 (atleta A = Fabio)

Il motore, in F3, deve rigenerare il piano di Fabio. Punto di partenza a ottobre 2026:

- **Nuoto**: non nuota ancora 1 km di fila; lavora a ripetute da 50 m (la sua seduta abituale:
  3×50 sciolti · 5×50 tecnica · 10×50 con 20" di pausa · 2×50 defaticamento)
- **Bici**: uscita più lunga 35 km a 20,6 km/h, su una MTB degli anni 2000. **Test Treviso-Ostiglia
  (ottobre 2026)**: 15,30 km in 42'24" a 21,6 km/h, frequenza cardiaca media 132 bpm, molta fatica
  alle gambe nei 20' di spinta. Pedali a doppio uso e
  scarpe Rockrider RACE 700. I 66 W sono solo una stima dell'orologio
- **Corsa**: 8,26 km a 5'26" al km
- **Dove si allena**: Treviso, in pianura e **senza rulli** → in fase 1 lavori di forza in pianura;
  test bici sulla ciclabile Treviso-Ostiglia
- **Orologio**: Garmin Forerunner 255 (le sedute si copiano a mano)
- **Tempo**: circa 9-10 ore di allenamento a settimana

Cosa contengono i piani (da ritrovare nel motore): fasi base → forza e base specifica → specifica
off-road / MTB → picco → scarico pre-gara, con settimane di scarico; progressione del nuoto dalle
ripetute da 50 m alla nuotata continua; prove di controllo; nel piano Gravel le **prove di scelta**
alle settimane 23, 30, 31 e 33; la regola del tipo di giorno (meno di 1 h = leggero, 1 h-1 h 30 =
medio, oltre 1 h 30 o brick = lungo) che decide il menu.

Le bozze di regole, livelli e sedute ricavate da questi piani sono già nei fogli `PE ·` del tracker.

## 5. Cosa fare nella prima sessione

1. Leggere `CLAUDE.md`, `BACKLOG.md` e questo file
2. Fare a Fabio un riassunto in 10 righe: stato, regole, prossimo passo. Se qualcosa non è chiaro,
   chiedere
3. Controllare con Fabio i task F0 rimasti (foglio *Task*) e chiudere la F0
4. Proporre come partire con la **F1 – Il motore su carta**, iniziando da `F1-T01` (scale dei
   livelli) e `F1-T02` (regole di sicurezza). In F1 **non si scrive codice**: si scrivono regole
5. Spostare questo file in `docs/archivio/` (Fabio fa il commit)

## 6. Prompt da incollare

Apri Claude Code dentro `Progetti_Tech\Personali\GymMeCoach` e incolla:

```
Ciao, questa è la prima sessione di Gym Me Coach. Leggi CLAUDE.md, BACKLOG.md e PASSAGGIO.md,
poi fammi un riassunto in 10 righe di stato, regole e prossimo passo. Non modificare nessun file
finché non ti do l'ok. Il tracker è TrackGymMeCoach.xlsx in questa cartella.
```
