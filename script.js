//Module for the Display Controller
const DisplayController = ( ()=> {
    const playButton = document.querySelector('.play-button');
    const choiceButtons = document.querySelector('.choices');
    const playerVsPlayer = document.querySelector('.pvp');
    const playerVsAI = document.querySelector('.pva');
    const board = document.querySelector('.board');
    
    const _removePlayButton = () => {
        playButton.classList.remove('active-block');
        board.classList.add('active-grid');
    }

    const _removeChoiceButtons = () => {
        choiceButtons.classList.remove('active-flex');
    }

    const initBoard = () => {
       _removePlayButton();
       _removeChoiceButtons();
    }

    return {
        playButton, choiceButtons, playerVsPlayer, playerVsAI, board,
        initBoard: initBoard
    }
})();

// Module for the GameBoard
const GameBoard = (() => {
    //private
    const _boardArray = new Array(9).fill(0, '');
    //public
    const setSquare = (index, sign) => {
        _boardArray.splice(index, 1, sign);
    }

    return {
        setSquare
    };
})();

//Factory function for the players
const Player = (sign='') => {
    let _sign = sign;

    const setSign = (sign) => {_sign = sign};
    const getSign = () => {return _sign};

    return {
        setSign, getSign
    }
}

//Module for the Game Controller
const GameController = (() => {

    //private
    let _mode = "pvp";

    const _changeMode = (button) => {
        const selectedMode = button.target.classList.contains('pvp') ? 'pvp' : 'pva';
        const previousMode = (selectedMode == 'pvp') ? 'pva' : 'pvp'; 

        document.querySelector('.' + previousMode).classList.remove('selected');
        button.target.classList.add('selected');

        _mode = selectedMode;
    }
    //public
    

    // setup
    DisplayController.playButton.addEventListener('click', DisplayController.initBoard);
    DisplayController.playerVsPlayer.addEventListener('click', _changeMode);
    DisplayController.playerVsAI.addEventListener('click', _changeMode);
})();

