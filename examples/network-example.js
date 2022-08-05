var network = {
    send: function() {
        var respond = this.onresponse;
        setTimeout(function() {
            respond({
                result: [
                    [1, 2, 3, 4],
                    [4, 2, 1, 2],
                    [1, 1, 5, 3],
                    [3, 2, 3, 1],
                    [1, 5, 3, 4],
                ],
            });
        }, Math.random() * 500); // random response delay
    },
    onresponse: null,
};

var resourcesUrl = 'assets/space adventure/';
var gameWidth = 1500;
var gameHeight = 640;

var game = new Slot({
    container: '#game-container',
    resources: [
        ['symbol-1', resourcesUrl + 'symbol-1x128.png'],
        ['symbol-2', resourcesUrl + 'symbol-2x128.png'],
        ['symbol-3', resourcesUrl + 'symbol-3x128.png'],
        ['symbol-4', resourcesUrl + 'symbol-4x128.png'],
        ['symbol-5', resourcesUrl + 'symbol-5x128.png'],
        ['symbol-6', resourcesUrl + 'symbol-6x128.png'],
        ['symbol-7', resourcesUrl + 'symbol-7x128.png'],
        ['symbol-8', resourcesUrl + 'symbol-8x128.png'],
        ['symbol-9', resourcesUrl + 'symbol-9x128.png'],
        ['symbol-10', resourcesUrl + 'symbol-10x128.png'],
        ['btn-spin', resourcesUrl + 'button-spin.png'],
        ['background', resourcesUrl + 'SHS1_background.png'],
    ],
    settings: {
        speed: 0.17,
        spinTime: 250,
        spinTimeBetweenReels: 200,
        reelBounceDuration: 400,
        network: true,
    },
    init: function(game) {
        var background = game.sprite('background');

        // reels 5x3
        var reelsCount = 5;
        var reelPositions = 3;
        var symbolsCount = 10;
        for (var i = 0; i < reelsCount; i++) {
            // create reel
            var reel = game.reels.add(reelPositions);

            // position reel
            reel.x = 381 + (i * 140) + (i * 10);
            reel.y = 118;

            // initial reel values
            for (var k = 0; k < reelPositions + 1; k++) {
                reel.values.push(parseInt(Math.random() * symbolsCount) + 1);
            }
        }

        var text = game.texts.add(150, 150, "Balance : ", " R 999.99")

        game.on('start', function() {
            for (var i = 0; i < reelsCount; i++) {
                // set spin values
                game.reels.get(i).spinValues = [];
                for (var k = 0; k < 300; k++) {
                    game.reels.get(i).spinValues.push(parseInt(Math.random() * symbolsCount) + 1);
                }
                // set stop values
                var lvr = game.reels.get(i).spinValues;
                var lv = lvr.splice(lvr.length - (reelPositions + 1) - 1, reelPositions + 1);
                game.reels.get(i).stopValues = lv;
            }
            network.send();
        });

        network.onresponse = function(response) {
            game.result(response.result);
        };

        var btnPlay = game.sprite('btn-spin');
        btnPlay.x = 381 + (4.44 * 140);
        btnPlay.y = 100 + (3 * 140);
        btnPlay.action = Slot.ACTION.PLAY;

        window.addEventListener('keydown', function(e) {
            if (e.keyCode == 32) {
                game.play();
            }
        });
    },
}, gameWidth, gameHeight);