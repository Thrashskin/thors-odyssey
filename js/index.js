window.onload = () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let backGroundImg = new Image();

    backGroundImg.onload = () => {
            ctx.drawImage(backGroundImg, 0, 0, canvas.width, canvas.height);
        };

    backGroundImg.src = 'https://github.com/Thrashskin/thors-odyssey/blob/gh-pages/images/sky.jpg';

    document.getElementById('start-button').addEventListener('click', () => {
        startGame();
    });

    function startGame() {
        const gameboard = new Gameboard();
        gameboard.init();
    }
};
