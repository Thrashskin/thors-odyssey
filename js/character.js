class Character {
    constructor(gameboard, x, y, width, height, src, health, pace) {
        this.gameboard = gameboard;
        this.ctx = gameboard.ctx;
        this.attacks = [];
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.characterImg = new Image();
        this.src = src;
        this.attacks = [];
        this.health = health;
        this.pace = pace;
    }

    // drawCharacter() {
    //     // this.characterImg.onload = () => {
    //     //     this.ctx.drawImage(
    //     //         this.characterImg, 
    //     //         this.x, 
    //     //         this.y, 
    //     //         this.width, 
    //     //         this.height);
    //     // };

    //     // this.characterImg.src = this.src;
    // }  
}