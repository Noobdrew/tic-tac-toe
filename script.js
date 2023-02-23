//display controller module
const gameBoard = (() => {
    //all dom element manupulation is done here

    const cells = document.getElementsByClassName('cell')
    const cellsArr = Array.from(cells)
    const reset = document.querySelector('.reset')
    const winnerText = document.querySelector('.winner')

    //reload the game
    function reloadPage() {
        window.location.reload()
    }
    reset.addEventListener('click', reloadPage)

    let counter = 0
    const gameArray = []
    gameArray[0] = 'game'
    let turn = 0
    let gameState = 'active'
    winnerText.textContent = "Player X's turn"
    const winCombos = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ]
    let winner = null


    cellsArr.forEach(element => {
        element.addEventListener('click', playGame)
    });


    function playGame(e) {
        //check if cell is empty
        if (e.target.classList.contains('cell-x') ||
            e.target.classList.contains('cell-o')) {
            return
        }
        if (gameState == 'over') {
            return
        }
        //place x in cell and in array at same index
        if (counter % 2 == 0) {
            e.target.classList.add('cell-x')
            gameArray[e.target.dataset.cell] = 'x'
            counter++
            turn++
            winnerText.textContent = "Player O's turn"
            //place o in cell and in array at same index  
        } else {
            e.target.classList.add('cell-o')
            gameArray[e.target.dataset.cell] = 'o'
            counter++
            turn++
            winnerText.textContent = "Player X's turn"

        }

        //check for winner
        let xPlays = gameArray.reduce((a, e, i) =>
            //creates an array with playerX moves
            (e === 'x') ? a.concat(i) : a, []);
        let oPlays = gameArray.reduce((a, e, i) =>
            //creates an array with playerO moves
            (e === 'o') ? a.concat(i) : a, []);
        for (let [index, combo] of winCombos.entries()) {
            //itterates over all possible win combos 
            if (combo.every(elem => xPlays.indexOf(elem) > -1)) {
                //if win combo matches player x this runs
                console.log('player X wins')
                winner = 'Player X wins'
                gameState = 'over'
                winnerText.textContent = winner
                winnerText.classList.add('visible')
            } else if (combo.every(elem => oPlays.indexOf(elem) > -1)) {
                //if win combo matches player o this runs
                console.log('player O wins')
                winner = 'Player O wins'
                gameState = 'over'
                winnerText.textContent = winner
                winnerText.classList.add('visible')
            }
        }
        if (winner == null && turn == 9) {
            //if win combo matches no one this runs
            console.log('Draw')
            winner = 'Its a tie'
            gameState = 'over'
            winnerText.textContent = winner
            winnerText.classList.add('visible')
        }
    }

})();

