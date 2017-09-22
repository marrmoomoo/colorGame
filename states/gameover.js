var GameOver = function(game) {};

var name;
var database;
var d;

GameOver.prototype = {
    
    preload: function () {
        this.optionCount = 1;
    },

    addMenuOption: function(text, callback) {
        var optionStyle = { font: '30pt TheMinion', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
        var txt = game.add.text(game.world.centerX, (this.optionCount * 80) + 300, text, optionStyle);
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
        game.add.sprite(0, 0, 'gameoverbg');
        name = prompt("Please enter your name");
        var titleStyle = { font: 'bold 60pt TheMinion', fill: '#FDFFB5', align: 'center'};
        var titleStyle2 = { font: 'bold 32pt TheMinion', fill: '#FDFFB5', align: 'center'};
        var text = game.add.text(game.world.centerX, 100, "Game Over", titleStyle);
        var textS = game.add.text(120, 200, name + "'s Final Score: " + score, titleStyle2);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        text.anchor.set(0.5);
//        this.myInput2 = this.createInput(550, 400);
//        this.myInput2.anchor.set(0.5);
//        this.myInput2.angle = -30;
//        this.myInput2.canvasInput.value('Woww, lo necesitabamos!');
//        this.game.add.tween(this.myInput2).to({angle:'+360'}, 4000, Phaser.Easing.Cubic.In, true, 2000, -1);
        this.addMenuOption('Submit Your Score!', function (e) {
            var titleStyle3 = { font: 'bold 18pt TheMinion', fill: '#FDFFB5', align: 'center'};
            submitScore();
            var textBoard = game.add.text(120, 250, "Current High Score: " + d, titleStyle3);
        });
        this.addMenuOption('Play Again', function (e) {
            score = 0;
            n = 2;
            this.game.state.start("Game");
        });
        this.addMenuOption('Main Menu', function (e) {
            score = 0;
            n = 2;
            this.game.state.start("GameMenu");
        })
    }
};

function submitScore() {
    var data = {
        name: name,
        score: score   
    }
    console.log(data);
    var ref = database.ref('scores');
    ref.push(data);
}

var config = {
    apiKey: "AIzaSyDzpL5L7qX34tZD2j-tN2-qbMmBLeJI6h0",
    authDomain: "leaderboard-44ae5.firebaseapp.com",
    databaseURL: "https://leaderboard-44ae5.firebaseio.com",
    projectId: "leaderboard-44ae5",
    storageBucket: "",
    messagingSenderId: "150066666900"
};
firebase.initializeApp(config);
database = firebase.database();

var ref = database.ref('scores');
ref.on('value', gotData, errData);

function gotData(data) {
    var arr = [];
    var scores = data.val();
    var keys = Object.keys(scores);
    for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        var names = scores[k].name;
        var sco = scores[k].score;
        arr.push(sco);
        if (arr.length > 1 && arr[0] > arr[1]) {
            arr.pop();
        } else if (arr.length > 1 && arr[1] > arr[0]) {
            arr.shift();
        }    
    } d = arr[0];
    return d;
}

function errData(err) {
    console.log("Error!");
    console.log(err);
}

//var database = firebase.database();
//var ref = database.ref('scores');
//var data = {
//    name: name,
//    score: score
//}
//ref.push(data);