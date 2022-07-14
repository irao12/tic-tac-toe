//Module for the Display Controller
const DisplayController = ( ()=> {
    const playButton = document.querySelector('.play-button');
    const board = document.querySelector('.board');
    
    const _removePlayButton = () => {
        playButton.classList.add('inactive');
        board.classList.add('active-grid');
    }

    const initBoard = () => {
       _removePlayButton();
    }

    return {
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
    const playButton = document.querySelector('.play-button');
    playButton.addEventListener('click', DisplayController.initBoard);
})();

