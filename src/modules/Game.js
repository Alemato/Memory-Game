import Tavola from "./Tavola";

function Game(gameContainer) {
    const stato = {
        gameStarted: false,
        flippedCards: [],
        totalFlips: 0,
        totalTime: 0,
        loop: null,
        tavolo: null
    }

    const menuContainer = document.querySelector('.menu-container');

    function createDOM() {
        const tavolaContainer = document.createElement('div');
        tavolaContainer.classList.add('tavola');

        const controlGame = document.createElement('div');
        controlGame.classList.add('controls');

        const stopButton = document.createElement('button');
        stopButton.innerText = "Mi Arrendo";
        stopButton.classList.add('btn-start')

        const statsContainer = document.createElement('div');
        statsContainer.classList.add('stats');

        const mosse = document.createElement('div');
        mosse.innerText = "0 Mosse";

        const timer = document.createElement('div');
        timer.innerText = "Tempo: 0 sec";

        statsContainer.appendChild(mosse);
        statsContainer.appendChild(timer);

        tavolaContainer.appendChild(controlGame);

        controlGame.appendChild(stopButton);

        controlGame.appendChild(statsContainer);

        gameContainer.appendChild(tavolaContainer);
    }

    menuContainer.addEventListener('startGame', function (e) {
        preparaTavolo(e);
    });


    function preparaTavolo(e) {
        createDOM();
        stato.tavolo = new Tavola(e.detail.dimensioni);
        console.log("il tavolo");
        console.log(stato.tavolo);

        stato.tavolo.carte.forEach(carta => {
            carta.el.addEventListener('flip-card', function () {
                logicGame(carta);
            });
        });
    }

    function logicGame(carta) {
        console.log("la carta è");
        console.log(carta);
        // controllo se devo consentire la rotazione delle carte
        if(stato.flippedCards.length < 2){
            console.log("contains this card ? " + stato.flippedCards.includes(carta));
            // controllo se ho già quella carta (attenzione si intende quel specifico elemento e non la figura)
            if(!stato.flippedCards.includes(carta)){
                // la giro
                carta.flip(true);
                // non ce l'ho allora l'aggiungo all'array
                stato.flippedCards.push(carta);
            }
            console.log(stato.flippedCards);
            // controllo se ho aggiunto la seconda carta devo vede se matchia o meno
            if(stato.flippedCards.length === 2){
                // timeout per l'animazione di ruota -> controllo -> non matchiano -> ruoto tutto
                setTimeout(matched, 500);
            }

        } else {
            // ho 2 o più carte girate e non me ne sono accorto prima
            // timeout per l'animazione di ruota -> controllo -> non matchiano -> ruoto tutto
            setTimeout(matched, 500);
        }


        //carta.flip(true);
    }

    function matched(){
        console.log("matched");
        const prima = stato.flippedCards[0];
        const seconda = stato.flippedCards[1];
        if(prima.simbolo !== seconda.simbolo){
            console.log("non matchiano");
            prima.flip(false);
            seconda.flip(false);
        }
        stato.flippedCards = [];
        console.log(stato.flippedCards);
    }

    /* const mosse = document.querySelector('.moves');
     const timer = document.querySelector('.timer');
     const bottoneStart = document.querySelector('button');
     const tavolo = new Tavola(4);

     function startGame() {
         stato.gameStarted = true;
         bottoneStart[0].classList.add('disabled');
         console.log(mosse, timer);
         stato.loop = setInterval(() => {
             stato.totalTime++;
             mosse.innerText = `${stato.totalFlips} Mosse`;
             timer.innerText = `Timer: ${stato.totalTime} sec`;
         }, 1000);
     }

     bottoneStart.addEventListener('start-game', function () {
         startGame();
     });*/


}

export default Game;
