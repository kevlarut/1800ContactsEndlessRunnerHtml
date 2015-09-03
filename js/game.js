var game = new function() {

	var canvas = null;
	var context = null;
	var frameRate = 6;
	var sprites = {};
			
	this.preLoadImages = function() {
		for (var key in spriteAssets) {
			if (spriteAssets.hasOwnProperty(key)) {
				var spriteAsset = spriteAssets[key];
				var currentSprite = new sprite();				
				currentSprite.preLoadImages(spriteAsset);
				sprites[key] = currentSprite;
			}
		}
	}
	
	this.start = function() {
		canvas = document.getElementById('game');		
		context = canvas.getContext('2d');		
		this.preLoadImages();
				
		this.gameLoop();
		setInterval(this.gameLoop, 1000 / frameRate);
	}
		
	this.gameLoop = function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		sprites['background'].render(context, 0, 0);
		sprites['yoyo'].render(context, 140, 90);
		
		for (var key in sprites) {
			if (sprites.hasOwnProperty(key)) {			
				sprites[key].updateAnimationFrame();
			}
		}
	}
}

window.onload = function() {
	game.start();
};