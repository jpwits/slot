/**
 * Represents a reel in the game.
 * @constructor
 * @param {number} positions - Number of reel positions.
 */

Slot.Text = function(x, y) {
    // this.positions = positions;
    this.values = [];
    this.symbols = [];
    this.container = new PIXI.Container();

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
    this.x = x;
    this.y = y;
    // for (var i = 0; i < positions + 1; i++) { //used in reels maybe adapt
    //     // var symbol = new PIXI.Sprite(PIXI.Texture.EMPTY);
    //     var symbol = new PIXI.Text('', labelStyle);
    //     this.container.addChild(symbol);
    //     this.symbols.push(symbol);
    // }
};

Slot.Text.prototype.render = function(textIndex) {
    var _this = this;
};