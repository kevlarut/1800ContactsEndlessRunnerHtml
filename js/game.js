
var game = new function() {

	var canvas = null;
	var context = null;
	var frameRate = 20;
	var sprites = {};
	
	var mountains = {};
	var grass = {};
	var backgroundShrubs = {};
	var foregroundShrubs = {};

	var bats = [];
	var snakes = [];
	var lastMonsterSpawnTime = null;

	var runningSpeed = 8;
			
	this.preLoadImages = function() {		
		for (var key in spriteAssets) {
			if (spriteAssets.hasOwnProperty(key)) {
				var spriteAsset = spriteAssets[key];
				var currentSprite = new Sprite();				
				currentSprite.preLoadImages(spriteAsset);
				sprites[key] = currentSprite;
			}
		}
				
		mountains = new Background();
		mountains.preLoadImages(['img/background.png']);
		mountains.speed = 1;
		
		player.preLoadImages();
		
		grass = new Background();
		grass.preLoadImages(['img/grass-foreground.png']);
		grass.speed = runningSpeed;
		
		treeManager.preLoadImages();
		
		backgroundShrubs = new Background();
		backgroundShrubs.preLoadImages(['img/shrubs.png']);
		backgroundShrubs.speed = runningSpeed / 2;
		
		foregroundShrubs = new Background();
		foregroundShrubs.preLoadImages(['img/shrubs-foreground.png']);
		foregroundShrubs.speed = runningSpeed * 1.5;
	}
	
	this.start = function() {
		canvas = document.getElementById('game');		
		context = canvas.getContext('2d');		
		this.preLoadImages();		
				
		this.gameLoop();
		setInterval(this.gameLoop, 1000 / frameRate);
				
		window.document.onkeydown = function(event) {
			var SPACE = 32;
			var UP = 38;
			switch (event.keyCode) {
				case UP:
				case SPACE:
					player.jump();
					break;
			}
		}
	}
		
	this.gameLoop = function() {
		var shrubsY = 92;
		context.clearRect(0, 0, canvas.width, canvas.height);
		mountains.render(context, 0, 0);
		treeManager.render(context);
		backgroundShrubs.render(context, 0, shrubsY);

		player.render(context);
		for (var i = 0; i < bats.length; i++) {
			var bat = bats[i];
			sprites['bat'].render(context, bat.x, bat.y);
		}
		for (var i = 0; i < snakes.length; i++) {
			var snake = snakes[i];
			sprites['snake'].render(context, snake.x, snake.y);
		}
		grass.render(context, 0, 150);

		foregroundShrubs.render(context, 0, shrubsY);
		
		for (var key in sprites) {
			if (sprites.hasOwnProperty(key)) {			
				sprites[key].update();
			}
		}
		player.update();
		grass.update();
		mountains.update();
		treeManager.update();
		backgroundShrubs.update();
		foregroundShrubs.update();
		
		var now = new Date().getTime();
		
		//TODO: Abstract this somewhere; same with snakes.
		var batSpeed = runningSpeed;
		for (var i = bats.length - 1; i >= 0; i--) {
			var bat = bats[i];
			bat.x -= batSpeed;
			if (bat.x <= -64) {
				bats.splice(i, 1);
			}
			else {
				if (bat.x < player.x + 150 && bat.y < player.y) {
					bat.y += batSpeed;
				}
				if (bat.getCollisionRightBoundary() >= player.getCollisionLeftBoundary()
					&& bat.getCollisionLeftBoundary() <= player.getCollisionRightBoundary()
					&& bat.getCollisionBottomBoundary() >= player.getCollisionTopBoundary()
					&& bat.getCollisionTopBoundary() <= player.getCollisionBottomBoundary()) {
					player.hurt();
				}
			}			
		}

		var snakeSpeed = runningSpeed;
		for (var i = snakes.length - 1; i >= 0; i--) {
			var snake = snakes[i];
			snake.x -= snakeSpeed;
			if (snake.x <= -64) {
				snakes.splice(i, 1);
			}
			else {
				if (snake.getCollisionRightBoundary() >= player.getCollisionLeftBoundary()
					&& snake.getCollisionLeftBoundary() <= player.getCollisionRightBoundary()
					&& snake.getCollisionBottomBoundary() >= player.getCollisionTopBoundary()
					&& snake.getCollisionTopBoundary() <= player.getCollisionBottomBoundary()) {
					player.hurt();
				}
			}			
		}
		
		var minimumSpawnDelay = 500;
		if (lastMonsterSpawnTime == null || now >= lastMonsterSpawnTime + minimumSpawnDelay) {
			var monsterSpawnChance = 1 / 5;
			if (Math.random() < monsterSpawnChance) {
				var numberOfDifferentMonsterTypes = 2;
				var monsterType = Math.floor(Math.random() * numberOfDifferentMonsterTypes);
				switch (monsterType) {
					case 0:
						var snake = new Snake(400, 110);
						snakes.push(snake);
						break;
					case 1:
						var bat = new Bat(400, 10);
						bats.push(bat);
						break;
					default:
						console.log("Error in monster spawning: unknown monster type.");
				}
			}
			lastMonsterSpawnTime = now;
		}
	}
}

window.onload = function() {
	game.start();
};