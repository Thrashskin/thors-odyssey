class Gameboard {
    
    constructor() {
        this.canvas = undefined;
        this.ctx = undefined;
        this.backgroundImg = new Image();
        //this.warriorImg = new Image();
        //this.fireballImg = new Image();
        this.score = 0;
        this.warrior = undefined;
        this.enemy = undefined;
        //this.enemy = new Enemy();
        //this.enemies = [];
        //TODO: are x and y really necessary here?
        this.x = undefined;
        this.y = undefined;
        this.width = undefined;
        this.height = undefined;
        this.interval = undefined;
        this.warriorHealthBar = undefined;
        this.enemyHealthBar = undefined;
    };

    init() {
        this.canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');
        this.warriorHealthBar = document.getElementById('health-warrior');
        this.enemyHealthBar = document.getElementById('health-enemy');
        this.warrior = new Warrior(this, 300, 525, 50, 75, 'images/thor.png', 2000, 15);
        this.enemy = new Enemy(this, 0, 10, 100, 125, 'images/cthulhu.png', 5000, 5);
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.start();
        //this.createAttacks();warimgriorImg
    }

    start() {
        this.clear();   
        this.drawBackground();
        this.drawWarrior(this.warrior.x, this.warrior.y, this.warrior.width, this.warrior.height);
        this.drawEnemy(this.enemy.x, this.enemy.y, this.enemy.width, this.enemy.height);
        this.interval = setInterval( () => {
            this.clear();
            this.drawBackground();
            this.enemy.move();
            this.warrior.act();
            this.drawWarrior(this.warrior.x, this.warrior.y, this.warrior.width, this.warrior.height);
            this.drawEnemy(this.enemy.x, this.enemy.y, this.enemy.width, this.enemy.height);
            this.enemy.createAttacks();
            //here goes a for loop to iterate throug all the fireballs in the game
            for (let i=0; i<this.enemy.attacks.length; i++) {
                let throwable = this.enemy.attacks[i];
                throwable.move(true);
                //this.drawThrowable(throwable.x, throwable.y, throwable.width, throwable.height, throwable);
                throwable.img.src = throwable.src;
                throwable.img.onload = () => {
                    this.ctx.drawImage(
                        throwable.img, 
                        throwable.x, 
                        throwable.y, 
                        throwable.width, 
                        throwable.height
                    );
                }

                if (throwable.hasCollided(this.warrior, false)) {
                    this.warrior.health -= throwable.damage;
                    this.drawExplosion(throwable, this.warrior.y, 'images/explosion_2.png');
                    this.enemy.attacks.splice(i, 1);
                    this.warriorHealthBar.value = this.warrior.health;
                }

                if (throwable.y > 600) {
                    this.drawExplosion(throwable, 550, 'images/explosion_2.png');
                    this.enemy.attacks.splice(i, 1);
                }



                if(this.warrior.health <= 0) {
                    this.drawDeath(this.warrior.x-20, this.warrior.y, this.warrior.width, this.warrior.height,'images/tombstone.png');
                    clearInterval(this.interval);
                }

            }

            for (let i=0; i<this.warrior.attacks.length; i++) {
                let throwable = this.warrior.attacks[i];
                throwable.move(false);
                //this.drawThrowable(throwable.x, throwable.y, throwable.width, throwable.height, throwable);
                throwable.img.src = throwable.src;
                throwable.img.onload = () => {
                    this.ctx.drawImage(
                        throwable.img, 
                        throwable.x, 
                        throwable.y, 
                        throwable.width, 
                        throwable.height
                    );
                }

                if (throwable.hasCollided(this.enemy, true)) {
                    this.enemy.health -= throwable.damage;
                    this.warrior.attacks.splice(i, 1);
                    console.log(this.enemy.health);
                    this.enemyHealthBar.value = this.enemy.health;
                    this.drawExplosion(throwable, throwable.y, 'images/explosion_2.png');
                }
                
                if (throwable.y < 0) {
                    this.warrior.attacks.splice(i, 1);
                }

                if(this.enemy.health <= 0) {
                    this.drawDeath(this.enemy.x-100, this.enemy.y - 160 ,this.enemy.width*2+40, this.enemy.height*2+20, 'images/ghost.png');
                    clearInterval(this.interval);
                }


            }
        } ,50);
    }

    

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawBackground() {
        this.backgroundImg.onload = () => {
            this.ctx.drawImage(
                this.backgroundImg,
                this.x,
                this.y,
                this.width,
                this.height
                );
        };
        this.backgroundImg.src = './images/sky.jpg';
    }

    drawWarrior(x, y, width, height) {
    
        this.warrior.characterImg.onload = () => {
            this.ctx.drawImage(
                this.warrior.characterImg, 
                x, 
                y, 
                width, 
                height);
            };
        this.warrior.characterImg.src = this.warrior.src;

        // this.ctx.beginPath();
        // this.ctx.moveTo(this.warrior.x, this.warrior.y);
        // this.ctx.lineTo(this.warrior.x, 0);
        // this.ctx.moveTo(this.warrior.x + this.warrior.width, this.warrior.y);
        // this.ctx.lineTo(this.warrior.x + this.warrior.width, 0);
        // this.ctx.moveTo(this.warrior.x - this.warrior.width, this.warrior.y);
        // this.ctx.lineTo(this.warrior.x + (this.warrior.width*2), this.warrior.y);
        // this.ctx.stroke();
    }

    drawEnemy(x, y, width, height) {

        this.enemy.characterImg.onload = () => {
            this.ctx.drawImage(
                this.enemy.characterImg, 
                x, 
                y, 
                width, 
                height);
            };
        this.enemy.characterImg.src = this.enemy.src;
    }

    // drawThrowable(x, y, width, height, throwable) {
    //     let attack = throwable;
    //     attack.img.onload = () => {
    //         this.ctx.drawImage(
    //             attack.img, 
    //             x, 
    //             y, 
    //             width, 
    //             height
    //         );
    //     };
    // }

    drawExplosion(throwable, y, src) {
        let attack = throwable;
        let explosion = new Image();
        explosion.onload = () => {
            this.ctx.drawImage(
                explosion, 
                attack.x, 
                y, 
                50, 
                50
            );
        };
        explosion.src = src;
    }

    drawDeath(x, y, width, height, src) {
        let img = new Image();
        img.src = src;
        img.onload = () => {
            this.ctx.drawImage(
                img,
                x,
                y,
                width,
                height
            );
        }
    } //valid for warrior and for enemy

}
