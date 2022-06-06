import {cartePossibili} from "./utils";
import Carta from "./Carta";

function Tavola(dimensione) {
    const carte = [];

    if (dimensione % 2 !== 0 && dimensione <= 8) {
        console.log("la dimensione non è valida");
    } else {
        this.numeroCarte = (dimensione * dimensione) / 2;
        this.element = init();
        this.carte = carte;
    }


    function init() {
        console.log("costruisco il tavolo");

        const boardContainerEl = document.createElement('div');
        boardContainerEl.classList.add('board-container');

        const boardEl = document.createElement('div');
        boardEl.classList.add('board');
        boardEl.style.gridTemplateColumns = `repeat(${dimensione}, auto)`;

        creaCarte();
        creaCarteDOM(boardEl);

        console.log("Carte create: ");
        console.log(carte);

        const win = document.createElement('div');
        win.classList.add('win');
        win.innerText = "Hai vinto!";

        boardContainerEl.appendChild(boardEl);
        boardContainerEl.appendChild(win);

        const gameEl = document.querySelector('.tavola');
        gameEl.appendChild(boardContainerEl);

        return boardContainerEl;
    }

    function creaCarte() {
        const numeroCarte = (dimensione * dimensione) / 2;
        const carteScelte = shuffle(cartePossibili).slice(0, numeroCarte);
        console.log("Carte scelte:");
        console.log(carteScelte);
        const carteDaCreare = shuffle([...carteScelte, ...carteScelte]);
        console.log("Carte da creare:");
        console.log(carteDaCreare);
        carteDaCreare.forEach(cartaDaCreare => {
            const carta = new Carta(cartaDaCreare.nome, cartaDaCreare.icona);
            carte.push(carta);
        });
    }

    function creaCarteDOM(boardEl) {
        carte.forEach(carta => {
            boardEl.appendChild(carta.createDOM());
        });
    }


    this.resetGameTavola = function resetGame() {
        console.log("distruggo gli oggetti le carte e resetto l'array");
        const n = carte.length;
        for (let i = 0; i < n; i++) {
            console.log(carte[i]);
            carte[i].resetGame();
            delete carte[i];
        }
        for (let i = 0; i < n; i++) {
            carte.pop();
        }
        console.log(carte);
        return true;
    }


    /**
     * Algoritmo di Fisher e Yates @ https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
     * @param carte prende un array da mischiare
     * @returns {*[]} ritorna un array mischiato
     */
    function shuffle(carte) {
        const array = [...carte];
        let index = array.length;
        let temp, randomIndex;

        while (index !== 0) {
            randomIndex = Math.floor(Math.random() * index);
            index -= 1;
            temp = array[index];
            array[index] = array[randomIndex];
            array[randomIndex] = temp;
        }
        return array;
    }
}

export default Tavola;
