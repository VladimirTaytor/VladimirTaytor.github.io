/**
 * @author Vladimir Taytor <cetncat@gmail.com>
 */

class Intro {
    constructor(options){
        this.level = options.level || 1;
        this.titleWindow = document.getElementById('game-title');
        this.boss = Plot[this.level].intro.boss;
        this.containers = {
            window: document.getElementById('level-intro'),
            intro: {
                icon: document.getElementById('intro-boss-icon'),
                text: document.getElementById('intro-boss-text'),
                map: document.getElementById('intro-map-icon')
            }
        }
    }

    init() {
        this.containers.intro.icon.src = this.boss.icon;
        this.containers.intro.text.innerText = this.boss.text;
        this.containers.intro.map.src = this.boss.map;

        this.titleWindow.style.display = 'none';
        this.containers.window.style.display = 'block';

        this.loadListeners();
    }

    loadListeners() {
        document.getElementById('start-game-button')
            .addEventListener('click', e => this.startGame(e));

        document.addEventListener('keydown', e => {
            if(e.keyCode === 67 && e.shiftKey) {
               this.containers.window.style.display = 'none';
               openConversation();
           }
        });
    }

    startGame(e) {
        let game = new Game();
        this.containers.window.style.display = 'none';
        console.log('Start game')
    }
}