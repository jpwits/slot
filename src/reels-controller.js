Slot.ReelsController = function(game) {
    this.reels = [];
    this.engine = game.engine;
    this.game = game;
    this.x = 0;
    this.y = 0;
    this.events = {
        onStart: [],
        onStop: [],
    };
    this.rolling = false;

    var _this = this;

    function resizeAndPosition() {
        _this.reels.forEach(function(reel, reelIndex) {
            reel.container.x = (reel.x * game.engine.renderer.view.width) / game.engine.width;
            reel.container.y = (reel.y * game.engine.renderer.view.height) / game.engine.height;
            reel.symbols.forEach(function(symbol) {
                symbol.scale.x = game.engine.renderer.view.width / game.engine.width;
                symbol.scale.y = game.engine.renderer.view.height / game.engine.height;
            });
        });
    }
    resizeAndPosition();

    var rollingTime = 0;

    PIXI.Ticker.shared.add(function(delta) {
        var active = false;
        _this.reels.forEach(function(reel, reelIndex) {
            resizeAndPosition();

            reel.render(game.settings.speed, game.settings.reelBounceDuration, reelIndex);

            for (var i = 0; i < reel.symbols.length; i++) {
                var symbol = reel.symbols[i];
                symbol.y = (symbol.height * (i - 1)) + (0 + reel.offset);
                if (reel.values[i]) {
                    if ('symbol-' + reel.values[i] in PIXI.Loader.shared.resources) {
                        symbol.texture = PIXI.Loader.shared.resources['symbol-' + reel.values[i]].texture;
                    } else {
                        symbol.texture = PIXI.Texture.EMPTY;
                    }
                } else {
                    symbol.texture = PIXI.Texture.EMPTY;
                }
            }

            var m = reel.mask;
            m.x = reel.container.x;
            m.y = reel.container.y;
            m.clear();
            m.beginFill(0x000000);
            m.drawRect(0, 0, reel.symbols[0].width, reel.symbols[0].height * reel.positions);
            m.endFill();

            active = reel.rolling == true || !isNaN(parseInt(reel.stopping));

            if (active) {
                var reelStopTime = game.settings.spinTime + (reelIndex * game.settings.spinTimeBetweenReels);
                if (rollingTime > reelStopTime) {
                    reel.stop(); // FIXME: don't call stop multiple times
                }
            }
        });

        if (!_this.rolling && active) {
            _this.rolling = true;
            _this.events.onStart.forEach(function(fn) {
                fn();
            });
        } else if (_this.rolling && !active) {
            _this.rolling = false;
            rollingTime = 0;
            _this.events.onStop.forEach(function(fn) {
                fn();
            });
        }

        if (active && !game.waitForResult) {
            rollingTime += delta * 16.667;
        }
    }, PIXI.UPDATE_PRIORITY.HIGH);
};

Slot.ReelsController.prototype.add = function(positions, symbolCount, symbolWidth, symbolHeight) {
    const baseStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 32,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ffffff', '#00ff99'], // gradient
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#FFD700',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 3,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440,
        lineJoin: 'round',
    });

    const labelStyle = Object.assign({}, baseStyle, { dropShadowColor: "#FFD700" });
    const valueStyle = Object.assign({}, baseStyle, { dropShadowColor: "#fe2c54" });

    const balLabel = new PIXI.Text('Balance :', labelStyle);
    balLabel.x = 150;
    balLabel.y = 150;

    const balance = new PIXI.Text('R 999.99', valueStyle);
    balance.x = 320;
    balance.y = 150;

    const betLabel = new PIXI.Text('Bet :', labelStyle);
    betLabel.x = 150;
    betLabel.y = 200;

    const betValue = new PIXI.Text('R 1.00', valueStyle);
    betValue.x = 320;
    betValue.y = 200;

    var reel = new Slot.Reel(positions, symbolCount, symbolWidth, symbolHeight);
    this.engine.stage.addChild(reel.container);
    this.engine.stage.addChild(reel.mask);
    this.engine.stage.addChild(balLabel);
    this.engine.stage.addChild(balance);
    this.engine.stage.addChild(betLabel);
    this.engine.stage.addChild(betValue);
    this.reels.push(reel);
    return reel;
};

Slot.ReelsController.prototype.get = function(index) {
    return this.reels[index];
};

Slot.ReelsController.prototype.start = function() {
    this.reels.forEach(function(reel) {
        reel.roll();
    });
};

Slot.ReelsController.prototype.stop = function() {
    this.reels.forEach(function(reel) {
        reel.stop();
    });
};

Slot.ReelsController.prototype.onStart = function(fn) {
    this.events.onStart.push(fn);
};

Slot.ReelsController.prototype.onStop = function(fn) {
    this.events.onStop.push(fn);
};