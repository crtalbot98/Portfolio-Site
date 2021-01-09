class hitDetector{

    detectHit(newCircle, list){
        let touching = [];
        let i = 0;

        for(i; i < list.length; i++){
            const circle = list[i];
            const dx = newCircle.x - circle.x;
            const dy = newCircle.y - circle.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if(dist < newCircle.r + circle.r){
                touching.push(circle);
                touching.push(newCircle);
            }
        }

        if(touching.length > 1){
            list.splice(i,1);
            list.push(touching)
        }
        else{
            list.push(newCircle)
        }
    }
}

export default hitDetector;