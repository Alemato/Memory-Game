import {cartePossibili} from "./utils";
import Carta from "./Carta";

function Tavola(dimensione) {
    const carte = [];

    if (dimensione % 2 !== 0 && dimensione <= 8) {
        console.log("la dimensione non è valida");
    } else {
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

        return boardEl;
    }

    function creaCarte() {
        const numeroElementi = (dimensione * dimensione) / 2;
        console.log("numero Elementi : " + numeroElementi);
        const carteScelte = shuffle(cartePossibili).slice(0, numeroElementi);
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

    function addEventFlip(){
        carte.forEach(carta => {
            carta.el.addEventListener('click', function () {
                const giraCarta = new Event('flip-card');
                console.log("gira la ruota");
                carta.el.dispatchEvent(giraCarta);
            });
        });
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
