var game = new function() {

	var canvas = null;
	var context = null;
	var frameRate = 6;
	var sprites = [];
			
	this.preLoadImages = function() {	
		var yoyoSprite = new sprite();
		yoyoSprite.preLoadImages(spriteAssets.yoyo);
		sprites.push(yoyoSprite);
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
		for (var i = 0; i < sprites.length; i++) {
			var sprite = sprites[i];
			sprite.render(context, 140, 90);
			sprite.updateAnimationFrame();
		}
	}
}

window.onload = function() {
	game.start();
};