/**
 * Represents a reel in the game.
 * @constructor
 * @param {number} positions - Number of reel positions.
 */
Slot.Reel = function(positions) {
  this.positions = positions;
  this.values = [];
  this.spinValues = [];
  this.stopValues = [];
  this.symbols = [];
  this.container = new PIXI.Container();
  this.mask = new PIXI.Graphics();
  this.playLine1 = new PIXI.Graphics();
  this.offset = 0;
  this.rolling = false;
  this.stopping = false;

  this.container.mask = this.mask;
  this.container.playLine1 = this.playLine1;

  for (var i = 0; i < positions + 1; i++) {
    var symbol = new PIXI.Sprite(PIXI.Texture.EMPTY);
    this.container.addChild(symbol);
    this.symbols.push(symbol);
  }
};

Slot.Reel.prototype.render = function(speed, bounceDuration, reelIndex) {
  var _this = this;

  if (this.rolling) {
    this.offset += this.symbols[0].height * speed;
    
    if (this.offset >= this.symbols[0].height) {
      this.offset = 0;
      if (!isNaN(parseInt(this.stopping))) {
        if (!this.stopValues.length) {
          console.error('No stop values have been set for reel: ' + reelIndex);
        }
        this.values.unshift(this.stopValues.pop());
        this.stopping++;
      } else {
        this.values.unshift(this.spinValues.pop());
      }
      this.values.splice(-1, 1);
    }

    if (this.stopping == this.positions + 1) {
      this.rolling = false;
      this.stopping++;
      var o = {
        offset: _this.symbols[0].height * speed,
      };
      this.offset = o.offset;
      anime({
        targets: o,
        offset: 0,
        round: 1,
        duration: bounceDuration,
        easing: 'easeOutQuint',
        update: function() {
          _this.offset = o.offset;
        },
        complete: function() {
          _this.stopping = false;
        },
      });
    }
  }
};
/**
 * Starts reel spinning.
 */
Slot.Reel.prototype.roll = function() {
  if (!this.rolling && this.stopping === false) {
    this.rolling = true;
  }
};
/**
 * Stops reel from spinning.
 */
Slot.Reel.prototype.stop = function() {
  if (this.rolling && this.stopping === false) {
    this.stopping = 0;
  }
};

// Slot.Reel.prototype.rectangle = function(x, y, width, height, backgroundColor, borderColor, borderWidth ) 
// {  var box = new PIXI.Graphics(); 
//   box.beginFill(backgroundColor);
//    box.lineStyle(borderWidth , borderColor);
//     box.drawRect(0, 0, width - borderWidth, height - borderWidth); box.endFill(); box.position.x = x + borderWidth/2; box.position.y = y + borderWidth/2; 
//     return box;
//   };// create a 100x100 white rectangle with a 10px black border at position 10/10stage.addChild(rectangle(10, 10, 100, 100, 0xFFFFFF, 0x000000, 10));