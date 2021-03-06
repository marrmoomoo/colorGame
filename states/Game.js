var Game = function(game) {};

var bg;
var player;
var laneSC;
var laneY;
var laneDR;
var laneM;
var laneC;
var orbs;
var obstacles;
var obstacle;
var grav;

var cursors;

var score = 0;
var scoreText;
var timer;

var n = 2;
var coordinates = [{x: 250}, {x: 350}, {x: 450}, {x: 550}, {x: 650}];

var heroCollection = ['herosc', 'heroy', 'herodr', 'herom', 'heroc'];

var spawnAllowed = true;

var i1;
var i2;
var i3;
var i4;
var i5;
var j1;
var j2;
var j3;
var j4;
var j5;
var randi1 = 1300;
var randi2 = 300;
var randi3 = 2300;
var randi4 = 3300;
var randi5 = 700;
var randj1 = 7300;
var randj2 = 1300;
var randj3 = 2600;
var randj4 = 800;
var randj5 = 900;
function randomObGrav() {
    return Math.floor(Math.random() * (450 - 50)) + 50;
}
function randomOrbGrav() {
    return Math.floor(Math.random() * (400 - 200)) + 200;
}
function heroHappiness() {
    if (player.key == 'heroc' && score < 25000) {
        player.loadTexture('heroc');
    } else if (player.key == 'heroc' && score > 25000 && score < 75000) {
        player.loadTexture('herochappy');
    } else if (player.key == 'heroc' && score > 75000) {
        player.loadTexture('herocsuper');
    }
    if (player.key == 'herom' && score < 25000) {
        player.loadTexture('herom');
    } else if (player.key == 'herom' && score > 25000 && score < 75000) {
        player.loadTexture('heromhappy');
    } else if (player.key == 'herom' && score > 75000) {
        player.loadTexture('heromsuper');
    }
    if (player.key == 'heroy' && score < 25000) {
        player.loadTexture('heroy');
    } else if (player.key == 'heroy' && score > 25000 && score < 75000) {
        player.loadTexture('heroyhappy');
    } else if (player.key == 'heroy' && score > 75000) {
        player.loadTexture('heroysuper');
    }
    if (player.key == 'herodr' && score < 25000) {
        player.loadTexture('herodr');
    } else if (player.key == 'herodr' && score > 25000 && score < 75000) {
        player.loadTexture('herodrhappy');
    } else if (player.key == 'herodr' && score > 75000) {
        player.loadTexture('herodrsuper');
    }
    if (player.key == 'herosc' && score < 25000) {
        player.loadTexture('herosc');
    } else if (player.key == 'herosc' && score > 25000 && score < 75000) {
        player.loadTexture('heroschappy');
    } else if (player.key == 'herosc' && score > 75000) {
        player.loadTexture('heroscsuper');
    }
}

Game.prototype = {
    preload: function () {
        this.optionCount = 1;

        game.load.spritesheet('bg', 'assets/images/fallingStarsSheet.jpg', 212, 160);
        game.load.image('hd', 'assets/images/hitDetection.png');
        game.load.image('sclane', 'assets/images/laneSpaceCadet.png');
        game.load.image('ylane', 'assets/images/laneYellow.png');
        game.load.image('drlane', 'assets/images/laneDarkRaspberry.png');
        game.load.image('mlane', 'assets/images/laneMalachite.png');
        game.load.image('clane', 'assets/images/laneCrimson.png');
        game.load.image('herosc', 'assets/images/heroSpaceCadet.png');
        game.load.image('heroschappy', 'assets/images/heroSpaceCadetHappy.png');
        game.load.image('heroscsuper', 'assets/images/heroSpaceCadetSuper.png');
        game.load.image('heroy', 'assets/images/heroYellow.png');
        game.load.image('heroyhappy', 'assets/images/heroYellowHappy.png');
        game.load.image('heroysuper', 'assets/images/heroYellowSuper.png');
        game.load.image('herodr', 'assets/images/heroDarkRaspberry.png');
        game.load.image('herodrhappy', 'assets/images/heroDarkRaspberryHappy.png');
        game.load.image('herodrsuper', 'assets/images/heroDarkRaspberrySuper.png');
        game.load.image('herom', 'assets/images/heroMalachite.png');
        game.load.image('heromhappy', 'assets/images/heroMalachiteHappy.png');
        game.load.image('heromsuper', 'assets/images/heroMalachiteSuper.png');
        game.load.image('heroc', 'assets/images/heroCrimson.png');
        game.load.image('herochappy', 'assets/images/heroCrimsonHappy.png');
        game.load.image('herocsuper', 'assets/images/heroCrimsonSuper.png');
        game.load.image('orb', 'assets/images/colorOrb.png');
        game.load.spritesheet('bomb', 'assets/images/bombs.png', 60, 60);
        game.load.spritesheet('explosion', 'assets/images/explostionSheet.png', 100, 100)
        game.load.audio('splodesound', 'assets/bgm/Explosion.mp3');

    },

    addMenuOption: function(text, callback) {
        var optionStyle = { font: '30pt TheMinion', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
        var txt = game.add.text(game.world.centerX, (this.optionCount * 80) + 200, text, optionStyle);
        txt.anchor.setTo(0.5);
        txt.stroke = "rgba(0,0,0,0";
        txt.strokeThickness = 4;
        var onOver = function (target) {
            target.fill = "#FEFFD5";
            target.stroke = "rgba(200,200,200,0.5)";
            txt.useHandCursor = true;
        };
        var onOut = function (target) {
            target.fill = "white";
            target.stroke = "rgba(0,0,0,0)";
            txt.useHandCursor = false;
        };
        //txt.useHandCursor = true;
        txt.inputEnabled = true;
        txt.events.onInputUp.add(callback, this);
        txt.events.onInputOver.add(onOver, this);
        txt.events.onInputOut.add(onOut, this);

        this.optionCount ++;


  },

    create: function () {

        game.physics.startSystem(Phaser.Physics.ARCADE);

        bg = game.add.sprite(0, 0, 'bg');
        bg.scale.setTo(5, 5);
        bg.animations.add('scroll');
        bg.animations.play('scroll', 15, true);

        laneC = game.add.sprite(250, -200, 'clane');
        game.physics.arcade.enable(laneC);
        laneDR = game.add.sprite(350, -200, 'drlane');
        game.physics.arcade.enable(laneDR);
        laneY = game.add.sprite(450, -200, 'ylane');
        game.physics.arcade.enable(laneY);
        laneM = game.add.sprite(550, -200, 'mlane');
        game.physics.arcade.enable(laneM);
        laneSC = game.add.sprite(650, -200, 'sclane');
        game.physics.arcade.enable(laneSC);

        player = game.add.sprite(450, 670, 'heroy');

        game.physics.arcade.enable(player);

        player.body.collideWorldBounds = true;

        orbs = game.add.group();
        orbs.enableBody = true;
    //    randOrb1Spawn();
    //    var orb = orbs.create(485, 50, 'orb');
    //    orb.body.gravity.y = 300;

        obstacles = game.add.group();
        obstacles.enableBody = true;
    //    randOb1Spawn();
    //    var obstacle = obstacles.create(370, -25, 'obstacle');
    //    obstacle.body.gravity.y = 50;
    //    createNewOb();



        scoreText = game.add.text(250, 16, 'Score: 0', { fontSize: '32px', fill: '#000'});

        cursors = game.input.keyboard.createCursorKeys();
        cursors.left.onDown.add(goLeft,this);
        cursors.right.onDown.add(goRight,this);

        function goLeft(){
            if (player.position.x > 250){
                n -= 1;
                player.position.x = coordinates[n].x;
            }
        }
        function goRight(){
            if (player.position.x < 650){
                n += 1;
                player.position.x = coordinates[n].x;
            }
        }
        function randomTime(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }
        function spawnOb1() {
            var obstacle = obstacles.create(270, -350, 'bomb');
            grav = randomObGrav();
            obstacle.body.gravity.y = grav;
            obstacle.animations.add('scroll');
            obstacle.animations.play('scroll', 15, true);
            console.log(obstacle);
            if (obstacle.alive == false) {
                console.log(obstacle);
                obstacle.loadTexture('explosion');
                obstacle.animations.add('scroll');
                obstacle.animations.play('scroll', 15, true);
                console.log(obstacle);
            }
        }
        function spawnOb2() {
            var obstacle = obstacles.create(370, -250, 'bomb');
            grav = randomObGrav();
            obstacle.body.gravity.y = grav;
            obstacle.animations.add('scroll');
            obstacle.animations.play('scroll', 15, true);
        }
        function spawnOb3() {
            var obstacle = obstacles.create(470, -350, 'bomb');
            grav = randomObGrav();
            obstacle.body.gravity.y = grav;
            obstacle.animations.add('scroll');
            obstacle.animations.play('scroll', 15, true);
        }
        function spawnOb4() {
            var obstacle = obstacles.create(570, -250, 'bomb');
            grav = randomObGrav();
            obstacle.body.gravity.y = grav;
            obstacle.animations.add('scroll');
            obstacle.animations.play('scroll', 15, true);
        }
        function spawnOb5() {
            var obstacle = obstacles.create(670, -450, 'bomb');
            grav = randomObGrav();
            obstacle.body.gravity.y = grav;
            obstacle.animations.add('scroll');
            obstacle.animations.play('scroll', 15, true);
        }
        function spawnOrb1() {
            var orb = orbs.create(285, -250, 'orb');
            grav = randomOrbGrav();
            orb.body.gravity.y = grav;
        }
        function spawnOrb2() {
            var orb = orbs.create(385, -250, 'orb');
            grav = randomOrbGrav();
            orb.body.gravity.y = grav;
        }
        function spawnOrb3() {
            var orb = orbs.create(485, -250, 'orb');
            grav = randomOrbGrav();
            orb.body.gravity.y = grav;
        }
        function spawnOrb4() {
            var orb = orbs.create(585, -250, 'orb');
            grav = randomOrbGrav();
            orb.body.gravity.y = grav;
        }
        function spawnOrb5() {
            var orb = orbs.create(685, -250, 'orb');
            grav = randomOrbGrav();
            orb.body.gravity.y = grav;
        }
        function randOb1Spawn() {
            spawnOb1();
            randi1 = Math.round(Math.random()*(7000-300))+300;
            clearInterval(i1);
            i1 = setInterval(randOb1Spawn, randi1);
        }
        i1 = setInterval(randOb1Spawn, randi1);
        function randOb2Spawn() {
            spawnOb2();
            randi2 = Math.round(Math.random()*(4000-400))+300;
            clearInterval(i2);
            i2 = setInterval(randOb2Spawn, randi2);
        }
        i2 = setInterval(randOb2Spawn, randi2);
        function randOb3Spawn() {
            spawnOb3();
            randi3 = Math.round(Math.random()*(4000-1000))+1000;
            clearInterval(i3);
            i3 = setInterval(randOb3Spawn, randi3);
        }
        i3 = setInterval(randOb3Spawn, randi3);
        function randOb4Spawn() {
            spawnOb4();
            randi4 = Math.round(Math.random()*(3000-100))+500;
            clearInterval(i4);
            i4 = setInterval(randOb4Spawn, randi4);
        }
        i4 = setInterval(randOb4Spawn, randi4);
        function randOb5Spawn() {
            spawnOb5();
            randi5 = Math.round(Math.random()*(9000-200))+200;
            clearInterval(i5);
            i5 = setInterval(randOb5Spawn, randi5);
        }
        i5 = setInterval(randOb5Spawn, randi5);

        function randOrb1Spawn() {
            spawnOrb1();
            randj1 = Math.round(Math.random()*(10000-300))+300;
            clearInterval(j1);
            j1 = setInterval(randOrb1Spawn, randj1);
        }
        j1 = setInterval(randOrb1Spawn, randj1);
        function randOrb2Spawn() {
            spawnOrb2();
            randj2 = Math.round(Math.random()*(20000-500))+500;
            clearInterval(j2);
            j2 = setInterval(randOrb2Spawn, randj2);
        }
        j2 = setInterval(randOrb2Spawn, randj2);
        function randOrb3Spawn() {
            spawnOrb3();
            randj3 = Math.round(Math.random()*(20000-500))+500;
            clearInterval(j3);
            j3 = setInterval(randOrb3Spawn, randj3);
        }
        j3 = setInterval(randOrb3Spawn, randj3);
        function randOrb4Spawn() {
            spawnOrb4();
            randj4 = Math.round(Math.random()*(20000-500))+500;
            clearInterval(j4);
            j4 = setInterval(randOrb4Spawn, randj4);
        }
        j4 = setInterval(randOrb4Spawn, randj4);
        function randOrb5Spawn() {
            spawnOrb5();
            randj5 = Math.round(Math.random()*(10000-300))+300;
            clearInterval(j5);
            j5 = setInterval(randOrb5Spawn, randj5);
        }
        j5 = setInterval(randOrb5Spawn, randj5);

//        function killSpawn() {
//            if (player.key == 'orb') {
//                clearInterval(i1);
//                clearInterval(i2);
//                clearInterval(i3);
//                clearInterval(i4);
//                clearInterval(i5);
//                clearInterval(j1);
//                clearInterval(j2);
//                clearInterval(j3);
//                clearInterval(j4);
//                clearInterval(j5);
//            }
//        }

        this.stage.disableVisibilityChange = false;

//        if (player.kill()) {
//            this.addMenuOption('Next ->', function (e) {
//                this.game.state.start("GameOver");
//            });
//        }

    },

    update: function () {


        game.physics.arcade.overlap(player, orbs, collectOrb, null, this);

        game.physics.arcade.overlap(player, obstacles, playerKill, null, this);

        game.physics.arcade.overlap(player, laneC, laneCScoreModifier, null, this);

        game.physics.arcade.overlap(player, laneDR, laneDRScoreModifier, null, this);

        game.physics.arcade.overlap(player, laneY, laneYScoreModifier, null, this);

        game.physics.arcade.overlap(player, laneM, laneMScoreModifier, null, this);

        game.physics.arcade.overlap(player, laneSC, laneSCScoreModifier, null, this);

        player.body.velocity.x = 0;

        function collectOrb (player, orb) {

            orb.kill();
            score += 5000;
            scoreText.text = 'Score: ' + score;
            var random = Math.floor(Math.random() * 5);
            player.loadTexture(heroCollection[random]);

        }
        function playerKill (player, obstacle) {

            player.kill();
            var splodeSound = game.sound.add('splodesound');
            splodeSound.play();
            obstacle.body.gravity.y = 0;
            obstacle.body.velocity.y = 0;
            obstacle.position.x = obstacle.position.x - 20;
            obstacle.loadTexture('explosion');
            obstacle.animations.add('scroll');
            obstacle.animations.play('scroll', 15, false, true);
            clearInterval(i1);
            clearInterval(i2);
            clearInterval(i3);
            clearInterval(i4);
            clearInterval(i5);
            clearInterval(j1);
            clearInterval(j2);
            clearInterval(j3);
            clearInterval(j4);
            clearInterval(j5);
            spawnAllowed = false;
            this.addMenuOption(' OH NO! YOU SPLODED!' + '\n' + '        (CLICK ME!)', function (e) {
                this.game.state.start("GameOver");
            });

        }
        function laneCScoreModifier (player, lane) {
            if (player.key == 'heroc' || player.key == 'herochappy' || player.key == 'herocsuper') {
                score += 3;
                scoreText.text = 'Score: ' + score;
            } else {
                score -= 31;
                scoreText.text = 'Score: ' + score;
            }
            heroHappiness();
        }
        function laneDRScoreModifier (player, lane) {
            if (player.key == 'herodr' || player.key == 'herodrhappy' || player.key == 'herodrsuper') {
                score += 3;
                scoreText.text = 'Score: ' + score;
            } else {
                score -= 31;
                scoreText.text = 'Score: ' + score;
            }
            heroHappiness();
        }
        function laneYScoreModifier (player, lane) {
            if (player.key == 'heroy' || player.key == 'heroyhappy' || player.key == 'heroysuper') {
                score += 3;
                scoreText.text = 'Score: ' + score;
            } else {
                score -= 31;
                scoreText.text = 'Score: ' + score;
            }
            heroHappiness();
        }
        function laneMScoreModifier (player, lane) {
            if (player.key == 'herom' || player.key == 'heromhappy' || player.key == 'heromsuper') {
                score += 3;
                scoreText.text = 'Score: ' + score;
            } else {
                score -= 31;
                scoreText.text = 'Score: ' + score;
            }
            heroHappiness();
        }
        function laneSCScoreModifier (player, lane) {
            if (player.key == 'herosc' || player.key == 'heroschappy' || player.key == 'heroscsuper') {
                score += 3;
                scoreText.text = 'Score: ' + score;
            } else {
                score -= 31;
                scoreText.text = 'Score: ' + score;
            }
            heroHappiness();
        }
    }
};
