import hitDetector from './hitDetector.js';

class circleList {

    constructor(ctx) {
        this.list = [];
        this.ctx = ctx;
        this.hitDetector = new hitDetector();
    }

    generateList(amt){
        let dir = {
            x: this.randDirection(),
            y: this.randDirection()
        };

        if(this.list.length < 1){
            this.list.push(new circle(Math.ceil(Math.random()*this.ctx.canvas.width), Math.ceil(Math.random()*this.ctx.canvas.height), this.genSize()));
        }

        for(let i = 1; i < amt; i++){
            this.genCircle(dir, i);
            this.correctColors(i)
        }
    }

    addToCanvas(){
        const list = this.list;
        let k = 0;

        for(let i = 0; i < list.length; i++){
            this.ctx.beginPath();

            if(Array.isArray(list[i])){
                for(let k = 0; k < list[i].length; k++){
                    this.ctx.fillStyle = list[i][k].color;
                    this.ctx.arc(list[i][k].x, list[i][k].y, list[i][k].r, 0, 2 * Math.PI);
                    this.ctx.closePath();
                    this.ctx.fill();
                }
            }
            else{
                this.ctx.fillStyle = list[i].color;
                this.ctx.arc(list[i].x, list[i].y, list[i].r, 0, 2 * Math.PI);
                this.ctx.closePath();
                this.ctx.fill();
            }
        }
    }

    emptyList(){
        this.list = [];
    }

    randDirection(){
        return Math.random() < 0.5 ? -1 : 1;
    }

    genSize(){
        return Math.ceil(Math.random()* (120 - 20) + 20)
    }

    genCircle(dir, i){
        let preCircle = this.list[i-1];
        let w = this.list[i-1].r*2;

        if(Array.isArray(preCircle)){
            preCircle = this.list[i-1][0];
            w = this.list[i-1][0].r*2
        }

        const r = this.genSize();
        let x = 0;
        let y = 0;

        if(preCircle.x < 0){
            x = preCircle.x + w;
            dir.x = dir.x * -1;
            y = preCircle.y + w * dir.y
        }
        else if(preCircle.x > this.ctx.canvas.width){
            x = preCircle.x - w;
            dir.x = dir.x * -1;
            y = preCircle.y - w * dir.y
        }
        else if(preCircle.y < 0){
            y = preCircle.y + w;
            dir.y = dir.y * -1;
            x = preCircle.x + w * dir.y
        }
        else if(preCircle.y > this.ctx.canvas.height){
            y = preCircle.y - w;
            dir.y = dir.y * -1;
            x = preCircle.x + w * dir.y
        }
        else{
            x = preCircle.x + w * dir.x;
            y = preCircle.y + w * dir.y
        }

        let newCircle = new circle(x,y,r);

        this.hitDetector.detectHit(newCircle, this.list);
    }

    correctColors(i){
        if(Array.isArray(this.list[i])){
            for(let k = 0; k < this.list[i].length; k++){
                const r = 252+(k*4);
                const g = 68+(k*4);
                const b = 69+(k*4);
                this.list[i][k].setColor(r,g,b)
            }
        }
    }
}

class circle{

    constructor(x, y, r) {
        this.r = r;
        this.x = x;
        this.y = y;
        this.color = 'rgba(255, 255, 255, 1)'
    }

    setColor(r,g,b){
        this.color = `rgba(${r}, ${g}, ${b}, 1)`
    }
}

export default circleList;