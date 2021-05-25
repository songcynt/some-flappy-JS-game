class Pipe{
    constructor(){
        this.x = 500;
        this.height = Math.random()*60
        this.gap = 430;
    }

    move(){
        this.x -= 2;
    }
    /**
    * @param {number} playerX - the player's x coordinate
    * @param {number} playerY - the player's y coordinate
    */
    checkCollision(playerX, playerY){
        if (playerX >= this.x - 60 && playerX <= this.x + 60){
            console.log("PIPE IN RANGE!!!");
            if (playerY < this.height + 130 || playerY > this.height + this.gap - 130){
                return true;
            }
        }
        return false;
    }

    checkOffMap(){
        if (this.x == 20){
            this.x = 500;
            this.height = Math.random()*60
            return true;
        }
        return false;
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.height;
    }

    /**
    * @param {number} newX - the pipe's x coordinate
    */
    setX(newX){
        this.x = newX;
    }

    getGapBottom(){
        let val = this.height + this.gap;
        return val;
    }
}