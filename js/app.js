import circleList from "./circles.js";
import cards from "./cards.js";
import links from "./links.js";

(function(){

    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const cardsEvt = new cards();
    const linksEvt = new links();

    cardsEvt.addListeners();
    linksEvt.addListeners();

    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.canvas.style.backgroundColor = '#3feee6';

    createCircles(ctx);

    window.addEventListener('resize', debounce(createCircles.bind(null, ctx), 150))
})();

function createCircles(ctx){
    ctx.canvas.height = window.innerHeight;
    ctx.canvas.width = window.innerWidth;
    const circles = new circleList(ctx);
    let amt = 120;

    if(window.innerWidth <= 500){
        amt = 80
    }

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
