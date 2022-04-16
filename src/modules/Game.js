function Game() {
    console.log("Game is Stat!");

    this.printFist = printFirst;

    function printFirst() {
        console.log("Fist!");
        console.log("Second!");
        console.log("Third!");
    }
}
export default Game;
