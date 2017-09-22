var Leaderboard = function (game) {};

Leaderboard.prototype {
    
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
        
        var titleStyle = { font: 'bold 60pt TheMinion', fill: '#FDFFB5', align: 'center'};
        var titleStyle2 = { font: 'bold 32pt TheMinion', fill: '#FDFFB5', align: 'center'};
        var text = game.add.text(game.world.centerX, 100, "Leaderboard", titleStyle);
        
        this.addMenuOption('Play Again', function (e) {
            score = 0;
            n = 2;
            this.game.state.start("Game");
        });
        this.addMenuOption('Main Menu', function (e) {
            score = 0;
            n = 2;
            this.game.state.start("MainMenu");
        });
    }
}
//var config = {
//    apiKey: "AIzaSyDzpL5L7qX34tZD2j-tN2-qbMmBLeJI6h0",
//    authDomain: "leaderboard-44ae5.firebaseapp.com",
//    databaseURL: "https://leaderboard-44ae5.firebaseio.com",
//    projectId: "leaderboard-44ae5",
//    storageBucket: "",
//    messagingSenderId: "150066666900"
//};
//firebase.initializeApp(config);
//
//var database = firebase.database();
//var ref = database.ref('scores');
//var data = {
//    name: 'blah',
//    score: score
//}
////ref.push(data);
