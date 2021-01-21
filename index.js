const player = () => {
    let moves = [];
    let victory = false;
    const makeMove = x => {
        moves.push(x);
        if(moves.includes(0) && moves.includes(1) && moves.includes(2) ||
        moves.includes(3) && moves.includes(4) && moves.includes(5) ||
        moves.includes(6) && moves.includes(7) && moves.includes(8) ||
        moves.includes(0) && moves.includes(3) && moves.includes(6) ||
        moves.includes(1) && moves.includes(4) && moves.includes(7) ||
        moves.includes(2) && moves.includes(5) && moves.includes(8) ||
        moves.includes(0) && moves.includes(4) && moves.includes(8) ||
        moves.includes(2) && moves.includes(4) && moves.includes(6))
        {
            console.log("I won!");
            victory = true;
            return true;
        }
        console.log("I made move " + x);
        return false;
    }
    const check = x => {
        if(victory)
            return true;
        for(let move of moves){
            if(move == x)
            return true;
        }
        return false;
    }
    const reset = () => {
        while(moves.length > 0)
            moves.pop();
        victory = false;
    }
    return {makeMove, check, reset};
}

const gameBoard = (() => {
    const players = [player(), player()];
    let turn = 1;
    let numMoves = 0;
    document.getElementById('button').addEventListener("click", function(){ run();});
    const makeMove = x => { 
        if(!players[0].check(x) && !players[1].check(x))
        {
            numMoves++;
            if(players[turn].makeMove(x))
                displayController.displayMessage(`${turn==0?"O":"X"} won!`);
            if(numMoves==9)
                displayController.displayMessage("Draw!");
            turn = turn==0?1:0;
            return true;
        }
        return false;
    }
    const getTurn = () => turn;
    const run = () => {
        turn = Math.random() < 0.5 ? 0 : 1;
        displayController.reset();
        players[0].reset();
        players[1].reset();
        numMoves = 0;
    }
    return {run, getTurn, makeMove};
})();

const displayController = (() => {
    let displayBoard = [];
    let message = document.getElementById('message');
    for(let i = 0; i < 9; ++i) {
        displayBoard.push(document.getElementById('space'.concat(i)));
        displayBoard[i].addEventListener("click", function(){ handleInput(i)});
    }
    const handleInput = (x) => {
        if(gameBoard.makeMove(x))
        {
            let turn = gameBoard.getTurn()==0 ? "X" : "O";
            displayBoard[x].innerHTML = turn;
        }
    }
    const displayMessage = (x) => {message.innerHTML = x; }
    const addX = (x) => { displayBoard[x].innerHTML = "X"; }
    const addO = (x) => { displayBoard[x].innerHTML = "O"; }
    const reset = () => { 
        for(let element of displayBoard) { element.innerHTML = ""; }
        message.innerHTML = "";
    }
    return {addX, addO, reset, displayMessage};
})();

gameBoard.run();