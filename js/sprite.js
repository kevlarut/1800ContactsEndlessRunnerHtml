var sprite = function() {
	this.animationIndex = 0;
	this.frameImages = [];
}
sprite.prototype.preLoadImages = function(frameSources) {
	for (var i = 0; i < frameSources.length; i++) {
		var image = new Image;
		image.src = frameSources[i];
		this.frameImages.push(image);
	}
}

sprite.prototype.render = function(context, x, y) {
	var image = this.frameImages[this.animationIndex];
	context.drawImage(image, x, y);
}

sprite.prototype.update = function() {
	if (this.hasOwnProperty('animationIndex')) {
		this.animationIndex++;
		if (this.animationIndex >= this.frameImages.length) {
			this.animationIndex = 0;
		}
	}
}