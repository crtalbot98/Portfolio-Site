class links{

    constructor() {
        this.links = document.querySelectorAll('.link');
    }

    addListeners(){
        if(!this.links) return;
        this.links.forEach((link) => {
            link.addEventListener('click', this.scrollIntoView.bind(this))
        })
    }

    scrollIntoView(e){
        const target = e.target.dataset.target;
        document.querySelector(`#${target}`).scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'})
    }
}

export default links;