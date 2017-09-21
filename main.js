var
    game = new Phaser.Game(1000, 800, Phaser.AUTO, 'game'),
    Main = function () {},
    gameOptions = {
        playSound: true,
        playMusic: true
    },
    musicPlayer;

Main.prototype = {
    
    preload: function () {
        game.load.image('load', 'assets/images/loadScreen.png');
        game.load.image('loading', 'assets/images/loading.png');
        game.load.image('logo', 'assets/images/logo.png');
        game.load.script('polyfill', 'lib/polyfill.js');
        game.load.script('utils', 'lib/utils.js');
        game.load.script('splash', 'states/Splash.js');
    },
    
    create: function () {
        game.state.add('Splash', Splash);
        game.state.start('Splash');
    }
    
};

game.state.add('Main', Main);
game.state.start('Main');