# Gym Me Coach

> **Documento di ingresso del progetto.** Si legge a inizio di ogni sessione.
> Cosa è aperto → `BACKLOG.md` e foglio *Task* del tracker

---

## 1. Stato — aggiornato al 19/10/2026

**Fase F1 chiusa** (il motore su carta); la F0 è quasi chiusa (resta solo `F0-T11`). **Non c'è
ancora codice**: in questa cartella ci sono i documenti, il tracker e le regole del motore approvate.

| | |
|---|---|
| Repository | `gym-me-coach` su GitHub, **pubblico**, creato; ramo `dev` con il primo commit |
| Ramo di lavoro | `dev`; `main` riceve solo le versioni stabili |
| Backend / Frontend / Database | nessuno ancora: si creano in F2 (database di produzione: Neon, regione Europa) |
| Test | 0 |
| Prossima versione | **v0.1 – Motore**, fine F3 (circa 06/12/2026) |

**Ultima cosa fatta** (19/10/2026): chiusa la F1. Approvate le scale dei livelli (nuoto, bici,
corsa), 32 regole su 34 (sicurezza, fattibilità, fasi, settimana, adattamento; restano in bozza
solo `ALI-02` e `ALI-03`, per la F6), la libreria di 26 sedute modello, lo schema dei dati (12
tabelle) e 12 casi di prova. Tutto raccolto in `docs/regole-del-motore.md`. Prima (stesso giorno):
primo commit su `dev` e strumenti verificati. Prima (14/10/2026): avvio della F0 e decisioni D2,
D3, D5, D8, D9 (resta D6, da decidere in F7). Prima ancora (13/10/2026): studio di fattibilità e
piano di attacco.

**Prossimo passo**: la **F2 – Base tecnica**, che inizia con `F2-T01` (fissare le versioni).
Si è in anticipo di circa tre settimane sul calendario. In parallelo Fabio può preparare `F2-T08`
(risorse Azure) e, quando vuole, `F0-T11` (rimuovere il vecchio Gym Me). Dalla F2 si scrive
codice: aprire una sessione nuova.

---

## 2. Cos'è Gym Me Coach

App web per chi si allena per una gara di **triathlon** (sprint, olimpico, cross). Fa quattro cose:

1. **Crea un piano personalizzato** partendo da 7 domande (obiettivo, livello, tempo,
   attrezzatura, salute, alimentazione, data della gara)
2. **Dice cosa fare oggi** e raccoglie in 10 secondi com'è andata (fatto/saltato, durata, fatica)
3. **Adatta il piano** ogni settimana e mostra i **progressi** con pochi grafici semplici
4. Ha un **coach AI** che spiega le sedute e propone modifiche, e una sezione **alimentazione** con
   menu di esempio e lista della spesa

È pensata **per molti utenti fin dall'inizio, ma aperta prima a pochi**: prima Fabio, poi una beta
su invito, il pubblico solo dopo la verifica privacy. Il primo utente è Fabio, che si prepara al
**GT3 Lavaredo** (10/07/2027): il suo piano è il caso di prova del motore.

È anche un **progetto da portfolio**, accanto a Gestora (React): insieme coprono Angular e React.

### Il principio che regge tutto

**Il motore decide, l'AI spiega e consiglia, l'utente approva.**

Il piano lo calcola un motore a regole (`PlanEngine`): stesse risposte → stesso piano, sempre, e
ogni regola ha il suo test. Il coach AI non scrive piani: legge un riepilogo, spiega e propone;
ogni proposta passa dalle regole del motore prima di arrivare all'utente.

---

## 3. Com'è fatto (previsto, si costruisce dalla F2)

### Struttura prevista

```
GymMeCoach/
├── src/
│   ├── GymMeCoach.Api/          backend ASP.NET Core (.NET 10), API REST
│   ├── GymMeCoach.PlanEngine/   il motore: libreria senza database né web
│   └── gym-me-coach-web/        frontend Angular + PrimeNG (PWA)
├── tests/
│   ├── GymMeCoach.Api.Tests/
│   └── GymMeCoach.PlanEngine.Tests/
├── docs/                        regole-del-motore.md, schema-dati.md, casi-di-prova.md
│   └── archivio/                documenti chiusi
├── GymMeCoach.sln
├── CLAUDE.md                    questo file
├── BACKLOG.md                   cosa resta da fare
├── README.md                    presentazione pubblica (in inglese)
└── TrackGymMeCoach.xlsx         il tracker (solo locale, non versionato)
```

I nomi esatti si confermano in F2. In radice stanno solo i documenti vivi: appunti personali,
credenziali e backup **non vanno in questa cartella**, nemmeno ignorati da Git.

### Stack

- **Backend**: ASP.NET Core su **.NET 10 LTS** (supportato fino al 14/11/2028), EF Core +
  PostgreSQL, ASP.NET Identity + JWT (ruoli Utente e Admin), FluentValidation, Serilog, xUnit
- **Motore**: libreria .NET separata `PlanEngine`, testata da sola con xUnit
- **Frontend**: **Angular** all'ultima versione stabile al momento dello scaffold (componenti
  standalone, signals), **PrimeNG** nella versione allineata (con PrimeIcons e Chart), **PWA**
  installabile sulla Home dell'iPhone
- **Coach AI**: modulo del backend che chiama l'**API di Claude**. La chiave sta solo sul server; al
  coach arrivano solo dati anonimi
- **Pubblicazione**: Azure, sottoscrizione «Azure subscription 1», regione europea: App Web su App
  Service (backend), Static Web Apps (frontend). Database di produzione: **Neon** (PostgreSQL), regione
  Europa (`D8`)

### Moduli del backend

Utenti e accesso · Configurazione · Motore dei piani · Diario · Progressi · Alimentazione · Coach.
Configurazione, Diario e Coach passano tutti dal motore.

### Le schermate

Cinque principali, sempre a un tocco (barra in basso su iPhone, laterale su PC): **Oggi**, **Piano**,
**Progressi**, **Alimentazione**, **Coach**. Più **Profilo** (dal menu) e la **configurazione
iniziale** (una volta sola). Ogni azione frequente in massimo 2 tocchi da Oggi; parole di chi si
allena («Fatto», «Saltato», «Fatica»), mai termini tecnici senza spiegazione.

---

## 4. Come lavoriamo

### Chi fa cosa

| Chi | Cosa |
|---|---|
| **Claude** (la mente) | Architettura, logica del motore, codice, revisione, test, documentazione tecnica |
| **Fabio** (il braccio) | Lancia le sessioni, prova l'app sul telefono, crea account e risorse (GitHub, Azure, chiave Claude API), gestisce chiavi e costi, fa commit e push, prende le decisioni finali |
| **Insieme** | Regole del motore, domande della configurazione, schermate, priorità di ogni fase |

Quindi, di base, **il codice lo scrive Claude**. Prima di toccare i file di un task, Claude:
- dice cosa farà, dove e **perché**, in parole semplici
- segnala le conseguenze sulle altre parti del progetto
- poi implementa, verifica (build e test) e dice chiaramente cosa ha cambiato

Se per un task Fabio vuole scriverlo lui per imparare, lo dice: Claude allora guida a piccoli passi
e non modifica il codice al suo posto. La scelta si vede nella colonna *Assegnato a* del foglio
*Task*.

### Il ritmo

- Si lavora per **fasi** (F0-F8, foglio *Roadmap*) e dentro le fasi per **task** `Fx-Tnn`
- Ogni fase chiude con qualcosa di usabile o verificabile
- **Una cosa alla volta**: le idee nuove non entrano nel lavoro in corso, vanno nel foglio
  *Idee per dopo* (rischio R5)
- Le regole del motore si scrivono e si approvano **prima** del codice (F1), poi diventano codice
  e test (F3)

### Versioni

v0.1 Motore → v0.5 Uso personale → v1.0 MVP → v1.1 Apertura → v2.0 Futuro (foglio *Versioni*).
Numerazione `v0.1.0`: il secondo numero per le funzioni nuove, il terzo per le correzioni. Ogni
versione ha il suo changelog e la sua riga nel tracker. **Niente pubblicazione se un test fallisce.**

---

## 5. Decisioni di prodotto

Valgono finché una richiesta non le riapre; se succede, si decide insieme e la nuova regola si
scrive qui, al posto della vecchia. Le decisioni ancora aperte sono nel foglio *Decisioni*.

1. **Tutto da zero** (`D1`): repository nuovo `gym-me-coach`. Nessun componente, libreria o codice
   dal vecchio Gym Me, che verrà rimosso
2. **Azure** (`D4`): App Web su App Service + Static Web Apps, regione europea. Railway scartato
3. **Claude Code sul PC** (`D7`): cartella `Progetti_Tech/Personali/GymMeCoach`, separata da
   Gestora. Gestora si aggiunge solo quando serve, con `--add-dir`, e il suo CLAUDE.md non si carica
4. **Nessuna app esterna collegata**: i dati li inserisce l'utente. L'unico servizio esterno è
   l'API di Claude, per il coach
5. **La sicurezza è una regola del motore**: questionario di idoneità, solo maggiorenni, limiti
   fissi di crescita, scarico obbligatorio. Nessuno, nemmeno il coach AI, può superarli
6. **L'alimentazione è un esempio**: avviso fisso che non sostituisce un nutrizionista
7. **Solo triathlon nella prima versione** (`D2`): sprint, olimpico, cross. Gli altri sport dopo,
   con lo stesso motore
8. **Aperta prima a pochi** (`D3`): prima Fabio, poi beta su invito; pubblico solo dopo la verifica
   privacy
9. **Lingua** (`D5`): app in italiano con l'inglese predisposto; codice, commenti e README in
   inglese. I documenti di lavoro (questo file, BACKLOG, tracker) restano in italiano
10. **Database di produzione: Neon** (`D8`), PostgreSQL in regione Europa (Francoforte)
11. **Repository pubblico da subito** (`D9`): per questo la regola 6 del §7 sui segreti è ancora
    più importante

Ancora da decidere: `D6`, il budget mensile massimo del coach AI, in F7 (task `F7-T01`).

---

## 6. Cosa è aperto

Le fasi e il loro stato sono in **`BACKLOG.md`**; il dettaglio di ogni attività nel foglio
**Task** del tracker, i difetti nel foglio **Fix e Bug**.

---

## 7. Regole non negoziabili del progetto

1. **Commit e push li fa sempre Fabio, mai Claude.** Claude fornisce il messaggio con l'elenco delle
   modifiche. Formato: `feat: descrizione` oppure `feat: WIP - descrizione` se incompleto (`fix:`,
   `docs:`, `chore:`, `refactor:`, `test:` per gli altri tipi)
2. **La produzione non si tocca in autonomia.** Database, variabili d'ambiente, pubblicazioni: Claude
   prepara le istruzioni, Fabio le esegue
3. **Operazioni delicate** (`.env`, `.gitignore`, credenziali, variabili d'ambiente, rimozione di file
   dal tracciamento Git): Claude spiega cosa succede e perché, poi passa le istruzioni a Fabio
4. **Controllare il ramo** a inizio di ogni blocco di modifiche: si lavora su **`dev`**, mai
   direttamente su `main`
5. **Comandi PowerShell su una riga sola**
6. **Mai segreti nel codice, nel tracker o nei documenti**: in locale User Secrets, in produzione le
   variabili d'ambiente di Azure. Il tracker riporta solo i nomi delle chiavi
7. **Dati sulla salute**: nei dati demo solo persone inventate; nei test persone inventate oppure il
   caso di Fabio, senza nome («atleta A»). Al coach AI solo riepiloghi anonimi
8. **Niente dal vecchio Gym Me e niente modifiche a Gestora**: Gestora si consulta in sola lettura

---

## 8. Il tracker

**`TrackGymMeCoach.xlsx`**, in questa cartella, è il tracker unico e ufficiale. **Solo locale**: è
nel `.gitignore`, quindi va salvato a parte. Aggiornamento manuale, come quello di Gestora.

- **Dashboard**: indice cliccabile, conteggi automatici, avanzamento per fase, ambienti, stack
- **Manuali**: *Appunti e Step* (diario), *Fix e Bug* (difetti `BUG-001`…), *Task* (attività
  `Fx-Tnn` con categoria, dipendenze, criteri di accettazione e stato)
- **Progetto**: *Roadmap*, *Versioni*, *Decisioni*, *Rischi*, *Idee per dopo*
- **Motore** (`PE ·`): *Regole*, *Livelli*, *Sedute* — lo stato di ogni regola va da *Bozza* ad
  *Approvata*, *In codice*, *Testata*
- **Backend** (`BE ·`) e **Frontend** (`FE ·`): come in Gestora; si compilano quando il codice esiste.
  Quando il codice cambia (un endpoint, un test, una migration) va aggiornato il foglio
  corrispondente

**Lo Stato** (come in Gestora): una cosa da fare è aperta in **un solo posto**, il foglio *Task*
(*Da fare*, *In corso*, *In revisione*, *Fatto*, *Bloccato*). *Fix e Bug*: *Risolto* quando
corretto e verificato. *Appunti e Step*: la riga è *Fatto*, quello che resta sta in «Prossimo
passo». **Date** scritte via script nel formato `2026-10-14`.

---

## 9. Dove sta cosa

| Cerchi... | Vai in... |
|---|---|
| Stato, regole di lavoro, decisioni | questo file |
| Fasi e cosa resta da fare | `BACKLOG.md` |
| Le regole del motore, con le motivazioni | `docs/regole-del-motore.md` |
| Le tabelle del database | `docs/schema-dati.md` |
| I casi di prova (diventano i test del motore in F3) | `docs/casi-di-prova.md` |
| Contesto della prima sessione (chiuso) | `docs/archivio/PASSAGGIO.md` |
| Task, decisioni, rischi, regole del motore, mappa del codice | `TrackGymMeCoach.xlsx` (solo locale) |
| Come si avvia, si fa una migration, si pubblica | `RUNBOOK.md` (da creare in F2) |
| Studio di fattibilità e piano di attacco | https://claude.ai/code/artifact/90d4f3e1-298f-45ba-a976-fc44ec948ce0 |
| Piani di allenamento attuali (ponte fino all'app) | Gravel: https://claude.ai/code/artifact/918fb186-3b71-43d1-b1b6-edeae01feeaa · Sprint: https://claude.ai/code/artifact/544dbb70-8ccb-4724-943c-d07f8a8f2df3 |
| Gestora, per consultare login e pubblicazione su Azure | `Progetti_Tech/Personali/Gestora`, solo con `--add-dir` |
