Slot.TextController = function(game) {
    this.texts = [];
    this.engine = game.engine;
    this.game = game;
    this.x = 0;
    this.y = 0;

    var _this = this;

    function resizeAndPositionText() {
        _this.texts.forEach(function(text, textIndex) {
            var scaleWidth = (game.engine.renderer.view.width / game.engine.width);
            var scaleHeight = (game.engine.renderer.view.height / game.engine.height);
            text.container.x = text.x * scaleWidth;
            text.container.y = text.y * scaleHeight;
            text.symbols.forEach(function(symbol) {
                symbol.scale.x = scaleWidth;
                symbol.scale.y = scaleHeight;
            });
            text.x = text.container.x;
            text.y = text.container.y;
            text.render(textIndex);
        });
    };

    PIXI.Ticker.shared.add(function(delta) {
        resizeAndPositionText();
    });
};

Slot.TextController.prototype.add = function(x, y, dropShadowColor, textVal) {
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

    const textValStyle = Object.assign({}, baseStyle, { dropShadowColor: dropShadowColor });

    const fldText = new PIXI.Text(textVal, textValStyle);
    fldText.x = x;
    fldText.y = y;

    this.engine.stage.addChild(fldText);

    var text = new Slot.Text(x, y, dropShadowColor, textVal);
    this.texts.push(text);
    return text;
};