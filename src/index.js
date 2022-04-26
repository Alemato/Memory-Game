import Game from "./modules/Game";
import Menu from "./modules/Menu";

window.addEventListener('load', function() {
    /*
    const bottoneStart = document.querySelector('button');
    bottoneStart.addEventListener('click', function () {
        const start = new Event('start-game');
        bottoneStart.dispatchEvent(start);
    });*/
    const gameContainer = document.querySelector('.game');
    const menu = new Menu(gameContainer);
    const game = new Game(gameContainer);

    /*setTimeout(()=>{
        menu.flippedMenu();
    }, 5000);*/


});

