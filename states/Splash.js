var Splash = function () {};

Splash.prototype = {
    
    loadScripts: function () {
        game.load.script('style', 'lib/style.js');
        game.load.script('mixins', 'lib/mixins.js');
        game.load.script('WebFont', 'vendor/webfontloader.js');
        game.load.script('gamemenu', 'states/gamemenu.js');
        game.load.script('game', 'states/Game.js');
        game.load.script('gameover', 'states/gameover.js');
        game.load.script('Credits', 'states/credits.js');
        game.load.script('options', 'states/options.js');
    },
    
    loadBgm: function () {
        game.load.audio('dangerous', 'assets/bgm/Heinous Genius.mp3');
        game.load.audio('exit', 'assets/bgm/Exit the Premises.mp3');
    },
    
    loadImages: function () {
//        game.load.images('menubg', 'assets/images/menubg.jpg');
        game.load.image('optionsbg', 'assets/images/optionsbg.jpg');
        game.load.images('gameoverbg', 'assets/images/gameoverbg.jpg');
    },
    
    loadFonts: function () {
        WebFontConfig = {
            custom: {
                families: ['TheMinion'],
                urls: ['assets/style/theminion.css']
            }
        }
    },
    
    init: function () {
        this.loadingBar = game.make.sprite(game.world.centerX-(387/2), 400, "loading");
        this.logo = game.make.sprite(game.world.centerX, 200, 'logo');
        this.status = game.make.text(game.world.centerX, 380, 'Loading...', {fill: 'white'});
        utils.centerGameObjects([this.logo, this.status]);
    },
    
    preload: function () {
        game.add.sprite(0, 0, 'load');
        game.add.existing(this.logo).scale.setTo(0.5);
        game.add.existing(this.loadingBar);
        game.add.existing(this.status);
        this.load.setPreloadSprite(this.loadingBar);
        
        this.loadScripts();
        this.loadImages();
        this.loadFonts();
        this.loadBgm();
        
    },
    
    addGameStates: function () {
        
        game.state.add('GameMenu', GameMenu);
        game.state.add('Game', Game);
        game.state.add('GameOver', GameOver);
        game.state.add("Credits", Credits);
        game.state.add("Options", Options);
    },
    
    addGameMusic: function () {
        music = game.add.audio('dangerous');
        music.loop = true;
        music.play();
    },
    
    create: function() {
        this.status.setText('Ready!');
        this.addGameStates();
        this.addGameMusic();
        
        setTimeout(function () {
            game.state.start('GameMenu');
        }, 1000);
    }
};