var game = new function() {

	var canvas = null;
	var context = null;
	var frameRate = 6;
	var sprites = {};
	var mountains = {};
			
	this.preLoadImages = function() {
		for (var key in spriteAssets) {
			if (spriteAssets.hasOwnProperty(key)) {
				var spriteAsset = spriteAssets[key];
				var currentSprite = new sprite();				
				currentSprite.preLoadImages(spriteAsset);
				sprites[key] = currentSprite;
			}
		}
		mountains = new background();
		mountains.preLoadImages(['img/background.png']);
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
		mountains.render(context, 0, 0);
		sprites['yoyo'].render(context, 140, 90);
		
		for (var key in sprites) {
			if (sprites.hasOwnProperty(key)) {			
				sprites[key].update();
			}
		}
		mountains.update();
	}
}

window.onload = function() {
	game.start();
};