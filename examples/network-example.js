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
        // ['btn-spin', resourcesUrl + 'button-spin.png'],
        ['btn-spin', resourcesUrl + 'SLOT-Machine-handle.gif'],
        ['background', resourcesUrl + 'SHS1_background.png'],
        ['btn-info', resourcesUrl + 'btn-infox32.png'],
        ['btn-betLevel', resourcesUrl + 'btn_plusx32.png']
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

        game.texts.add(150, 150, "#FFD700", "Balance : ");
        game.texts.add(320, 150, "#C4B454", " R 999.99");

        game.texts.add(750, 920, "#FFD700", "Bet");
        game.texts.add(730, 850, "#FFD700", "R 0.75");

        game.texts.add(900, 920, "#FFD700", "Bet Level");
        game.texts.add(1100, 850, "#FFD700", "1");

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

        //These should all be relative x, y!
        var btnPlay = game.sprite('btn-spin');
        btnPlay.x = 381 + (4.44 * 140) + 108;
        btnPlay.y = -164 + (3 * 140);
        btnPlay.action = Slot.ACTION.PLAY;

        var btnInfo = game.sprite('btn-info');
        btnInfo.x = 381;
        btnInfo.y = 520;
        btnInfo.action = Slot.ACTION.info;

        var btnInfoLvl = game.sprite('btn-betLevel');
        btnInfoLvl.x = 530;
        btnInfoLvl.y = 514;
        btnInfoLvl.action = Slot.ACTION.PlusMin;

        window.addEventListener('keydown', function(e) {
            if (e.keyCode == 32) {
                game.play();
            }
        });
    },
}, gameWidth, gameHeight);