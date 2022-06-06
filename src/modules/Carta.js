function Carta(nome, simbolo) {
    this.nome = nome;
    this.simbolo = simbolo;
}

function CartaProtoObj() {
    this.flipped = false;
    this.blocked = false;

    this.flip = function (blocked) {
        console.log("ruota la carta");
        console.log(this);
        if (blocked) {
            if (this.flipped) {
                if (this.blocked) {
                    console.log("non puoi coprire la carta");
                } else {
                    console.log("coprire la carta");
                    if (typeof this.el !== 'undefined') {
                        this.el.classList.remove('flipped');
                        this.flipped = false;
                        this.blocked = blocked;
                    }
                }
            } else {
                console.log("scopri carta");
                if (typeof this.el !== 'undefined') {
                    this.el.classList.add('flipped');
                    this.flipped = true;
                    this.blocked = blocked;
                }
            }
        } else {
            if (typeof this.el !== 'undefined') {
                this.el.classList.remove('flipped');
                this.flipped = false;
                this.blocked = blocked;
            }
        }

    }

    this.createDOM = function () {
        /*
        <div class="card">
             <div class="card-front"></div>
             <div class="card-back">🥔</div>
        </div>
         */
        const containerCard = document.createElement('div');
        const frontCard = document.createElement('div');
        const backCard = document.createElement('div');
        containerCard.classList.add('card');
        frontCard.classList.add('card-front');
        backCard.classList.add('card-back');
        backCard.innerText = this.simbolo;
        containerCard.appendChild(frontCard);
        containerCard.appendChild(backCard);
        this.el = containerCard;

        containerCard.addEventListener('click', function (){
            const giraCarta = new Event('flip-card');
            containerCard.dispatchEvent(giraCarta);
        });

        return containerCard;
    }

    this.resetGame = function () {
        console.log("rimuovo l'event listener flip-card");
        const containerCard = this.el;
        containerCard.removeEventListener('click', function (){
            const giraCarta = new Event('flip-card');
            containerCard.dispatchEvent(giraCarta);
        });
    }


}

Carta.prototype = new CartaProtoObj();

export default Carta;
