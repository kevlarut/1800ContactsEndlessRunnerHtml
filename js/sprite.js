var Sprite = function() {
	this.animationIndex = 0;
	this.frameImages = [];
}
Sprite.prototype.preLoadImages = function(frameSources) {
	for (var i = 0; i < frameSources.length; i++) {
		var image = new Image;
		image.src = frameSources[i];
		this.frameImages.push(image);
	}
}

Sprite.prototype.render = function(context, x, y) {
	var image = this.frameImages[this.animationIndex];
	context.drawImage(image, x, y);
}

Sprite.prototype.renderAsColor = function(context, x, y, color) {
	var image = this.frameImages[this.animationIndex];

	var bufferElement = Object.assign(document.createElement("canvas"), {
		width: image.width,
		height: image.height
	});
	var bufferContext = bufferElement.getContext("2d");
	bufferContext.drawImage(image, 0, 0);
	bufferContext.fillStyle = color;
	bufferContext.globalCompositeOperation = "hard-light";
	bufferContext.fillRect(0, 0, bufferElement.width, bufferElement.height);
	bufferContext.globalAlpha = 1;
	bufferContext.globalCompositeOperation = "destination-in";
	bufferContext.drawImage(image, 0, 0);

	context.drawImage(bufferElement, x, y);
}

Sprite.prototype.update = function() {
	if (this.hasOwnProperty('animationIndex')) {
		this.animationIndex++;
		if (this.animationIndex >= this.frameImages.length) {
			this.animationIndex = 0;
		}
	}
}