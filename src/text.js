/**
 * Represents a reel in the game.
 * @constructor
 *  
 * @param {*} x 
 * @param {*} y 
 * @param {*} dropShadowColor 
 * @param {*} textVal 
 */

Slot.Text = function(x, y, dropShadowColor, textVal) {
    this.values = [];
    this.symbols = [];
    this.container = new PIXI.Container();
    //This should be here but hitting controller state first, fix!!!!!
    // const baseStyle = new PIXI.TextStyle({
    //     fontFamily: 'Arial',
    //     fontSize: 32,
    //     fontStyle: 'italic',
    //     fontWeight: 'bold',
    //     fill: ['#ffffff', '#00ff99'], // gradient
    //     stroke: '#4a1850',
    //     strokeThickness: 5,
    //     dropShadow: true,
    //     dropShadowColor: '#FFD700',
    //     dropShadowBlur: 4,
    //     dropShadowAngle: Math.PI / 3,
    //     dropShadowDistance: 6,
    //     wordWrap: true,
    //     wordWrapWidth: 440,
    //     lineJoin: 'round',
    // });
    // const labelStyle = Object.assign({}, baseStyle, { dropShadowColor: "#FFD700" });
    // const valueStyle = Object.assign({}, baseStyle, { dropShadowColor: "#C4B454" });

    // this.x = x;
    // this.y = y;
};

Slot.Text.prototype.render = function(textIndex) {
    var _this = this;
};