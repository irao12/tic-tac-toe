// Module for the GameBoard
const GameBoard = (() => {
    //private
    const _boardArray = new Array(9).fill('');

    const _hasVertical = (index, sign) => {
        // check if there's a win vertically

        // check if the squares above have the same sign
        let squareAbove = index - 3;
        while (squareAbove >= 0) {
            // if the square above has the same sign
            if (_boardArray[squareAbove] != sign){
                return false;
            }
            squareAbove -= 3;
        }

        // check if the squares below have the same sign
        let squareBelow = index + 3;
        while (squareBelow <= 8) {
            if (_boardArray[squareBelow] != sign){
                return false;
            }
            squareBelow += 3;
        }
        return true;
    }

    const _hasHorizontal = (index, sign) => {
        // check if there's a win horizontally
        const row = Math.floor(index / 3);
        const mostLeft = row * 3;
        const mostRight = row * 3 + 2;

        // check if the squares to the left are the same
        let squareLeft = index - 1;
        while (squareLeft >= mostLeft){
            // check if the square to the left has the same sign
            if (_boardArray[squareLeft] != sign){
                return false;
            }
            squareLeft--;
        }

        let squareRight = index + 1;
        while (squareRight <= mostRight){
            // check if the square to the left has the same sign
            if (_boardArray[squareRight] != sign){
                return false;
            }
            squareRight++;
        }
        return true;
    }

    const _hasDiagonal = (sign) => {
        // diagonal from the top right
        let firstDiagonal = _boardArray[0] == _boardArray[4] && _boardArray[0] == _boardArray[8] && _boardArray[0] == sign;

        let secondDiagonal = _boardArray[2] == _boardArray[6] && _boardArray[2] == _boardArray[4] && _boardArray[2] == sign;

        return firstDiagonal || secondDiagonal;
    }

    //public
    const setSquare = (index, sign) => {
        _boardArray.splice(index, 1, sign);
    }

    const getSquare = (index) => {
        return _boardArray[index];
    }

    const isFull = () => {
        for (let i = 0; i < _boardArray.length; i++){
            if (_boardArray[i] == ''){
                return false;
            }
        }
        return true;
    }

    const hasWin = (index, sign) => {
        let vertical = _hasVertical(index, sign);
        let horizontal = _hasHorizontal(index, sign);
        let diagonal = _hasDiagonal(sign);

        console.log(vertical, horizontal, diagonal);
        return (vertical || horizontal || diagonal);
    }

    const resetBoard = () => {
        _boardArray.fill('');
    }

    return {
        setSquare, getSquare, isFull, hasWin, resetBoard
    };
})();

//Module for the Display Controller
const DisplayController = ( ()=> {
    const playButton = document.querySelector('.play-button');
    const choiceButtons = document.querySelector('.choices');
    const playerVsPlayer = document.querySelector('.pvp');
    const playerVsAI = document.querySelector('.pva');
    const board = document.querySelector('.board');
    const announcement = document.querySelector('.announcement');
    const resetButton = document.querySelector('.reset-button');

    const squares = document.querySelectorAll('.square');
    
    const _removePlayButton = () => {
        playButton.classList.remove('active-block');
        board.classList.add('active-grid');
    }

    const _removeChoiceButtons = () => {
        choiceButtons.classList.remove('active-flex');
    }

    const refreshBoard = () => {
        squares.forEach((square)=>{
            const index = square.index;
            square.textContent = GameBoard.getSquare(index);
        });
    }

    const changeTurnAnnouncement = (currentTurn) => {
        announcement.textContent = 'Player ' + currentTurn.getSign() + '\'s Turn';
    }

    const initBoard = () => {
       _removePlayButton();
       _removeChoiceButtons();
       resetButton.classList.add('active-block');
    }

    return {
        playButton, choiceButtons, playerVsPlayer, playerVsAI, board, squares, resetButton,
        initBoard: initBoard,
        refreshBoard: refreshBoard,
        changeTurnAnnouncement
    }
})();


//Factory function for the players
const Player = (sign='', mode) => {
    let _sign = sign;
    let _mode = mode;

    const setSign = (sign) => {_sign = sign};
    const getSign = () => {return _sign};
    const makeMove = (index) => {
        GameBoard.setSquare(index, _sign);
        DisplayController.refreshBoard();
    };

    return {
        setSign, getSign, makeMove
    }
}

//Module for the Game Controller
const GameController = (() => {

    //private
    let _mode = "pvp";
    let _currentTurn;

    const _changeMode = (button) => {
        const selectedMode = button.target.classList.contains('pvp') ? 'pvp' : 'pva';
        const previousMode = (selectedMode == 'pvp') ? 'pva' : 'pvp'; 

        document.querySelector('.' + previousMode).classList.remove('selected');
        button.target.classList.add('selected');

        _mode = selectedMode;
    }

    const _isDone = (index) => {
        const sign = _currentTurn.getSign();
        if (GameBoard.hasWin(index, sign)) {
            return "won";
        }
        else if (GameBoard.isFull()){
            return "tie";
        }   
        return "";
    }

    const _initGame = () => {
        DisplayController.initBoard();
       
        const playerOne = Player('X', 'player');
        const playerTwo = Player('O', (_mode == 'pvp') ? 'player' : 'AI');
        // X always goes first
        _currentTurn = playerOne;

        function initMove(e) {
            const index = e.target.index;

            // if square is empty, make the move, otherwise, ignore
            if (GameBoard.getSquare(index) == ''){
                _currentTurn.makeMove(index);

                if (_isDone(index) == 'won'){
                    console.log(_currentTurn.getSign() + ' won')
                }

                _currentTurn = _currentTurn === playerOne ? playerTwo : playerOne;
                DisplayController.changeTurnAnnouncement(_currentTurn);
            }
        }

        function _resetGame () {
            GameBoard.resetBoard();
            _currentTurn = playerOne;
            DisplayController.refreshBoard();
            DisplayController.changeTurnAnnouncement(_currentTurn);
        }

        const squares = DisplayController.squares;
        for (let i = 0; i < squares.length; i++){
            squares[i].index = i;
            squares[i].addEventListener('click', initMove);
        }

        DisplayController.changeTurnAnnouncement(_currentTurn);
        DisplayController.resetButton.addEventListener('click', _resetGame);
    }

    // setup
    DisplayController.playButton.addEventListener('click', _initGame);
    DisplayController.playerVsPlayer.addEventListener('click', _changeMode);
    DisplayController.playerVsAI.addEventListener('click', _changeMode);

})();
