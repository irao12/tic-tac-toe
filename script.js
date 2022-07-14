// Module for the GameBoard
const GameBoard = (() => {

    const _boardArray = new Array(9).fill(0, '');
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
