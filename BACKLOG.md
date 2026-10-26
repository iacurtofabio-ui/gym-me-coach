# Gym Me Coach — Backlog

> Cosa resta da fare, fase per fase. Il dettaglio di ogni attività (`Fx-Tnn`) è nel foglio *Task*
> di `TrackGymMeCoach.xlsx`; qui c'è solo il quadro.
> Aggiornato al 20/10/2026 (F0 e F1 chiuse, F2 in corso).

---

## Fasi

| Fase | Cosa | Date (indicative) | Si chiude quando | Versione | Stato |
|---|---|---|---|---|---|
| **F0** | Decisioni e fondamenta | 19/10 – 25/10/2026 (iniziata il 13/10) | Tracker e repository pronti | – | **Chiusa il 20/10/2026** |
| F1 | Il motore su carta | 26/10 – 08/11/2026 | Documento delle regole approvato | – | **Chiusa il 19/10/2026** |
| F2 | Base tecnica | 09/11 – 22/11/2026 | Login funzionante online | – | **In corso** (T01, T02, T03, T04, T05 fatti) |
| F3 | Motore in codice | 23/11 – 06/12/2026 | Il motore rigenera il piano di Fabio | v0.1 | Da fare |
| F4 | Configurazione, Oggi, Piano | 07/12 – 20/12/2026 | Fabio si allena seguendo l'app | – | Da fare |
| – | Pausa feste | 21/12/2026 – 03/01/2027 | – | – | – |
| F5 | Diario, adattamento, progressi | 04/01 – 17/01/2027 | Fabio vede i suoi progressi reali | v0.5 | Da fare |
| F6 | Alimentazione | 18/01 – 24/01/2027 | La spesa si fa con l'app | – | Da fare |
| F7 | Coach AI | 25/01 – 07/02/2027 | Prima revisione settimanale vera | – | Da fare |
| F8 | Privacy, rifinitura, portfolio | 08/02 – 21/02/2027 | Demo pubblica pronta | v1.0 | Da fare |

## F0 — chiusa

Chiusa il 20/10/2026, con la rimozione del vecchio Gym Me (`F0-T11`). Decisioni del 14/10/2026:
D2, D3, D5, D8 (Neon), D9 (pubblico). Resta D6, da decidere in F7.

## F1 — chiusa

Documento delle regole approvato il 19/10/2026: `docs/regole-del-motore.md` (con `docs/schema-dati.md`
e `docs/casi-di-prova.md`). Le date delle fasi successive sono indicative: si è in anticipo di circa
tre settimane.

## F2 — in corso

`F2-T01` fatto (20/10/2026): Angular 22.2.3, PrimeNG 22.1.2, .NET 10.0.402. `F2-T02` fatto
(20/10/2026): soluzione .NET con `/health`. `F2-T04` fatto (20/10/2026): database locale con le tabelle di Identity. `F2-T05` fatto (22/10/2026): registrazione, login e `/me` con Identity + JWT, ruoli Utente e Admin; provato in locale. `F2-T03` fatto (26/10/2026): frontend Angular + PrimeNG + PWA, con le 5 schermate vuote e il menu; build e test ok. `F2-T08` (risorse Azure, Fabio) può partire quando vuole.

## Segnalazioni dall'uso

Quando l'app sarà in uso (dalla v0.5), qui si annotano problemi e richieste così come arrivano;
poi diventano task o righe di *Fix e Bug*.

_Nessuna per ora._

## Idee per dopo

Non si annotano qui: vanno nel foglio *Idee per dopo* del tracker, così il lavoro in corso resta
fermo sul perimetro della versione (rischio R5).

## Rischi accettati

_Nessuno per ora._
