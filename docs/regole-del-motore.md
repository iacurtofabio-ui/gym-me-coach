# Gym Me Coach — Regole del motore

> Documento unico delle regole del `PlanEngine`, scritto in F1 (task `F1-T10`). Le fonti di verità
> restano i fogli `PE ·` del tracker; questo file è la loro fotografia leggibile del 19/10/2026.
> In F3 ogni regola diventa codice e ogni caso di `docs/casi-di-prova.md` diventa un test.

## Il principio

**Il motore decide, l'AI spiega e consiglia, l'utente approva.** Stesse risposte → stesso piano,
sempre. Nessuna regola di sicurezza (`SIC-`) può essere superata, nemmeno dal coach AI.

## Come funziona, in breve

1. **Sicurezza** (`SIC-`): l'app parte solo per maggiorenni idonei, con limiti fissi di crescita.
2. **Livelli** (`LIV-`): per nuoto, bici e corsa c'è una scala; si sale superando una prova.
3. **Fattibilità** (`FAT-`): si confrontano livelli, gara e settimane disponibili e si dà un verdetto.
4. **Fasi** (`FAS-`): le settimane si dividono in base, forza, specifica, picco e scarico.
5. **Settimana** (`SET-`): le sedute si dispongono nei giorni disponibili con regole fisse.
6. **Sedute**: ogni seduta nasce da un modello della libreria, di cui il motore regola i parametri.
7. **Adattamento** (`ADA-`): sedute saltate, fatica, test e prove cambiano il piano.
8. **Alimentazione** (`ALI-`): il tipo di giornata decide il menu di esempio.

Stato delle regole: tutte **Approvate**, tranne `ALI-02` e `ALI-03`, che restano in bozza fino alla
F6 (sezione alimentazione).

## 1. Le regole

### Sicurezza (SIC)

**SIC-01** — Solo maggiorenni

- *Valore*: età ≥ 18, altrimenti il piano non parte
- *Perché*: Dati sulla salute e responsabilità
- *Fonte*: Studio · R1

**SIC-02** — Questionario di idoneità: con un solo «sì» il piano non parte e l'app dice «senti prima un medico». L'utente può proseguire solo dichiarando di avere il via libera del medico. Domande: dolore al petto; svenimenti o forti vertigini; problema cardiaco o pressione alta diagnosticati; problema a ossa o articolazioni che peggiora con l'attività; sport sconsigliato dal medico

- *Valore*: un solo «sì» blocca (5 domande)
- *Perché*: Il rischio più serio è un piano che fa male. È un'autodichiarazione: l'app non è un dispositivo medico (avviso fisso, promemoria sul certificato medico per le gare)
- *Fonte*: Studio · R1 + F1-T02

**SIC-03** — Crescita del volume settimanale limitata

- *Valore*: corsa +10%, bici +15%, nuoto +15%, totale ore +10% a settimana
- *Perché*: Gli infortuni nascono dagli aumenti bruschi
- *Fonte*: Studio · R1 + F1-T02

**SIC-04** — Settimane di scarico obbligatorie

- *Valore*: 1 ogni 3 di carico, volume −30%
- *Perché*: Recupero e assimilazione del carico
- *Fonte*: Studio · R1 + F1-T02

**SIC-05** — Le proposte del coach AI passano dalle stesse regole: quelle fuori limite vengono scartate

- *Perché*: Il motore decide, l'AI spiega e consiglia, l'utente approva
- *Fonte*: Studio · Il cuore dell'app

**SIC-06** — Il coach AI non dà consigli medici: niente diagnosi, farmaci, integratori o diete dimagranti. Se l'utente parla di sintomi, lo rimanda al medico

- *Perché*: Il coach non è un medico né un nutrizionista
- *Fonte*: F1-T02

**SIC-07** — Almeno 1 giorno di riposo completo a settimana

- *Valore*: 1 giorno
- *Perché*: Recupero minimo
- *Fonte*: F1-T02

**SIC-08** — Dolore segnalato nel diario: le sedute dello stesso tipo si sospendono e l'app consiglia il medico se dura

- *Valore*: dolore ≥ 1 giorno
- *Perché*: Non allenare su un dolore
- *Fonte*: F1-T02

### Livelli (LIV)

**LIV-01** — Si parte dal livello dichiarato nella configurazione e si sale di un gradino solo superando la prova di controllo

- *Valore*: un gradino alla volta
- *Perché*: Niente salti: la prova dimostra che il gradino è stato assorbito
- *Fonte*: Studio · Il calcolo

### Fattibilità (FAT)

**FAT-01** — Ogni gara ha un livello richiesto per ogni disciplina. Sprint Cross (1 km / 20 km MTB / 6 km): N5, B3, C4. Gravel (1 km / 26 km con 1000 m D+ / 7,5 km con 600 m D+): N5, B4, C5. Sprint su strada e olimpico: da compilare in F1-T05

- *Valore*: Sprint Cross N5-B3-C4 · Gravel N5-B4-C5
- *Perché*: Il livello richiesto dice cosa serve per finire la gara bene
- *Fonte*: Piano Gravel · prove di scelta

**FAT-02** — Settimane necessarie per disciplina = gradini mancanti (livello richiesto − livello attuale) × settimane per gradino. Le discipline si allenano in parallelo: conta la più lunga

- *Valore*: nuoto 4, bici 6, corsa 6 settimane per gradino
- *Perché*: Nuoto: dal piano Gravel (da 50 m a 1000 m in 16 settimane). Bici e corsa: ipotesi da verificare
- *Fonte*: Piano Gravel + F1-T03

**FAT-03** — Alle settimane della disciplina più lunga si aggiungono quelle del lavoro specifico della gara (specifica, picco, scarico e gara)

- *Valore*: Sprint Cross +11, Gravel +15 settimane
- *Perché*: Il livello da solo non basta: per la Gravel servono dislivello, trail e acque libere. Gravel +15 dal piano (specifica 10 + 5). Sprint Cross +11 è un'ipotesi: i piani Sprint e Gravel usano entrambi 10 settimane di specifica perché hanno tempo, il minimo reale è da verificare
- *Fonte*: Piano Gravel (fasi 3-5)

**FAT-04** — Margine = settimane disponibili − settimane necessarie. Verdetto: «Fattibile», «Fattibile, con prove di controllo», «Tirata», «Non fattibile»

- *Valore*: ≥ 10 fattibile · 4-9 con prove di controllo · 0-3 tirata · < 0 non fattibile
- *Perché*: Soglie tarate sul verdetto a mano di Fabio (Sprint 11 sett., Gravel 7 sett.); da verificare con altri casi
- *Fonte*: F1-T03

**FAT-05** — Se la gara è «tirata» o «non fattibile» l'app propone una gara più corta (Gravel → Sprint), ma solo se il suo verdetto sulla data scelta non è «non fattibile», oppure una data più lontana

- *Valore*: data più lontana = settimane necessarie + 4 di margine
- *Perché*: L'utente sceglie; il motore non cambia gara da solo. Non si propone una gara più corta che sarebbe comunque non fattibile (caso C04)
- *Fonte*: Studio · Il calcolo + F1-T03

### Fasi (FAS)

**FAS-01** — Le ultime 5 settimane sono fisse: picco 3 + scarico pre-gara 1 + settimana gara 1. Le altre (disponibili − 5) si dividono tra base, forza e specifica in proporzione 12 : 12 : 10. La specifica arrotonda; il resto va a metà tra base e forza, con la settimana dispari alla base. La specifica non scende sotto il minimo di FAT-03

- *Valore*: proporzione 12 : 12 : 10; ultime 5 settimane fisse
- *Perché*: Con 39 settimane ridà le fasi dei piani Lavaredo (12/12/10/3/2); con 38: 12/11/10/3/2
- *Fonte*: Piani Lavaredo (Gravel e Sprint hanno le stesse fasi) + F1-T04

**FAS-02** — Ciclo di carico: lo scarico cade ogni 4ª settimana (4, 8, 12…), con volume −35% (mai meno di −30%, vedi SIC-04) e sedute solo in Z1-Z2

- *Valore*: 3 carico + 1 scarico; scarico −35%
- *Perché*: Come nei piani Lavaredo
- *Fonte*: Piani Lavaredo + F1-T04

**FAS-03** — Eccezioni al ciclo: se l'utente segnala feste o viaggio, lo scarico si sposta su quella settimana quando cade entro 2 settimane prima dello scarico previsto, e il ciclo 3 + 1 riparte da lì; mai più di 4 settimane di carico di fila. L'ultima settimana della specifica è sempre di scarico. Il picco non ha scarico. Lo scarico pre-gara è −40%

- *Valore*: anticipo fino a 2 settimane; max 4 settimane di carico di fila; scarico pre-gara −40%
- *Perché*: Nel piano Gravel lo scarico è alla settimana 11 (feste) e alla 34 (dopo la simulazione). Partendo il 19/10 la settimana di Natale è la 10 e gli scarichi cadono alle settimane 4, 8, 10, 14, 18, 22, 26, 30 e 33 (caso C01)
- *Fonte*: Piano Gravel + F1-T04

**FAS-04** — Le ore settimanali crescono dalle ore attuali a quelle dichiarate, al massimo +10% a settimana (SIC-03). Il picco è alle ore dichiarate

- *Valore*: +10% a settimana al massimo
- *Perché*: I piani Lavaredo passano da circa 5 a circa 10 ore
- *Fonte*: Piani Lavaredo + F1-T04

### Settimana (SET)

**SET-01** — Mai due sedute dure di fila. «Dura» = oltre 20' in Z4-Z5 in totale, oppure brick, simulazione, test o gara. Una seduta lunga in Z2 non è dura

- *Valore*: soglia 20' in Z4-Z5
- *Perché*: Recupero tra le sedute intense. La soglia è un'ipotesi: da verificare in F3 sulle 39 settimane del piano Gravel
- *Fonte*: Piani Lavaredo + F1-T05

**SET-02** — L'utente sceglie 1 o 2 giorni lunghi. Con 2: bici lunga nel primo, corsa lunga nel secondo. Con 1: bici lunga e corsa lunga si alternano di settimana in settimana

- *Valore*: giorni dalla domanda 4
- *Perché*: Di solito il weekend, quando c'è tempo
- *Fonte*: Piani Lavaredo + F1-T05

**SET-03** — Nuoto solo nei giorni di piscina, 2 sedute a settimana non consecutive. Con 1 solo giorno di piscina il nuoto avanza a metà velocità: i gradini del nuoto contano 8 settimane invece di 4 (FAT-02)

- *Valore*: giorni dalla domanda 4
- *Perché*: Vincolo pratico. Il raddoppio con 1 solo giorno è un'ipotesi
- *Fonte*: Piani Lavaredo + F1-T05

**SET-04** — Si propongono solo sedute possibili con l'attrezzatura dichiarata (rulli, salite, piscina): quelle impossibili si sostituiscono

- *Valore*: risposte della domanda 5
- *Perché*: Es. a Treviso senza rulli e senza salite: lavori di forza in pianura al posto delle salite
- *Fonte*: Studio + Piano Gravel (box Treviso)

**SET-05** — Una seduta al giorno. I giorni di seduta sono i giorni disponibili meno 1 di riposo completo (SIC-07): se i giorni sono 7, uno è di riposo

- *Valore*: 1 seduta al giorno
- *Perché*: Recupero minimo e settimana semplice da seguire
- *Fonte*: Piani Lavaredo + F1-T05

**SET-06** — Posizionamento: forza dopo la corsa, core dopo il nuoto. Sedute della stessa disciplina non in giorni consecutivi, tranne bici lunga + corsa lunga nel weekend. Con meno di 6 giorni si tolgono prima forza e core, poi la corsa media, poi la bici media; nuoto e lunghi restano sempre

- *Valore*: priorità: nuoto e lunghi > corsa media > bici media > forza e core
- *Perché*: Ridà la settimana tipo dei piani Lavaredo
- *Fonte*: Piani Lavaredo + F1-T05

### Adattamento (ADA)

**ADA-01** — Se salti 2 o più sedute nella settimana (salvo malattia, viaggio o dolore dichiarati) la settimana si ripete invece di andare avanti. Le sedute saltate non si recuperano. La settimana ripetuta non aumenta il volume (SIC-03). Ogni ripetizione consuma il margine di FAT-04: il verdetto si ricalcola e, se scende sotto 0, l'app propone le alternative di FAT-05. Dopo 2 ripetizioni di fila il piano si rigenera dalla settimana corrente con le ore realmente fatte (nuova versione del piano). Le settimane che restano si ridistribuiscono tra le fasi con FAS-01

- *Valore*: ≥ 2 saltate; al massimo 2 ripetizioni di fila, poi nuovo piano
- *Perché*: Non accumulare carico mai fatto
- *Fonte*: Studio · L'adattamento + F1-T07

**ADA-02** — Fatica media alta per due settimane di fila (media delle sedute fatte): la settimana dopo diventa di scarico e il ciclo 3 + 1 riparte da lì

- *Valore*: media > 8 per 2 settimane
- *Perché*: Segnale di sovraccarico
- *Fonte*: Studio · L'adattamento + F1-T07

**ADA-03** — Dopo un test le zone si aggiornano col risultato più recente: corsa = media degli ultimi 20' del test da 30'; bici = frequenza media × 0,95; nuoto = (tempo 400 − tempo 200) ÷ 2. Se il test peggiora di oltre il 5%, le zone non cambiano e il test si ripete dopo una settimana

- *Valore*: peggioramento > 5%
- *Perché*: Le zone seguono la forma reale; un test brutto è spesso stanchezza o malattia
- *Fonte*: Studio · L'adattamento + Piano Gravel

**ADA-04** — Prova di controllo superata → si sale di livello; non superata → avviso e alternative

- *Perché*: Nel piano Gravel: prove di scelta alle settimane 23, 30, 31 e 33
- *Fonte*: Studio + Piano Gravel

**ADA-05** — I test cadono nelle settimane di scarico: il primo alla settimana 1, poi ogni 4 settimane a partire dalla 8. Nessun test nelle ultime 8 settimane prima della gara

- *Valore*: ogni 4 settimane, non nelle ultime 8
- *Perché*: Test da riposati sono affidabili; vicino alla gara non vanno fatti
- *Fonte*: Piano Gravel (test alle settimane 1, 8, 12, 16, 20, 24, 28) + F1-T07

**ADA-06** — Prova di controllo non superata: si ripetono le ultime 2 settimane di carico e si riprova. Alla seconda prova non superata di fila l'app propone di rivedere l'obiettivo (ricalcolo di FAT-04)

- *Valore*: 2 settimane; 2 fallimenti = revisione
- *Perché*: Il piano a mano ripete 1 o 2 settimane a seconda del caso: qui sempre 2, più semplice e prudente
- *Fonte*: Piano Gravel + F1-T07

**ADA-07** — Se più regole scattano insieme prevale la più prudente, in quest'ordine: sicurezza (SIC-) > scarico anticipato (ADA-02) > settimana ripetuta (ADA-01) > salita di livello (ADA-04) > aggiornamento zone (ADA-03)

- *Valore*: ordine di priorità
- *Perché*: Evita che due adattamenti si contraddicano
- *Fonte*: F1-T07

### Alimentazione (ALI)

**ALI-01** — Tipo di giornata dalla seduta del giorno

- *Valore*: meno di 1 h = leggero; da 1 h a 1 h 30 = medio; oltre 1 h 30 o brick = lungo
- *Perché*: Decide il menu del giorno
- *Fonte*: Piani Lavaredo («Come capire che giorno è»)

**ALI-02** _(Bozza)_ — Orari dei pasti rispetto all'allenamento (mattina, pausa pranzo, sera, lungo)

- *Valore*: es. allenamento la sera: pranzo almeno 3 h prima, merenda 1 h prima, cena entro 1 h dopo
- *Perché*: Energia prima, recupero dopo
- *Fonte*: Pagina «Oggi verso Lavaredo»

**ALI-03** _(Bozza)_ — Avviso fisso: è un esempio indicativo, non sostituisce un nutrizionista

- *Valore*: sempre visibile
- *Perché*: Richiesta di Fabio e tutela dell'utente
- *Fonte*: Studio · Le tue richieste

## 2. Le scale dei livelli

Si parte dal livello dichiarato (`LIV-01`) e si sale di un gradino superando la prova. Regola comune: la prova è superata se la seduta è completata con fatica ≤ 6 su 10; se non riesce, vale `ADA-06`.

### Nuoto

| Livello | Cosa sai fare | Prova per salire | Note |
|---|---|---|---|
| N0 | Meno di 50 m di fila, ripetute da 25 m | 8x50 m con 20" di pausa, tutte con lo stesso ritmo (±3") | Regola comune: prova superata se completata con fatica ≤ 6/10. Se non superata, avviso e alternative (ADA-04); si ritenta dopo almeno 1 settimana. Domanda 2 della configurazione: 25, 50, 100, 200, 400, 1000+ m |
| N1 | Ripetute da 50 m con pausa | 6x100 m con 20" di pausa | Livello di partenza di Fabio (ottobre 2026) |
| N2 | Ripetute da 100 m | 4x200 m con 30" di pausa |  |
| N3 | Ripetute da 200 m | 2x400 m con 45" di pausa |  |
| N4 | Ripetute da 400 m | 1000 m di fila, senza fermarsi |  |
| N5 | Nuotata continua, 1000 m e oltre | – (livello di gara) |  |

### Bici

| Livello | Cosa sai fare | Prova per salire | Note |
|---|---|---|---|
| B1 | Uscite fino a 1 h | Uscita facile di 1 h 30 | Misurata per tempo, non per km (dipendono da bici e terreno). Stessa regola comune dei livelli (fatica ≤ 6/10) |
| B2 | Uscite da 1 h a 1 h 30 | Uscita facile di 2 h |  |
| B3 | Uscite da 1 h 30 a 2 h 30 | Uscita facile di 3 h | Punto di partenza di Fabio: uscita più lunga 35 km a 20,6 km/h (circa 1 h 42), MTB anni 2000. Basta per il Gravel (circa 1 h 30 - 2 h) |
| B4 | Uscite da 2 h 30 a 3 h 30 | Uscita facile di 3 h 30 con parte in salita | Soglie da calibrare con l'uso |
| B5 | Uscite oltre 3 h 30 | – (livello di gara) |  |

### Corsa

| Livello | Cosa sai fare | Prova per salire | Note |
|---|---|---|---|
| C1 | Alterni corsa e cammino (es. 1' + 1') | 15' di corsa continua | Misurata in minuti continui. La prova arriva alla fine di una progressione nel limite SIC-03 (+10% a settimana), mai come salto |
| C2 | Corsa continua fino a 15' | 30' continui |  |
| C3 | Corsa continua da 15' a 30' | 45' continui |  |
| C4 | Corsa continua da 30' a 45' | 60' continui | Punto di partenza di Fabio: 8,26 km a 5'26"/km (circa 45') |
| C5 | Corsa continua oltre 60' | – (livello di gara) |  |

## 3. La libreria di sedute modello

Ogni seduta del piano nasce da un modello; il motore ne regola i parametri. Fonte: piani Lavaredo (Gravel e Sprint).

| ID | Disciplina | Nome | Scopo | Parametri regolabili | Fasi |
|---|---|---|---|---|---|
| NUO-01 | Nuoto | Nuoto a ripetute | Costruire la resistenza a pezzi | metri totali, distanza delle ripetute, recupero, parte di tecnica | Tutte |
| NUO-02 | Nuoto | Nuoto + core | Nuoto e stabilità del tronco nella stessa seduta | metri, minuti di core | Tutte |
| NUO-03 | Nuoto | Prova di controllo del nuoto | Misurare la nuotata continua (test di partenza e prove di controllo) | metri da nuotare senza fermarsi (400, 800, 1000, 1500), numero di 50 cronometrati | Base, prove di controllo |
| NUO-04 | Nuoto | Nuotata continua | Nuotare senza fermarsi (da 1000 a 2000 m) | metri continui, respirazione ogni 3 bracciate, minuti di core | Forza, specifica, picco |
| NUO-05 | Nuoto | Nuoto in acque libere | Abituarsi a lago, muta e altre persone | metri, muta sì/no, testa alzata ogni 6-8 bracciate | Specifica, picco |
| NUO-06 | Nuoto | Test di ritmo | Calcolare il ritmo di soglia: (tempo 400 − tempo 200) ÷ 2 | 400 m e 200 m a tutta, 5' di riposo | Prove di controllo |
| BIC-01 | Bici | Bici in Z2 | Fondo aerobico | durata, zona, cadenza | Base, forza |
| BIC-02 | Bici | Bici lunga | Resistenza per la frazione bici | durata, zona, terreno | Tutte |
| BIC-03 | Bici | Bici lavori | Forza e cadenza (in pianura: rapporti duri a bassa cadenza) | numero di ripetute, durata, zona (Z3-Z4), recupero, cadenza | Forza, specifica |
| BIC-04 | Bici | Test bici | 20' al massimo costante su strada piana | durata del test | Prove di controllo |
| BIC-05 | Bici | MTB salite / ritmo gara | Specifica off-road | durata, dislivello, ritmo, numero e durata delle ripetute in salita (Z4-Z5) | Specifica |
| BIC-06 | Bici | MTB tecnica | Tecnica su sterrato: discese, curve strette, ripartenze in salita | durata, terreno, giri del circuito | Specifica |
| COR-01 | Corsa | Corsa in Z2 | Fondo aerobico | durata o km, zona | Base |
| COR-02 | Corsa | Corsa lunga | Resistenza per la frazione corsa | durata, terreno | Tutte |
| COR-03 | Corsa | Corsa salite + forza | Forza specifica in salita | numero di salite, durata, recupero | Forza, specifica |
| COR-04 | Corsa | Corsa a ritmo gara | Abituarsi al ritmo della gara | durata a ritmo, ripetute | Specifica, picco |
| COR-05 | Corsa | Test corsa | 30' al massimo costante (media degli ultimi 20' = soglia) | durata del test | Prove di controllo |
| COR-06 | Corsa | Trail | Corsa su sterrato e in salita | durata, dislivello | Specifica |
| BRI-01 | Bici + corsa | Brick | Abituare le gambe al cambio bici → corsa | durata bici, durata corsa, ritmo | Specifica, picco |
| FOR-01 | Forza | Forza + core | Prevenzione degli infortuni | minuti, esercizi; si usa anche come blocco finale: forza dopo la corsa, core dopo il nuoto (SET-06) | Base, forza |
| SIM-01 | Triathlon | Simulazione gara | Prova generale delle tre frazioni | distanze, ritmi; può essere l'«ultima seduta lunga» con le tre frazioni a ritmo ridotto | Picco |
| SIM-02 | Triathlon | Prova del percorso | Conoscere percorso e quota (es. Auronzo, Misurina) | frazioni, ritmo facile-medio | Picco |
| ATT-01 | Triathlon | Attivazione pre-gara | Svegliare le gambe il giorno prima | minuti per frazione, allunghi | Settimana gara |
| GAR-01 | Triathlon | Gara | Il giorno della gara | distanze della gara scelta | Settimana gara |
| REC-01 | Recupero | Recupero attivo | Camminata dopo la simulazione o dopo sedute molto dure | durata (30-45') | Specifica, picco |
| RIP-01 | – | Riposo | Recupero (al massimo 15' di mobilità) | – | Tutte |

## 4. Ipotesi da verificare con l'uso

Questi valori sono stime ragionate, non regole consolidate. Si rivedono quando ci saranno dati reali
(a partire dalla v0.5):

- `SIC-03`: crescita +15% per bici e nuoto; `SIC-04`: scarico −30%; `SIC-07`: 1 giorno di riposo
- `FAT-02`: 6 settimane per gradino in bici e corsa; `FAT-03`: specifica minima Sprint Cross
  (11 settimane); `FAT-04`: soglie di margine 10 e 4 settimane
- `SET-01`: soglia di 20' in Z4-Z5 per «seduta dura»; `SET-03`: nuoto a metà velocità con un
  solo giorno di piscina
- `ADA-01`: massimo 2 ripetizioni; `ADA-03`: peggioramento oltre il 5%; `ADA-05`: nessun test nelle
  ultime 8 settimane; `ADA-06`: 2 settimane ripetute dopo una prova non superata

## 5. Punti da definire in F3

- Come riprende la corsa dopo un dolore (`SIC-08`)
- Se le settimane ripetute dopo una prova non superata consumano margine come in `ADA-01`
- Le settimane esatte delle prove di nuoto nel piano generato (vincoli in `docs/casi-di-prova.md`)
- Livelli richiesti per sprint su strada e olimpico (`FAT-01`): oggi solo Sprint Cross e Gravel

## 6. Documenti collegati

- `docs/schema-dati.md`: le tabelle del database
- `docs/casi-di-prova.md`: i casi che diventano test
- `TrackGymMeCoach.xlsx` (locale): fogli `PE ·` con i dati originali
