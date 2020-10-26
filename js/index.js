window.onload = function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let backGroundImg = new Image();

    backGroundImg.onload = () => {
            ctx.drawImage(backGroundImg, 0, 0, canvas.width, canvas.height);
        };

    backGroundImg.src = '/images/sky.jpg';

    document.getElementById('start-button').addEventListener('click', () => {
        startGame();
    });

    function startGame() {
        const gameboard = new Gameboard();
        gameboard.init();
    }
};