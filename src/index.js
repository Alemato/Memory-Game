import Game from "./modules/Game";
import Menu from "./modules/Menu";

window.addEventListener('load', function () {
    const gameContainer = document.querySelector('.game');
    let menu = new Menu(gameContainer);
    let game = new Game(gameContainer);

    gameContainer.addEventListener('resetGame', () => {
        console.log("resetto il gioco intero");
        if(game.resetGame()){
            console.log("tavolo rimosso");
            // time out animazione;
            setTimeout(resetDom, 500);
        } else {
            console.log("errore nel rimuovere il tavolo");
        }

    })

    function resetDom(){
        while (gameContainer.firstChild) {
            gameContainer.removeChild(gameContainer.lastChild);
        }
        console.log("----------------");
        console.log("Riavvio il gioco");
        console.log("----------------");
        menu = new Menu(gameContainer);
        game = new Game(gameContainer);
    }

});

