class Player{
    constructor(){
        this.x = 100;
        this.y = 100;
        this.gravity = 2;

    }

    fall(){
        if (this.y > 0){
            this.y -= this.gravity;
        }
    }

    flap(){
        if (this.y < 500){
            this.y += 25*this.gravity;
        }
    }
    
    checkOnGround(){
        if (this.y <= 0){
            return true;
        }
        return false;
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }
}