var sprite = function() {
	this.animationIndex = 0;
	this.frameImages = [];
	
	this.render = function(context, x, y) {
		var image = this.frameImages[this.animationIndex];
		context.drawImage(image, x, y);
	}
	
	this.preLoadImages = function(frameSources) {
		for (var i = 0; i < frameSources.length; i++) {
			var image = new Image;
			image.src = frameSources[i];
			this.frameImages.push(image);
		}
	}
	
	this.updateAnimationFrame = function() {
		this.animationIndex++;
		if (this.animationIndex >= this.frameImages.length) {
			this.animationIndex = 0;
		}
	}
}