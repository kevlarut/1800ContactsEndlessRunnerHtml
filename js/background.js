background.prototype = new sprite();
background.prototype.constructor = background;
function background() {
	this.startingX = 0;
	this.x = 0;
	this.frameImages = [];
	this.speed = 1;
}

background.prototype.render = function(context, x, y) {
	var width = this.frameImages[0].width;
	sprite.prototype.render.call(this, context, x + this.x, y);
	sprite.prototype.render.call(this, context, x + this.x + width, y);
}

background.prototype.update = function() {
	var width = this.frameImages[0].width;
	this.x -= this.speed;
	if (this.x < 0 - width) {
		this.x = 0;
	}
	sprite.prototype.update(this);
}
background.prototype.preLoadImages = function(frameSources) {
	sprite.prototype.preLoadImages.call(this, frameSources);
}