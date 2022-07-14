// Module for the GameBoard
const GameBoard = (() => {
    //private
    const _boardArray = new Array(9).fill('');

    //public
    const setSquare = (index, sign) => {
        _boardArray.splice(index, 1, sign);
    }

    const getSquare = (index) => {
        return _boardArray[index];
    }

    return {
        setSquare, getSquare
    };
})();

//Module for the Display Controller
const DisplayController = ( ()=> {
    const playButton = document.querySelector('.play-button');
    const choiceButtons = document.querySelector('.choices');
    const playerVsPlayer = document.querySelector('.pvp');
    const playerVsAI = document.querySelector('.pva');
    const board = document.querySelector('.board');

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

    const initBoard = () => {
       _removePlayButton();
       _removeChoiceButtons();
    }

    return {
        playButton, choiceButtons, playerVsPlayer, playerVsAI, board, squares,
        initBoard: initBoard,
        refreshBoard: refreshBoard
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

    const _initGame = () => {
        DisplayController.initBoard();
        const playerOne = Player('x', 'player');
        const playerTwo = Player('o', (_mode == 'pvp') ? 'player' : 'AI');
        _currentTurn = playerOne;

        const squares = DisplayController.squares;
        for (let i = 0; i < squares.length; i++){
            squares[i].index = i;
            squares[i].addEventListener('click', (e)=> {
                _currentTurn.makeMove(e.target.index);
                _currentTurn = _currentTurn === playerOne ? playerTwo : playerOne;
            });
        }
    }
    
    //public

    // setup
    DisplayController.playButton.addEventListener('click', _initGame);
    DisplayController.playerVsPlayer.addEventListener('click', _changeMode);
    DisplayController.playerVsAI.addEventListener('click', _changeMode);
})();
