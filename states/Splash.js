var Splash = function () {};

Splash.prototype = {
    
    loadScripts: function () {
        game.load.script('style', 'lib/style.js');
        game.load.script('mixins', 'lib/mixins.js');
        game.load.script('gamemenu', 'states/GameMenu.js');
        game.load.script('game', 'states/Game.js');
        game.load.script('gameover', 'states/GameOver.js');
    },
    
    loadImages: function () {
        game.load.images('menu-bg', 'assets/menu-bg.jpg');
        game.load.images('gameover-bg', 'assets/gameover-bg.jpg');
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
        
    },
    
    addGameStates: function () {
        
        game.state.add('GameMenu', GameMenu);
        game.state.add('Game', Game);
        game.state.add('GameOver', GameOver);
    },
    
    create: function() {
        this.status.setText('Ready!');
        this.addGameStates();
        
        setTimeout(function () {
            game.state.start('GameMenu');
        }, 1000);
    }
};