var GameMenu = function() {};


GameMenu.prototype = {
    
    menuConfig: {
        startY: 260,
        startX: 30
    },
    
    preload: function () {
        game.load.image('menu', 'assets/images/menubg.jpg')
    },
  
    init: function () {
//        game.load.images('menu-bg', 'assets/menu-bg.jpg');
        this.titleText = game.make.text(game.world.centerX, 100, "SPACE FACE COLOR EXPLOSION V", {
            font: 'bold 32pt TheMinion',
            fill: '#FDFFB5',
            align: 'center'
        });
        this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        this.titleText.anchor.set(0.5);
        this.optionCount = 1;
    },
    
    create: function () {
        
        if (music.name !== "dangerous" && playMusic) {
            music.stop();
            music = game.add.audio('dangerous');
            music.loop = true;
            music.play();
        }
        game.stage.disableVisibilityChange = true;
        var men = game.add.sprite(0, 0, 'menu');
        men.scale.setTo(2, 2);
        game.add.existing(this.titleText);
        
        this.addMenuOption('Start', function () {
            game.state.start('Game');
        });
        this.addMenuOption('Options', function () {
            game.state.start("Options");
        });
//        this.addMenuOption('Credits', function () {
//            game.state.start("Credits");
//        });
    }
};

Phaser.Utils.mixinPrototype(GameMenu.prototype, mixins);