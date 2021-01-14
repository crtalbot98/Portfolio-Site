class hitDetector{

    constructor() {
        this.clusters = []
    }

    createClusters(list, amt){

        for(let i = amt-1; i >= 0; i--){
            let c1 = list[i];
            let cluster = [];

            for(let j = i-1; j >= 0; j--){
                if(this.detectHit(c1, list[j])){
                    cluster.push(list[j]);
                }
            }

            if(cluster.length > 1){
                let clusterExists = false;
                if(this.clusters.length > 1){
                    for(let k = 0; k < this.clusters.length; k++){
                        if(this.clusters[k].includes(c1)){
                            this.clusters[k].concat(cluster);
                            clusterExists = true
                        }
                    }
                }
                if(!clusterExists){
                    cluster.push(c1);
                    this.clusters.push(cluster);
                }
                list.pop();
            }
        }

        this.correctColors();
        return this.clusters
    }

    detectHit(c1, c2){
        const dx = c1.x - c2.x;
        const dy = c1.y - c2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if(dist < c1.r + c2.r) return true;
        return false
    }

    correctColors(){
        for(let i = 0; i < this.clusters.length; i++){
            const r = this.genRandomFromInterval(220, 255);
            const g = this.genRandomFromInterval(32, 78);
            const b = this.genRandomFromInterval(33, 79);
            for(let k = this.clusters[i].length-1; k >= 0; k--){
                this.clusters[i][k].setColor(r,g,b)
            }
        }
    }

    genRandomFromInterval(min, max){
        return Math.ceil(Math.random() * (max - min + 1) + min)
    }
}

export default hitDetector;