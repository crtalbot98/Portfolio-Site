class cards{

    constructor() {
        this.nodes = document.querySelectorAll('.card');
    }

    addListeners(){
        this.nodes.forEach((card)=> {
            card.addEventListener('mouseenter', this.hover.bind(this));
            card.addEventListener('mouseleave', this.leave.bind(this))
        });
    }

    hover(e){
        const hoverEle = this.hoverEle(e.target);
        if(!hoverEle) return;
        hoverEle.classList.remove('hidden');
        hoverEle.classList.add('visible')
    }

    leave(e){
        const hoverEle = this.hoverEle(e.target);
        if(!hoverEle) return;
        hoverEle.classList.remove('visible');
        hoverEle.classList.add('hidden')
    }

    hoverEle(target){
        return target.querySelector('.hoverMenu');
    }
}

export default cards;