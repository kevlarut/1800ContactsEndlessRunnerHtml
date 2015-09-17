var game = new function() {

	var canvas = null;
	var context = null;
	var frameRate = 20;
	var sprites = {};
	var mountains = {};
	var grass = {};
	var trees = {};
	var snakes = [];
	var lastSnakeSpawnEventTime = null;
			
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
		mountains.speed = 1;
		
		player.preLoadImages();
		
		grass = new background();
		grass.preLoadImages(['img/grass-foreground.png']);
		grass.speed = 8;
		
		trees = new treeManager();
		trees.preLoadImages([
			'img/tree1.png',
			'img/tree2.png',
			'img/tree3.png',
			'img/tree4.png',
			'img/tree5.png',
			'img/tree6.png',
			'img/tree7.png',
		]);
	}
	
	this.start = function() {
		canvas = document.getElementById('game');		
		context = canvas.getContext('2d');		
		this.preLoadImages();
				
		this.gameLoop();
		setInterval(this.gameLoop, 1000 / frameRate);
		
		if (window.location.protocol == 'file:') {
			console.error('Tree rendering will not work when using the file protocol.  Use http or https instead.');
		}
		
		window.document.onkeydown = function(event) {
			var SPACE = 32;
			switch (event.keyCode) {
				case SPACE:
					player.jump();
					break;
			}
		}
	}
		
	this.gameLoop = function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		mountains.render(context, 0, 0);
		trees.render(context, 0, 0);
		player.render(context, 140, 100);
		player.render(context, 140, 100);
		grass.render(context, 0, 146);
		for (var i = 0; i < snakes.length; i++) {
			var snake = snakes[i];
			sprites['snake'].render(context, snake.x, snake.y);
		}
		
		for (var key in sprites) {
			if (sprites.hasOwnProperty(key)) {			
				sprites[key].update();
			}
		}
		player.update();
		grass.update();
		mountains.update();
		trees.update();
		
		var snakeSpeed = 8;
		for (var i = snakes.length - 1; i >= 0; i--) {
			var snake = snakes[i];
			snake.x -= snakeSpeed;
			if (snake.x <= -64) {
				snakes.splice(i, 1);
			}
		}
		
		var minimumSpawnDelay = 500;
		var now = new Date().getTime();
		if (lastSnakeSpawnEventTime == null || now >= lastSnakeSpawnEventTime + minimumSpawnDelay) {
			var snakeSpawnChance = 1 / 5;
			if (Math.random() < snakeSpawnChance) {
				var snake = {
					x: 400,
					y: 105
				};
				snakes.push(snake);
			}
			lastSnakeSpawnEventTime = now;
		}
	}
}

window.onload = function() {
	game.start();
};