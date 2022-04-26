function Menu(gameContainer) {
    const {menuContainer, dif2per2, dif4per4, dif6per6, dif8per8} = createDOM();
    this.menuContainer = menuContainer;
    this.dif2per2 = dif2per2;
    this.dif4per4 = dif4per4;
    this.dif6per6 = dif6per6;
    this.dif8per8 = dif8per8;

    function createDOM() {
        const menuContainer = document.createElement('div');
        menuContainer.classList.add('menu-container');
        menuContainer.innerHTML = `<h1 class="menu-text">🧠 Memory Game 🧠<br>Scegli una difficoltà</h1>`;

        const difficoltaContainer = document.createElement('div');
        difficoltaContainer.classList.add('menu-difficolta');

        const dif2per2 = document.createElement('button');
        dif2per2.innerText = "2 x 2";
        dif2per2.classList.add('btn-start');

        difficoltaContainer.appendChild(dif2per2);

        const dif4per4 = document.createElement('button');
        dif4per4.innerText = "4 x 4";
        dif4per4.classList.add('btn-start');

        difficoltaContainer.appendChild(dif4per4);

        const dif6per6 = document.createElement('button');
        dif6per6.innerText = "6 x 6";
        dif6per6.classList.add('btn-start');

        difficoltaContainer.appendChild(dif6per6);

        const dif8per8 = document.createElement('button');
        dif8per8.innerText = "8 x 8";
        dif8per8.classList.add('btn-start');

        difficoltaContainer.appendChild(dif8per8);

        menuContainer.appendChild(difficoltaContainer);

        gameContainer.appendChild(menuContainer);

        return {menuContainer, dif2per2, dif4per4, dif6per6, dif8per8};
    }

    dif2per2.addEventListener('click', function () {
        menuContainer.classList.add('flipped');
        const startGame = new CustomEvent('startGame', {detail: {dimensioni: 2}});
        menuContainer.dispatchEvent(startGame);
    });

    dif4per4.addEventListener('click', function () {
        menuContainer.classList.add('flipped');
        const startGame = new CustomEvent('startGame', {detail: {dimensioni: 4}});
        menuContainer.dispatchEvent(startGame);
    });

    dif6per6.addEventListener('click', function () {
        menuContainer.classList.add('flipped');
        const startGame = new CustomEvent('startGame', {detail: {dimensioni: 6}});
        menuContainer.dispatchEvent(startGame);
    });

    dif8per8.addEventListener('click', function () {
        menuContainer.classList.add('flipped');
        const startGame = new CustomEvent('startGame', {detail: {dimensioni: 8}});
        menuContainer.dispatchEvent(startGame);
    });

    this.removeMenu = function () {
        gameContainer.removeChild(menuContainer);
    }
}

export default Menu;
