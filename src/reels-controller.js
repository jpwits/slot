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

    function resizeAndPositionReel(reel, reelIndex) {
        var scaleWidth = (game.engine.renderer.view.width / game.engine.width);
        var scaleHeight = (game.engine.renderer.view.height / game.engine.height);
        reel.container.x = reel.x * scaleWidth;
        reel.container.y = reel.y * scaleHeight;
        reel.symbols.forEach(function(symbol) {
            symbol.scale.x = scaleWidth;
            symbol.scale.y = scaleHeight;
        });
    }
    var rollingTime = 0;

    PIXI.Ticker.shared.add(function(delta) {
        var active = false;
        _this.reels.forEach(function(reel, reelIndex) {
            resizeAndPositionReel(reel, reelIndex);

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

            var pl1 = reel.playLine1;
            pl1.x = reel.container.x;
            pl1.y = reel.container.y;
            pl1.clear();
            //m.beginFill(0x000000);
            //this code should go to reel and the the black background.
            var borderWidth = 3;
            var borderColor = 0xFFFFF;
            pl1.lineStyle(borderWidth, borderColor);
            pl1.drawRect(0, reel.symbols[0].height, reel.symbols[0].width, reel.symbols[1].height);
            //pl1.endFill();

            active = reel.rolling == true || !isNaN(parseInt(reel.stopping));

            if (active) {
                var reelStopTime = game.settings.spinTime + (reelIndex * game.settings.spinTimeBetweenReels);
                if (rollingTime > reelStopTime) {
                    reel.stop(); // FIXME: don't call stop multiple times ... timee calc here on base 
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
    var reel = new Slot.Reel(positions, symbolCount, symbolWidth, symbolHeight);
    this.engine.stage.addChild(reel.container);
    this.engine.stage.addChild(reel.mask);
    this.engine.stage.addChild(reel.playLine1);
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