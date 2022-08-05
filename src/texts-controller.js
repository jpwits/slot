Slot.TextController = function(game) {
    this.texts = [];
    this.engine = game.engine;
    this.game = game;
    this.x = 0;
    this.y = 0;

    var _this = this;

    function resizeAndPositionText() {
        _this.texts.forEach(function(text, textIndex) {
            text.container.x = (text.x * game.engine.renderer.view.width) / game.engine.width;
            text.container.y = (text.y * game.engine.renderer.view.height) / game.engine.height;
            text.symbols.forEach(function(symbol) {
                symbol.scale.x = game.engine.renderer.view.width / game.engine.width;
                symbol.scale.y = game.engine.renderer.view.height / game.engine.height;
            });
        });
    }
    resizeAndPositionText();

    _this.texts.forEach(function(text, textIndex) {
        resizeAndPositionText();
        text.render(textIndex);
    });
};

Slot.TextController.prototype.add = function(x, y, labelText, valueText) {
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
    const valueStyle = Object.assign({}, baseStyle, { dropShadowColor: "#C4B454" });

    const balLabel = new PIXI.Text(labelText, labelStyle);
    balLabel.x = x;
    balLabel.y = y;

    const balance = new PIXI.Text(valueText, valueStyle);
    balance.x = x + 170;
    balance.y = y;

    // const betLabel = new PIXI.Text('Bet :', labelStyle);
    // betLabel.x = 150;
    // betLabel.y = 200;

    // const betValue = new PIXI.Text('R 1.00', valueStyle);
    // betValue.x = 320;
    // betValue.y = 200;

    var text = new Slot.Text();
    this.engine.stage.addChild(balLabel);
    this.engine.stage.addChild(balance);
    // this.engine.stage.addChild(betLabel);
    // this.engine.stage.addChild(betValue);
    this.texts.push(text);
    return text;
};