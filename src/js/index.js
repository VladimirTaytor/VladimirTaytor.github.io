/**
 * @author Vladimir Taytor <cetncat@gmail.com>
 */
var intro = new Intro({level:1});

var items = {
  pizza: false,
  snake: false
}

const MUSIC_NAMES = {
    IN_GAME: document.getElementById('in-game-music'),
    MAIN_MENU: document.getElementById('main-menu-music'),
    INMATE: document.getElementById('inmate-music')
};

const MusicInterface = {
    play(name) {
        Array.from(document.getElementsByClassName('music'))
            .forEach(music => {
                try {
                    music.pause();
                } catch (err) {
                    console.log('Nothing');
                }
            });
        name.play();
    }
};

setTimeout(function () {
    intro.init();
}, 4000);
