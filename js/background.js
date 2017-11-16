Background.prototype = new Sprite();
Background.prototype.constructor = Background;
function Background() {
	this.startingX = 0;
	this.x = 0;
	this.frameImages = [];
	this.speed = 1;
}

Background.prototype.render = function(context, x, y) {
	var width = this.frameImages[0].width;
	Sprite.prototype.render.call(this, context, x + this.x, y);
	Sprite.prototype.render.call(this, context, x + this.x + width, y);
}

Background.prototype.update = function() {
	var width = this.frameImages[0].width;
	this.x -= this.speed;
	if (this.x < 0 - width) {
		this.x = 0;
	}
	Sprite.prototype.update(this);
}

Background.prototype.preLoadImages = function(frameSources) {
	Sprite.prototype.preLoadImages.call(this, frameSources);
}