const player = () => {
    let moves = [];
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
            console.log("I won");
            return true;
        }
        console.log("I made move " + x);
        return false;
    }
    const checkSpot = x => {
        for(let move of moves){
            if(move == x)
            return true;
        }
        return false;
    }
    const reset = () => {
        while(moves.length > 0)
            moves.pop();
    }
    return {makeMove, checkSpot, reset};
}

const gameBoard = (() => {
    const players = [player(), player()];
    let turn = 1;
    let victory = 0;
    const makeMove = x => { 
        if(!players[0].checkSpot(x) && !players[1].checkSpot(x))
        {
            if(players[turn].makeMove(x))
            {
                run();
                return false;
            }

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
    }
    return {run, getTurn, makeMove};
})();

const displayController = (() => {
    let displayBoard = [];
    for(let i = 0; i < 9; ++i) {
        displayBoard.push(document.getElementById('space'.concat(i)));
        displayBoard[i].addEventListener("click", function(){ handleInput(i)});
    }
    const handleInput = (x) => {
        if(gameBoard.makeMove(x))
        {
            let turn = gameBoard.getTurn();
            displayBoard[x].innerHTML = turn == 0 ? "X" : "O";
        }
    }
    const addX = (x) => { displayBoard[x].innerHTML = "X"; }
    const addO = (x) => { displayBoard[x].innerHTML = "O"; }
    const reset = () => { for(let element of displayBoard) { element.innerHTML = ""; }}
    return {addX, addO, reset};
})();

gameBoard.run();