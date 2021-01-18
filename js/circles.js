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
            this.list.push(new circle(Math.ceil(Math.random()*this.ctx.canvas.width), Math.ceil(Math.random()*this.ctx.canvas.height)));
        }

        this.genCircle(dir, amt);

        this.list = this.list.concat(this.hitDetector.createClusters(this.list, amt));
    }

    addToCanvas(){
        const list = this.list;

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

    genCircle(dir, amt){
        for(let i = 1; i < amt; i++){
            let x = 0;
            let y = 0;
            const c1 = this.list[i-1];
            const w = c1.r*2;

            if(c1.x < 0){
                x = c1.x + w;
                dir.x = dir.x * -1;
                y = c1.y + w * dir.y
            }
            else if(c1.x > this.ctx.canvas.width){
                x = c1.x - w;
                dir.x = dir.x * -1;
                y = c1.y - w * dir.y
            }
            else if(c1.y < 0){
                y = c1.y + w;
                dir.y = dir.y * -1;
                x = c1.x + w * dir.y
            }
            else if(c1.y > this.ctx.canvas.height){
                y = c1.y - w;
                dir.y = dir.y * -1;
                x = c1.x + w * dir.y
            }
            else{
                x = c1.x + w * dir.x;
                y = c1.y + w * dir.y
            }

            this.list.push(new circle(x,y))
        }
    }
}

class circle{

    constructor(x, y) {
        this.r = this.genSize();
        this.x = x;
        this.y = y;
        this.color = 'rgba(252, 68, 69, 1)'
    }

    setColor(r,g,b){
        this.color = `rgba(${r}, ${g}, ${b}, 1)`
    }

    genSize(){
        const width = window.innerWidth.toFixed().toString();
        let mult;

        if(width > 999) mult = parseInt(width.slice(0,2))/1.25;
        else mult = parseInt(width.charAt(0));

        return Math.ceil(Math.random()* (10 - 3) + 3) * mult
    }
}

export default circleList;