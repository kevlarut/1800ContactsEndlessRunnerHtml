background.prototype = new sprite();
background.prototype.constructor = background;
function background() {
	this.startingX = 0;
	this.x = 0;
	
	this.render = function(context, x, y) {
		var width = this.frameImages[0].width;
		sprite.prototype.render.call(this, context, x + this.x, y);
		sprite.prototype.render.call(this, context, x + this.x + width, y);		
	}
	
	this.update = function() {
		var speed = 10;
		var width = this.frameImages[0].width;
		this.x -= speed;
		if (this.x < 0 - width) {
			this.x = 0;
		}
		sprite.prototype.update();
	}	
}