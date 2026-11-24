# AutoLog

> **La tua auto, sempre in regola.**

**Autore:** _inserisci qui nome e cognome_ · **Tipo:** progetto scolastico · **Tecnologie:** HTML, CSS, JavaScript

## Indice

1. [Descrizione breve](#descrizione-breve)
2. [Descrizione completa e contesto](#descrizione-completa-e-contesto)
3. [Target](#target)
4. [Competitor](#competitor)
5. [Elenco delle funzionalità](#elenco-delle-funzionalità)
6. [Diagramma dei casi d'uso](#diagramma-dei-casi-duso)
7. [User stories](#user-stories)
8. [Analisi SWOT](#analisi-swot)
9. [Tecnologie, uso e struttura del repository](#tecnologie-uso-e-struttura-del-repository)
10. [Mission e vision](#mission-e-vision)
11. [Sviluppi futuri](#sviluppi-futuri)
12. [Fonti](#fonti)

---

## Descrizione breve

AutoLog è una web app gratuita che raccoglie in un unico posto tutto quello che riguarda la tua auto: **scadenze** (bollo, assicurazione, revisione, tagliando), **spese** e **costo al chilometro**. Funziona direttamente dal browser, senza installazioni e senza account.

## Descrizione completa e contesto

Possedere un'auto in Italia significa tenere sotto controllo molte date e molti costi: il bollo (la tassa automobilistica), l'assicurazione RC auto, la revisione periodica (la prima dopo 4 anni dall'immatricolazione, poi ogni 2 anni per le autovetture), il tagliando indicato dal costruttore, oltre a carburante, riparazioni e gomme. Queste informazioni sono di solito sparse tra libretto, ricevute di carta, foto sul telefono e messaggi. Il risultato è che le scadenze si dimenticano facilmente, con il rischio di sanzioni previste dal Codice della Strada o di guasti evitabili, e che quasi nessuno sa davvero quanto spende in un anno per la propria auto.

**AutoLog** nasce per risolvere questo problema in modo semplice. L'utente aggiunge una o più auto (marca, modello, targa, anno) e per l'auto attiva può:

- inserire le **scadenze** e vederle in un elenco ordinato, con un colore che indica a colpo d'occhio se sono lontane (verde), vicine (arancione, entro 30 giorni) o già passate (rosso);
- registrare le **spese** (carburante, riparazioni, gomme, assicurazione, bollo, altro), con data, importo, chilometri e note;
- consultare una **dashboard** con la spesa totale, la spesa dell'anno in corso, il costo al chilometro, la prossima scadenza e la ripartizione delle spese per categoria.

**Contesto del progetto.** AutoLog è un progetto scolastico sviluppato con tecnologie web di base (HTML, CSS, JavaScript). Nella prima versione i dati vengono salvati nel browser dell'utente (`localStorage`): non serve alcun server e nessun dato viene inviato online. È una scelta voluta per mantenere il progetto semplice e realizzabile; i limiti che ne derivano (dati legati a un solo browser, nessuna notifica) sono analizzati nell'[analisi SWOT](docs/SWOT.md) e affrontati negli [sviluppi futuri](#sviluppi-futuri).

## Target

**Target principale**

- **Neopatentati e giovani conducenti (18-30 anni):** hanno la prima auto, poca esperienza con le scadenze e un budget limitato, quindi preferiscono uno strumento gratuito e senza abbonamenti.
- **Famiglie con una o più auto:** vogliono un unico posto in cui vedere le scadenze di tutte le auto di casa.
- **Chi usa l'auto per lavoro:** vuole sapere quanto spende e quanto costa ogni chilometro.

**Target secondario**

- Studenti che usano un'auto di famiglia o usata e vogliono dividere le spese con chi la condivide.

## Competitor

Sono stati analizzati tre prodotti già esistenti per la gestione dell'auto. Tutti sono **app per smartphone** con un modello a pagamento per le funzioni avanzate. Le informazioni arrivano dalle schede dell'App Store consultate a novembre 2026 (vedi [Fonti](#fonti)); prezzi e funzioni possono cambiare.

| Competitor | Breve descrizione | Modello di prezzo (da scheda App Store) |
|---|---|---|
| **Fuelio** (Sygic) | App specializzata in rifornimenti e consumi: registro carburante, statistiche e grafici, ricerca distributori, import/export CSV. Le spese di manutenzione e i promemoria sono tra le funzioni Pro. | Gratuita con acquisti in-app; piano Pro circa 4,99 $/mese o 17,99 $/anno |
| **Drivvo** | App completa di spese, rifornimenti, manutenzione con ricevute allegate, promemoria per data o chilometri, tracciamento GPS dei viaggi e report. Ha anche una soluzione per flotte aziendali. | Gratuita con pubblicità fino a 2 veicoli; piani a pagamento per più funzioni |
| **My Car – Vehicle Manager** (KineApps) | Registro di rifornimenti, interventi e spese con grafici e statistiche, funzionamento offline e versione web; importa i dati da altre app. | Gratuita fino a 3 veicoli; Premium circa 1,49 $/mese o 10,99 $/anno (sincronizzazione cloud, promemoria, report PDF) |

**Come si differenzia AutoLog.** I competitor sono più completi (GPS, scansione scontrini, sincronizzazione), ma sono app da installare, in parte a pagamento o con pubblicità. AutoLog punta sulla **semplicità**: è gratuita, si usa dal browser, non richiede account e tiene i dati sul dispositivo dell'utente. Nelle schede consultate non risulta un calcolo automatico delle scadenze secondo le regole italiane (per esempio la revisione 4+2 anni): è un'opportunità per AutoLog (funzionalità F20). I punti di forza e di debolezza di ciascun competitor sono nell'[analisi SWOT](docs/SWOT.md).

## Elenco delle funzionalità

La tabella completa è nel file Excel [`docs/funzionalita.xlsx`](docs/funzionalita.xlsx). Ogni funzionalità è valutata con **due criteri**:

1. **Valore per l'utente** (da 1 a 5): quanto è utile a chi usa l'app;
2. **Complessità di sviluppo** (da 1 a 5): quanto è difficile da realizzare.

Dai due criteri si ricava un indice di priorità (valore ÷ complessità): più è alto, più conviene realizzare presto la funzionalità. Il file contiene 14 funzionalità già realizzate (F01-F14) e 6 funzionalità future (F15-F20).

## Diagramma dei casi d'uso

![Diagramma dei casi d'uso di AutoLog](docs/casi-d-uso.png)

File sorgente modificabile: [`docs/casi-d-uso.svg`](docs/casi-d-uso.svg).

**Attore:** l'**Automobilista**, cioè l'unica persona che usa l'app. Non ci sono altri attori: il salvataggio nel browser è un'operazione interna del sistema.

**Come leggere il diagramma**

- Le linee continue collegano l'attore ai casi d'uso che può avviare.
- Le frecce tratteggiate «include» indicano che un caso d'uso ne richiama sempre un altro: ogni aggiunta o eliminazione di dati include il salvataggio nel browser; lo scadenzario include il calcolo dello stato di ogni scadenza; la dashboard include i quattro calcoli e viste che la compongono.
- I casi d'uso con bordo tratteggiato sono funzionalità future, non ancora realizzate.
- **Precondizione:** per aggiungere scadenze e spese deve esistere almeno un'auto attiva (vedi «Selezionare auto attiva»).

## User stories

Formato: **Come** _ruolo_, **voglio** _azione_, **così da** _beneficio_. Ogni storia è collegata a una funzionalità dell'Excel e ha dei criteri di accettazione.

### Gestione auto

| ID | User story | Criteri di accettazione | Funz. |
|---|---|---|---|
| US01 | Come automobilista, voglio aggiungere la mia auto (marca, modello, targa, anno), così da iniziare a tenere traccia di scadenze e spese. | Tutti i campi sono obbligatori; dopo l'inserimento l'auto diventa quella attiva; la targa viene salvata in maiuscolo. | F01 |
| US02 | Come proprietario di più auto, voglio scegliere quale auto è attiva, così da vedere solo i dati di quella. | Il menu in alto elenca tutte le auto; cambiando auto cambiano scadenze, spese e dashboard. | F02 |
| US03 | Come automobilista, voglio eliminare un'auto venduta, così da non avere dati inutili. | Viene chiesta una conferma; vengono eliminate anche scadenze e spese di quell'auto; se era attiva, viene selezionata un'altra auto (se esiste). | F03 |

### Scadenze

| ID | User story | Criteri di accettazione | Funz. |
|---|---|---|---|
| US04 | Come automobilista, voglio inserire la data di scadenza di bollo, assicurazione, revisione e tagliando, così da non dimenticarle. | Il tipo si sceglie da un elenco; la data è obbligatoria; senza un'auto attiva compare un avviso. | F04 |
| US05 | Come neopatentato, voglio vedere subito quali scadenze sono vicine o già passate, così da evitare multe e fermi. | Elenco ordinato per data; verde oltre 30 giorni, arancione entro 30 giorni, rosso se scaduta o in scadenza oggi; sono indicati i giorni mancanti o trascorsi. | F05 |
| US06 | Come automobilista, voglio eliminare una scadenza inserita per sbaglio o già rinnovata, così da tenere l'elenco pulito. | Ogni scadenza ha un pulsante «Elimina»; l'elenco si aggiorna subito. | F06 |

### Spese

| ID | User story | Criteri di accettazione | Funz. |
|---|---|---|---|
| US07 | Come automobilista, voglio registrare una spesa con data, categoria e importo, così da sapere dove vanno i miei soldi. | Data (di default oggi), categoria e importo obbligatori; chilometri e note (max 80 caratteri) facoltativi. | F07 |
| US08 | Come automobilista, voglio consultare lo storico delle spese, così da ricordare cosa ho pagato e quando. | Elenco dalla più recente; ogni voce mostra data, categoria, importo, km e note. | F08 |
| US09 | Come automobilista, voglio eliminare una spesa sbagliata, così da avere totali corretti. | Pulsante «Elimina» su ogni spesa; i totali della dashboard si aggiornano subito. | F09 |

### Dashboard e dati

| ID | User story | Criteri di accettazione | Funz. |
|---|---|---|---|
| US10 | Come automobilista, voglio vedere quanto ho speso in totale e nell'anno in corso, così da capire quanto mi costa l'auto. | Due valori in euro: totale e anno corrente, solo per l'auto attiva. | F10 |
| US11 | Come chi usa l'auto per lavoro, voglio conoscere il costo al chilometro, così da valutare la convenienza dei miei spostamenti. | Con almeno due spese con km diversi viene mostrato il costo in €/km; altrimenti compare «n/d». | F11 |
| US12 | Come automobilista, voglio vedere nella dashboard la prossima scadenza, così da sapere subito cosa fare per primo. | Viene mostrata la prima scadenza non ancora passata, con tipo e data; se non ce ne sono compare «Nessuna». | F12 |
| US13 | Come automobilista, voglio vedere le spese divise per categoria, così da capire dove posso risparmiare. | Barre ordinate dalla categoria più costosa; la lunghezza è proporzionale al totale. | F13 |
| US14 | Come utente, voglio che i dati restino salvati anche dopo aver chiuso il browser, così da non dover reinserire tutto. | Dopo aver ricaricato la pagina i dati sono presenti; se il salvataggio non riesce compare un avviso. | F14 |

### Funzionalità future

| ID | User story | Criteri di accettazione (proposti) | Funz. |
|---|---|---|---|
| US15 | Come automobilista, voglio ricevere un promemoria prima di una scadenza, così da non dovermi ricordare di aprire l'app. | Notifica a un numero di giorni prima scelto dall'utente. | F15 |
| US16 | Come automobilista, voglio esportare i miei dati in CSV o PDF, così da portarli dal meccanico o fare un backup. | Il file contiene auto, scadenze e spese e si scarica con un clic. | F16 |
| US17 | Come utente, voglio accedere con un account, così da ritrovare i miei dati su telefono e computer. | Registrazione e accesso funzionanti; i dati sono sincronizzati online. | F17 |
| US18 | Come automobilista, voglio allegare la foto di libretto, scontrini e fatture, così da avere tutto in un posto. | Si possono aggiungere foto a una spesa o a una scadenza. | F18 |
| US19 | Come automobilista, voglio registrare i litri di carburante, così da conoscere i consumi (l/100 km). | Ogni rifornimento ha litri e km; l'app calcola il consumo medio. | F19 |
| US20 | Come neopatentato, voglio che l'app proponga la data della prossima revisione, così da non sbagliare il calcolo. | Inserendo la data di immatricolazione si calcola la prima revisione (dopo 4 anni) e le successive (ogni 2 anni). | F20 |

## Analisi SWOT

L'analisi completa, con i punti di forza e di debolezza di AutoLog **e dei tre competitor**, è in [`docs/SWOT.md`](docs/SWOT.md). In sintesi:

| | Positivi | Negativi |
|---|---|---|
| **Interni (AutoLog)** | **Forze:** gratuita, senza pubblicità né account, si usa dal browser, dati privati sul dispositivo, interfaccia semplice | **Debolezze:** dati solo nel browser, nessuna notifica, nessun export, meno funzioni dei competitor |
| **Esterni** | **Opportunità:** utenti che non vogliono abbonamenti, regole italiane non gestite, evoluzioni come notifiche e account | **Minacce:** app consolidate con molte recensioni, abitudine alle app mobili con notifiche, promemoria gratuiti del telefono |

## Tecnologie, uso e struttura del repository

- **HTML, CSS e JavaScript** per l'interfaccia.
- **`localStorage`** del browser per salvare i dati (nessun server necessario).

**Come usarlo:** aprire `index.html` nel browser, oppure pubblicare il repository con GitHub Pages (Settings → Pages → branch `main`, cartella `/ (root)`).

```
AutoLog/
├── index.html            struttura della pagina
├── style.css             stile
├── script.js             logica dell'app
├── README.md             questo file
└── docs/
    ├── funzionalita.xlsx tabella delle funzionalità con due criteri
    ├── casi-d-uso.png    diagramma dei casi d'uso (immagine)
    ├── casi-d-uso.svg    diagramma dei casi d'uso (modificabile)
    └── SWOT.md           analisi SWOT
```

## Mission e vision

**Mission.** Aiutare gli automobilisti a tenere sotto controllo scadenze e spese dell'auto, in modo semplice e senza dimenticanze.

**Vision.** Diventare l'app di riferimento in Italia per la gestione dell'auto, con promemoria automatici, statistiche di spesa e collegamento a officine e assicurazioni.

## Sviluppi futuri

Le funzionalità F15-F20 dell'Excel, in ordine di indice di priorità: calcolo automatico della revisione, promemoria automatici, esportazione dei dati, registro dei consumi, account con database online (es. Firebase) e allegati fotografici.

## Fonti

Schede dell'App Store consultate a novembre 2026:

- Fuelio: <https://apps.apple.com/us/app/fuelio-gas-log-mpg/id1487753318>
- Drivvo: <https://apps.apple.com/app/id1206041425>
- My Car – Vehicle Manager: <https://apps.apple.com/us/app/id1165749302>
