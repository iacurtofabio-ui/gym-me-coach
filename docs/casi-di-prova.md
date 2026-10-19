# Gym Me Coach — Casi di prova del motore

> Scritti il 19/10/2026 (task `F1-T09`). In F3 ogni caso diventa un test xUnit del `PlanEngine`:
> stessi dati in ingresso → stesso risultato atteso. Se un test fallisce, o la regola o il codice
> è sbagliato. Le persone sono inventate; il caso reale di Fabio compare come «atleta A».

## Convenzioni valide per tutti i casi

- **Data di partenza**: lunedì 19/10/2026. La settimana 1 inizia quel giorno; la gara cade
  nell'ultima settimana del piano.
- **Settimane disponibili** = numero di settimane dal lunedì di partenza fino alla settimana della
  gara, compresa.
- **Margine** = settimane disponibili − settimane necessarie (`FAT-02`, `FAT-03`, `FAT-04`).
- **Data più lontana** (`FAT-05`): il sabato della settimana numero «settimane necessarie + 4».
- **Settimane per gradino**: nuoto 4, bici 6, corsa 6 (nuoto 8 con un solo giorno di piscina).
- **Livelli richiesti** (`FAT-01`): Sprint Cross N5-B3-C4; Gravel N5-B4-C5.
- **Lavoro specifico** (`FAT-03`): Sprint Cross 11 settimane, Gravel 15.

## Caso di partenza: atleta A

Usato nei casi C01, C02, C07-C12, salvo dove indicato.

- Maggiorenne (data di nascita inventata: 01/01/1980), questionario di idoneità: tutti «no»
- Livelli: nuoto N1, bici B3, corsa C4
- Ore a settimana: attuali circa 5, dichiarate 9,5
- Giorni disponibili: lunedì-giovedì, sabato, domenica (venerdì libero)
- Giorni lunghi: sabato (bici), domenica (corsa). Giorni di piscina: lunedì e giovedì
- Attrezzatura: senza rulli, senza salite (pianura)
- Settimana di feste: 21-27/12/2026 (settimana 10)

---

## C01 — Atleta A, Gravel

**Regole**: `FAT-01…04`, `FAS-01…04`, `SET-01…06`, `SIC-03`, `SIC-04`, `SIC-07`.

**Ingresso**: atleta A, gara Gravel, data 10/07/2027.

**Atteso**
- Settimane disponibili 38. Necessarie: nuoto 4 gradini × 4 = 16, bici 1 × 6 = 6, corsa 1 × 6 = 6 →
  la più lunga è 16; più 15 di lavoro specifico = 31. **Margine 7** → verdetto
  «fattibile, con prove di controllo».
- Fasi: base 1-12, forza 13-23, specifica 24-33, picco 34-36, scarico pre-gara 37, gara 38.
- Settimane di scarico: 4, 8, 10 (feste, spostata da 12), 14, 18, 22, 26, 30, 33.
  Mai più di 4 settimane di carico di fila.
- Ore: crescono da circa 5 a 9,5 senza superare +10% a settimana; il picco è a 9,5; scarico −35%
  (pre-gara −40%).
- Corsa: nessun aumento di volume oltre +10% a settimana.
- Settimana tipo: nuoto lunedì e giovedì, corsa + forza martedì, bici mercoledì, bici lunga sabato,
  corsa lunga domenica, venerdì di riposo. Mai due sedute dure di fila.
- Quattro prove di controllo del nuoto (da N1 a N5), ognuna in una settimana di scarico; la quarta
  entro la settimana 22.

## C02 — Atleta A, Sprint Cross

**Regole**: `FAT-01…04`, `FAS-01`.

**Ingresso**: atleta A, gara Sprint Cross, data 10/07/2027.

**Atteso**
- Necessarie: nuoto 16, bici 0, corsa 0 → 16; più 11 = 27. **Margine 11** → «fattibile».
- Fasi uguali a C01 (12 / 11 / 10 / 3 / 1 / 1).

## C03 — Principiante assoluto

**Regole**: `FAT-02…05`.

**Ingresso**: persona inventata, maggiorenne, idonea; livelli N0, B1, C1; gara Sprint Cross il
15/05/2027 (30 settimane).

**Atteso**
- Necessarie: nuoto 5 × 4 = 20, bici 2 × 6 = 12, corsa 3 × 6 = 18 → 20; più 11 = 31. **Margine −1** →
  «non fattibile».
- Gara più corta: nessuna (la Sprint Cross è già la più corta).
- Data più lontana: **19/06/2027** (31 + 4 = 35 settimane).

## C04 — Gara troppo vicina

**Regole**: `FAT-04`, `FAT-05`.

**Ingresso**: atleta A, gara Gravel il 12/12/2026 (8 settimane).

**Atteso**
- Necessarie 31, margine **−23** → «non fattibile».
- La Sprint Cross avrebbe margine −19, quindi **non viene proposta** (`FAT-05`).
- Data più lontana: **19/06/2027**.

## C05 — Minorenne

**Regole**: `SIC-01`.

**Ingresso**: persona inventata nata il 01/06/2009 (17 anni).

**Atteso**: piano non generato, nessun obiettivo salvato; messaggio che l'app è riservata ai
maggiorenni.

**Variante C05b — diciottenne proprio oggi**: nata il 19/10/2008 → il piano **parte** (età ≥ 18).

## C06 — Questionario con un «sì»

**Regole**: `SIC-02`.

**Ingresso**: atleta inventato, maggiorenne; risposta «sì» a «dolore al petto», le altre «no»;
nessun via libera del medico.

**Atteso**
- Piano non generato; messaggio «senti prima un medico».
- Si salva solo l'esito del questionario, non le singole risposte.

**Variante C06b — con via libera del medico**: stesso ingresso più il consenso `MedicalClearance`
concesso → il piano viene generato normalmente.

## C07 — Un solo giorno di piscina

**Regole**: `SET-03`, `FAT-02`, `FAT-05`.

**Ingresso**: atleta A con piscina solo il lunedì; gara Gravel il 10/07/2027.

**Atteso**
- Una sola seduta di nuoto a settimana; gradini del nuoto da 8 settimane: 4 × 8 = 32; più 15 = 47.
  **Margine −9** → «non fattibile».
- Con la Sprint Cross: 32 + 11 = 43, margine −5, ancora «non fattibile» → non proposta.
- Data più lontana (Gravel): **09/10/2027** (47 + 4 = 51 settimane).

## C08 — Due sedute saltate

**Regole**: `ADA-01`.

**Ingresso**: caso C01; nella settimana 5 (16-22/11/2026) l'atleta A salta 2 sedute su 6, senza
malattia né dolore.

**Atteso**
- La settimana 5 si ripete la settimana successiva, con le stesse ore (nessun aumento).
- Le sedute saltate non vengono recuperate.
- Margine 7 → **6**; verdetto invariato «fattibile, con prove di controllo».
- Registrato un evento del piano con la regola `ADA-01` e la settimana 5.

## C09 — Fatica alta per due settimane

**Regole**: `ADA-02`, `FAS-02`, `FAS-03`.

**Ingresso**: caso C01; fatica media delle sedute fatte 8,5 nella settimana 5 e 9 nella
settimana 6.

**Atteso**
- La settimana 7 è di scarico (anticipata di una settimana rispetto alla 8).
- Il ciclo 3 + 1 riparte da lì: il prossimo scarico sarebbe l'11, ma la settimana di feste è la 10
  e lo scarico si sposta lì (`FAS-03`). Scarichi alle settimane 7, 10, poi 14, 18, 22, 26, 30, 33.
- Evento del piano con la regola `ADA-02`.

## C10 — Prova di controllo non superata

**Regole**: `ADA-04`, `ADA-06`, `ADA-05`.

**Ingresso**: caso C01; alla settimana 8 la prova del nuoto (da N2 a N3) non viene superata
(la fatica supera 6 su 10).

**Atteso**
- Si ripetono le ultime 2 settimane di carico (settimane 6 e 7) con le stesse ore; la prova si
  ripropone nella prima settimana di scarico successiva.
- Le 2 settimane ripetute consumano margine: 7 → **5**; verdetto invariato.
- Alla seconda prova non superata di fila: l'app propone di rivedere l'obiettivo (ricalcolo di
  `FAT-04`).
- Il livello del nuoto resta N2.

## C11 — Più regole insieme

**Regole**: `ADA-01`, `ADA-02`, `ADA-07`.

**Ingresso**: caso C01; fatica media 9 nelle settimane 5 e 6; nella settimana 6 salta anche
2 sedute.

**Atteso**
- Prevale lo scarico (`ADA-02` batte `ADA-01`): la settimana 7 è di scarico e **non** si ripete la 6.
- Evento del piano con la regola `ADA-02`; `ADA-01` non viene applicata.
- Margine invariato (7): la settimana di scarico fa parte del ciclo.

## C12 — Dolore nel diario

**Regole**: `SIC-08`.

**Ingresso**: caso C01; nella settimana 3 la voce del diario di una seduta di corsa ha il dolore
segnalato.

**Atteso**
- Le sedute di corsa successive sono sospese (stato «saltata»); nuoto e bici continuano.
- L'app consiglia di sentire un medico se il dolore dura.
- Evento del piano con la regola `SIC-08`.

---

## Punti da definire in F3

1. **Come riprendere la corsa dopo il dolore** (C12): la regola `SIC-08` dice quando sospendere,
   non quando riprendere. Proposta: l'utente conferma di non avere più dolore.
2. **Margine consumato dalla prova non superata** (C10): si assume che le 2 settimane ripetute
   consumino margine come in `ADA-01`.
3. **Prove di nuoto del caso C01**: i numeri esatti delle settimane delle quattro prove (oltre ai
   vincoli indicati) si fissano quando il motore genera il piano.
