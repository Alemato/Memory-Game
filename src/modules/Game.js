import Tavola from "./Tavola";
/**
 *  Game.js è responsabile dell'orchestrazione del gioco
 *  al suo interno troviamo le funzioni che azionano le varie creazioni degli oggetti di gioco,
 *  nonchè la logica e lo stato del gioco stesso
 */
function Game(gameContainer) {
    const stato = {
        gameStarted: false,
        flippedCards: [],
        totalCardsFound: 0,
        totalFlips: 0,
        totalTime: 0,
        loop: null,
        tavolo: null,
        domMosse: null,
        domTempo: null,
        domTavola: null,
        domStopButton: null
    }

    const menuContainer = document.querySelector('.menu-container');

    function createDOM() {
        const tavolaContainer = document.createElement('div');
        tavolaContainer.classList.add('tavola');
        stato.domTavola = tavolaContainer;

        const controlGame = document.createElement('div');
        controlGame.classList.add('controls');

        const stopButton = document.createElement('button');
        stopButton.innerText = "Mi Arrendo";
        stopButton.classList.add('btn-start')
        stato.domStopButton = stopButton;

        const statsContainer = document.createElement('div');
        statsContainer.classList.add('stats');

        const mosse = document.createElement('div');
        mosse.innerText = "0 Mosse";
        stato.domMosse = mosse;

        const timer = document.createElement('div');
        timer.innerText = "Tempo: 0 sec";
        stato.domTempo = timer;

        statsContainer.appendChild(mosse);
        statsContainer.appendChild(timer);

        tavolaContainer.appendChild(controlGame);

        controlGame.appendChild(stopButton);

        controlGame.appendChild(statsContainer);

        gameContainer.appendChild(tavolaContainer);
    }

    function ruotaCarta(carta){
        carta.flip(true);
    }

    menuContainer.addEventListener('startGame', function (e) {
        preparaTavolo(e);
    });


    function handleDomStopButtonLoser(){
        clearInterval(stato.loop);
        stato.tavolo.carte.forEach(carta => {
            setTimeout(ruotaCarta.bind(null, carta), 500);
        });
        stato.domStopButton.classList.add('disabled');
        setTimeout(gameOver, 2000);
    }

    function preparaTavolo(e) {
        createDOM();
        stato.tavolo = new Tavola(e.detail.dimensioni);
        console.log("il tavolo");
        console.log(stato.tavolo);
        stato.domStopButton.addEventListener('click', handleDomStopButtonLoser);
        stato.tavolo.carte.forEach(carta => {
            carta.el.addEventListener('flip-card', function () {
                logicGame(carta);
            });
        });
        startTime();
    }

    function startTime() {
        stato.loop = setInterval(() => {
            stato.totalTime++
            stato.domMosse.innerText = `${stato.totalFlips} mosse`
            stato.domTempo.innerText = `Tempo: ${stato.totalTime} sec`
        }, 1000);
    }

    function logicGame(carta) {
        console.log("la carta è");
        console.log(carta);
        // controllo se devo consentire la rotazione delle carte
        if (stato.flippedCards.length < 2) {
            console.log("contiene questa carta ? " + stato.flippedCards.includes(carta));
            // controllo se ho già quella carta (attenzione si intende quel specifico elemento e non la figura)
            if (!stato.flippedCards.includes(carta)) {
                // la giro
                carta.flip(true);
                // non ce l'ho allora l'aggiungo all'array
                stato.totalFlips++;
                stato.flippedCards.push(carta);
            }
            console.log(stato.flippedCards);
            // controllo se ho aggiunto la seconda carta, devo vedere se sono uguali o meno
            if (stato.flippedCards.length === 2) {
                // timeout per l'animazione di ruota -> controllo -> non sono uguali -> ruoto tutto
                setTimeout(matched, 500);
            }

        } else {
            // ho 2 o più carte scoperte e non me ne sono accorto prima
            // timeout per l'animazione di ruota -> controllo -> non sono uguali -> ruoto tutto
            setTimeout(matched, 500);
        }
    }

    function matched() {
        console.log("matched");
        const prima = stato.flippedCards[0];
        const seconda = stato.flippedCards[1];
        if (prima.simbolo !== seconda.simbolo) {
            console.log("non matchiano");
            prima.flip(false);
            seconda.flip(false);
        } else {
            stato.totalCardsFound++;
        }
        stato.flippedCards = [];
        if (stato.totalCardsFound === stato.tavolo.numeroCarte) {
            youWin();
        }
        console.log(stato);
    }

    function gameOver() {
        const domWin = document.querySelector('.win');
        console.log("Game Over!");
        stato.tavolo.element.classList.add('flipped');
        domWin.innerHTML = `<span class="win-text">
                    Ti sei arreso!<br />
                    vuoi rigiocare?
                </span>`;
        stato.domStopButton.classList.remove('disabled');
        stato.domStopButton.removeEventListener('click', handleDomStopButtonLoser, false);
        endGame();
    }

    function youWin() {
        const domWin = document.querySelector('.win');
        console.log("YOU WIN!");
        stato.tavolo.element.classList.add('flipped');
        domWin.innerHTML = `<span class="win-text">
                    Hai vinto!<br />
                    con <span class="highlight">${stato.totalFlips}</span> mosse<br />
                    sotto i <span class="highlight">${stato.totalTime}</span> secondi
                </span>`;
        endGame();
    }

    function endGame() {
        stato.domStopButton.innerText = "Rigioca"
        stato.domStopButton.addEventListener('click', function () {
            console.log("resetta");
            const rigioca = new Event('resetGame');
            gameContainer.dispatchEvent(rigioca);
        });
        clearInterval(stato.loop);
    }

    this.resetGame = function resetGame() {
        console.log("avvio il reset");
        console.log("rimuovo l'evento flip-card dalle carte");
        stato.tavolo.carte.forEach(carta => {
            carta.el.removeEventListener('flip-card', function () {
                logicGame(carta);
            }, false);
        });
        if (stato.tavolo.resetGameTavola()) {
            console.log("rimuovo l'evento startGame dal tavolo");
            menuContainer.removeEventListener('startGame', function (e) {
                preparaTavolo(e);
            }, false);
            stato.domStopButton.removeEventListener('click', function () {
                console.log("resetta");
                const rigioca = new Event('resetGame');
                gameContainer.dispatchEvent(rigioca);
            }, false);
            console.log("distruggo il tavolo");
            stato.domTavola.classList.add("flipped");
            for (const variableKey in stato) {
                if (stato.hasOwnProperty(variableKey)) {
                    delete stato[variableKey];
                }
            }
            return true;
        } else {
            console.log("Errore nel rimuovere le carte");
        }
    }


}

export default Game;
