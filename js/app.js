import circleList from "./circles.js";

(function(){

    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.canvas.style.backgroundColor = '#151516';

    createCircles(ctx);

    window.addEventListener('resize', debounce(createCircles.bind(null, ctx), 150))
})();

function createCircles(ctx){
    ctx.canvas.height = window.innerHeight;
    ctx.canvas.width = window.innerWidth;

    const circles = new circleList(ctx);
    const amt = 120;

    if(circles.list.length > 0) circles.emptyList();
    circles.generateList(amt);
    circles.addToCanvas();
}

function debounce(func, time){
    let timer;
    return function(e){
        if(timer) clearTimeout(timer);
        timer = setTimeout(func, time, e);
    };
}
