class SlideStory{
    constructor(id){
        this.slidestory = document.querySelector(`[data-slide="${id}"]`);
        this.activestory = 0;
        this.init();
    }

    activeSlideStory(index){
        this.activestory = index;
        this.items.forEach(item => item.classList.remove('active'));
        this.items[index].classList.add('active');
        this.thumbItems.forEach(item => item.classList.remove('active'));
        this.thumbItems[index].classList.add('active');
        console.log(this.items[index]);
        this.autoSlide();
    }

    prev(){
        if(this.activestory > 0){
            this.activeSlideStory(this.activestory - 1);
        }else{
            this.activeSlideStory(this.items.length - 1)
        }
        
    }

    next(){
        if(this.activestory < this.items.length - 1){
            this.activeSlideStory(this.activestory + 1);
        }else{
            this.activeSlideStory(0);
        }
    }

    addNavigation(){
        const nextBtn = this.slidestory.querySelector('.slide-story-next');
        const prevBtn = this.slidestory.querySelector('.slide-story-prev');
        nextBtn.addEventListener('click', this.next);
        prevBtn.addEventListener('click', this.prev);
    }

    addThumbItems(){
        this.items.forEach(()=> (this.thumb.innerHTML += `<span></span>`));
        this.thumbItems = Array.from(this.thumb.children);
        console.log(this.thumbItems);
    }

    autoSlide(){
        clearTimeout(this.timeout);
        this.timeout = setTimeout(this.next, 5000);
    }

    init(){
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.items = this.slidestory.querySelectorAll('.slide-story-items > *');
        this.thumb = this.slidestory.querySelector('.slide-story-thumb');
        this.addThumbItems();
        this.activeSlideStory(0);
        this.addNavigation();
    }
}

new SlideStory('slide-story');

