

const gameBoard = (() => {

})();

const displayController = (() => {
    let displayBoard = [];
    for(let i = 0; i < 9; ++i) {
        displayBoard.push(document.getElementById('space'.concat(i)));
    }
    
    const addX = (x) => { displayBoard[x].innerHTML = "X"; }
    const addO = (x) => { displayBoard[x].innerHTML = "O"; }
    const reset = () => { for(let element of displayBoard) { element.innerHTML = ""; }}
    return {addX, addO, reset};
})();

const player = () => {
    let moves = [];
    const makeMove = x => {
        moves.push(x);
    }
}

