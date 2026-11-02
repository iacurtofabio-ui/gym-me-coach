# Lezioni dal prototipo «Oggi verso Lavaredo»

> Scritto il 02/11/2026. Il prototipo è un artefatto di Claude usato da Fabio ogni giorno: serve a
> sperimentare, raccogliere feedback e ridurre i rischi prima di scrivere il codice vero.
> Questo documento dice cosa portare in Gym Me Coach, cosa rifare e cosa lasciare.
> Link: https://claude.ai/artifact/U4HKyFtdkXFDvGmoknsHny

---

## 1. Decisioni prese (02/11/2026)

| # | Decisione | Effetto |
|---|---|---|
| P1 | **Niente API ufficiali Garmin.** Non esiste un'API Garmin per Claude: ci sono solo connettori di terzi che chiedono la password Garmin. Non si usano nel prodotto | L'unico ingresso dei dati dell'orologio è il file `.fit` caricato dall'utente |
| P2 | **Il file `.fit` si legge sul telefono dell'utente.** Il file non lascia il dispositivo: al server va solo il riepilogo (durata, zone, fasi, test) | Lettura e analisi nel frontend; il backend riceve e salva solo il riepilogo |
| P3 | **L'esportazione verso Garmin è nel nucleo del prodotto** (allenamento `.fit` da mettere sull'orologio) | Va in F4, dopo che il motore produce sedute a fasi |
| P4 | **Il coach usa l'API di Claude, a carico di Fabio**, con la chiave solo sul server | Vedi §4 |

## 2. Da portare (idee validate dall'uso)

- **Oggi**: striscia dei sette giorni, «Oggi/Domani», seduta con i suoi passi.
- **Diario in 10 secondi**: Fatto / In parte / Saltato, fatica da 1 a 10, note.
- **Caricamento del `.fit`** con analisi automatica:
  - tempo in ogni zona;
  - percentuale «dentro zona» nella parte principale (senza riscaldamento, defaticamento e primi
    2 minuti, quando il battito sta ancora salendo);
  - confronto fase per fase con quello che chiedeva il piano;
  - punteggio di aderenza (oggi: 40% durata + 60% zona).
- **Test che si compilano da soli** (soglia bici 20', soglia corsa 30', test di partenza, di ritmo
  e di controllo del nuoto): aggiornano le zone dell'utente.
- **Parere del coach**: risposta strutturata (voto, titolo, sintesi, fino a 3 punti «bene», fino a
  3 «da migliorare», consiglio per la prossima seduta), con le regole del piano e gli ultimi 7 giorni
  nel prompt, linguaggio semplice, onesto ma gentile.
- **Progressi**: costanza, minuti previsti contro fatti, percentuale di tempo facile (obiettivo
  70-80%), tabella dei test.
- **Zone** per sport, con la colonna «Come ti senti».
- **Cibo**: tre tipi di giorno (leggero, medio, lungo) e orari rispetto all'allenamento.
- **Forza e core**: elenco esercizi con ripetizioni.
- **Esportazione verso Garmin** (P3): la seduta diventa un allenamento a fasi sull'orologio, con
  battiti obiettivo per fase.

## 3. Da rifare (l'idea è buona, la realizzazione no)

| Nel prototipo | In Gym Me Coach |
|---|---|
| Le fasi si ricavano da **testo libero con espressioni regolari** (circa 250 righe fragili) | Il motore produce **sedute già a fasi** (durata o distanza, zona, ripetizioni, recupero). Testo, file Garmin e confronto con l'attività sono viste degli stessi dati. È il guadagno più grande |
| Soglie fisse nel codice (bici 145, corsa 157) | **Zone per utente**, calcolate dai test: regola del motore con il suo test |
| Due piani fissi di 39 settimane e date scritte nel codice | Piano generato dalle 7 domande |
| Il coach riceve nome e città | Solo riepiloghi anonimi (regola 7) |
| Il coach parla da solo | Chiamata dal backend; le **proposte** di modifica passano dal motore |
| Diario nel database dell'artefatto | PostgreSQL. **Da verificare**: `schema-dati.md` (12 tabelle) deve avere dove mettere attività, tempi in zona, fasi, giri e test |
| Menu con grammi e kcal pensati per Fabio | Menu generici con l'avviso fisso (regola 6) |
| «Copia tutti i dati» in JSON | Esportazione dei dati personali dell'utente |
| Formula di aderenza nel codice della pagina | Regola scritta nel documento delle regole, con test |

## 4. Il coach con molti utenti

- **Chi paga**: l'account sviluppatore (Console Anthropic) di Fabio. Nel prototipo il coach consuma
  la quota claude.ai di chi apre la pagina: non è replicabile. Gli abbonamenti Pro e Max sono un
  servizio diverso dall'API e non servono per altri utenti.
- **Dove sta la chiave**: solo sul server (variabile d'ambiente di Azure), mai nel frontend.
- **Controllo dei costi** (decisione `D6`, in F7): limite di spesa mensile nella Console, modello
  economico per i pareri brevi, tetto di richieste al giorno per utente, risposta salvata e non
  rigenerata, coach attivato dall'utente o da eventi precisi.
- **Quando interviene**: dopo un'attività, nella revisione settimanale, su domanda libera.
- **Cosa legge**: un riepilogo anonimo. **Cosa può fare**: spiegare e consigliare. **Cosa non può
  fare**: superare i limiti di sicurezza, dare consigli medici, scrivere piani, cambiare il piano
  senza passare dal motore e dall'approvazione dell'utente.
- **Non adottato**: chiave propria di ogni utente (troppo complesso); abbonamento a pagamento (si
  riconsidera se il progetto cresce).

## 5. Cosa il piano attuale non prevedeva

1. Un modulo **Attività** (lettura e analisi del `.fit` sul telefono, riepilogo al server).
2. I **test** come elemento a sé: servono al motore per aggiornare le zone.
3. L'**esportazione verso Garmin** (P3).
4. Il **parere dopo ogni attività**, oltre alla revisione settimanale.
5. La schermata **Oggi** è molto più ricca (seduta, attività, coach, diario): la regola «massimo
   2 tocchi da Oggi» va riverificata.

## 6. Dove va ogni cosa (proposta, da confermare nel tracker)

| Fase | Cosa si aggiunge |
|---|---|
| F1 (riapertura) | Aggiornare `schema-dati.md` (attività, fasi, test, zone per utente) e `regole-del-motore.md` (sedute a fasi, zone dai test, aderenza) |
| F3 | Il motore produce sedute a fasi; zone calcolate dai test |
| F4 | Oggi, Piano, **esportazione verso Garmin** |
| F5 | Diario, **caricamento e analisi del `.fit`**, test automatici, progressi |
| F6 | Alimentazione (menu generici con avviso) |
| F7 | Coach (API di Claude, `D6`) |

## 7. Rischi da tenere d'occhio

- **R5 (perimetro)**: il prototipo ha più funzioni di quante ne servano alla v0.1. Ogni funzione
  entra nella fase indicata sopra e non prima.
- **Lettura del `.fit`**: il formato ha varianti tra orologi (per esempio i battiti obiettivo salvati
  con +100 o senza). Servono file di prova di più modelli, anonimi, e test dedicati.
- **Dati sulla salute**: il riepilogo dell'attività resta un dato personale; vale la regola 7 anche
  per i file di prova (nessun file reale di terzi nel repository pubblico).
