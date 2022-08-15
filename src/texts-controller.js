Slot.TextController = function(game) {
    this.texts = [];
    this.engine = game.engine;
    this.game = game;
    this.x = 0;
    this.y = 0;

    var _this = this;

    function resizeAndPositionText(rerender) {
        _this.texts.forEach(function(text, textIndex) {
            text.container.x = (text.x * game.engine.renderer.view.width) / game.engine.width;
            text.container.y = (text.y * game.engine.renderer.view.height) / game.engine.height;
            text.symbols.forEach(function(symbol) {
                symbol.scale.x = game.engine.renderer.view.width / game.engine.width;
                symbol.scale.y = game.engine.renderer.view.height / game.engine.height;
            });
            if (rerender == true) {
                text.render(textIndex);
            }
        });
    }
    //resizeAndPositionText(false);

    PIXI.Ticker.shared.add(function(delta) {
        resizeAndPositionText(true);
    });

    //resizeAndPositionText(true);
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

    var text = new Slot.Text(x, y);
    this.texts.push(text);
    return text;
};