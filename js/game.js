
var game = new function() {

	var canvas = null;
	var context = null;
	var frameRate = 20;
	var sprites = {};
	
	var mountains = {};
	var grass = {};
	var backgroundShrubs = {};
	var trail = {};
	var foregroundShrubs = {};

	var seagulls = [];
	var gnatses = [];
	var lastCreatureSpawnTime = null;

	var runningSpeed = 8;
	this.playerScore = 0;
	var finalScore = 0;
			
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
		
		customerManager.preLoadImages();
		treeManager.preLoadImages();
		doodadManager.preLoadImages();
		
		doodadManager.speed = runningSpeed / 2;

		backgroundShrubs = new Background();
		backgroundShrubs.preLoadImages(['img/shrubs.png']);
		backgroundShrubs.speed = runningSpeed / 2;
		
		trail = new Background();
		trail.preLoadImages(['img/trail.png']);
		trail.speed = runningSpeed / 2;

		foregroundShrubs = new Background();
		foregroundShrubs.preLoadImages(['img/shrubs-foreground.png']);
		foregroundShrubs.speed = runningSpeed * 1.5;
	}

	initPlayer = function() {
		player.resetHitPoints();
	}

	initGame = function() {
		this.playerScore = 0;
	}
	
	this.start = function() {
		canvas = document.getElementById('game');		
		context = canvas.getContext('2d');		
		this.preLoadImages();
		audioManager.preLoadAudio();

		initPlayer();
		initGame();
				
		this.gameLoop();
		setInterval(this.gameLoop, 1000 / frameRate);
				
		window.document.onkeydown = function(event) {
			var DOWN = 40;
			var SPACE = 32;
			var UP = 38;
			switch (event.keyCode) {
				case DOWN:
					player.isSlideKeyPressed = true;
					if (player.isJumping()) {
						player.drop();
					}
					else {
						player.slide();
					}
					break;
				case UP:
					player.jump();
					break;
				case SPACE:
					if (player.isJumping()) {
						player.drop();
					}
					else {
						player.jump();
					}
					break;
			}
		}
		window.document.onkeyup = function(event) {
			var DOWN = 40;
			switch (event.keyCode) {
				case DOWN:
					player.isSlideKeyPressed = false;
					player.stopSliding();
					break;
			}
		}
	}
		
	this.gameLoop = function() {
		if (player.getHitPoints() > 0) {
			window.textWriter.clear();
			context.clearRect(0, 0, canvas.width, canvas.height);
			mountains.render(context, 0, 0);
			treeManager.render(context);
			trail.render(context, 0, 130);
			backgroundShrubs.render(context, 0, 74);
			
			doodadManager.render(context);

			player.render(context);
			for (var i = 0; i < seagulls.length; i++) {
				var seagull = seagulls[i];
				sprites['seagull'].render(context, seagull.x, seagull.y);
				hitboxDisplay.render(seagull, context);
			}
			for (var i = 0; i < gnatses.length; i++) {
				var gnats = gnatses[i];
				sprites['gnats'].render(context, gnats.x, gnats.y);
				hitboxDisplay.render(gnats, context);
			}
			customerManager.render(context);
			grass.render(context, 0, 150);

			treeManager.renderForeground(context);
			foregroundShrubs.render(context, 0, 92);
			
			for (var key in sprites) {
				if (sprites.hasOwnProperty(key)) {			
					sprites[key].update();
				}
			}
			player.update();
			game.update();
			grass.update();
			mountains.update();
			treeManager.update();
			doodadManager.update();
			backgroundShrubs.update();
			trail.update();
			foregroundShrubs.update();
			customerManager.update();
			
			var seagullSpeed = runningSpeed;
			for (var i = seagulls.length - 1; i >= 0; i--) {
				var seagull = seagulls[i];
				seagull.x -= seagullSpeed;
				if (seagull.x <= -64) {
					seagulls.splice(i--, 1);
				}
				else {
					if (seagull.x < player.x + 150 && seagull.y < player.y) {
						seagull.y += seagullSpeed;
					}
					if (seagull.getCollisionRightBoundary() >= player.getCollisionLeftBoundary()
						&& seagull.getCollisionLeftBoundary() <= player.getCollisionRightBoundary()
						&& seagull.getCollisionBottomBoundary() >= player.getCollisionTopBoundary()
						&& seagull.getCollisionTopBoundary() <= player.getCollisionBottomBoundary()) {
						player.hurt();				
					}
				}			
			}

			var gnatsSpeed = runningSpeed;
			for (var i = gnatses.length - 1; i >= 0; i--) {
				var gnats = gnatses[i];
				gnats.x -= gnatsSpeed;
				if (gnats.x <= -64) {
					gnatses.splice(i--, 1);
				}
				else {
					if (gnats.getCollisionRightBoundary() >= player.getCollisionLeftBoundary()
						&& gnats.getCollisionLeftBoundary() <= player.getCollisionRightBoundary()
						&& gnats.getCollisionBottomBoundary() >= player.getCollisionTopBoundary()
						&& gnats.getCollisionTopBoundary() <= player.getCollisionBottomBoundary()) {
						player.hurt();
					}
				}			
			}
			
			spawnCreatures();

			audioManager.playMusic();
		}
		else {
			window.updateGameOver();
		}
	}

	var spawnCreatures = function() {

		var minimumSpawnDelay = 500;		
		var now = new Date().getTime();
		
		if (lastCreatureSpawnTime == null || now >= lastCreatureSpawnTime + minimumSpawnDelay) {
			var customerSpawnChance = 1 / 10;
			var monsterSpawnChance = 1 / 5;
			var random = Math.random();
			if (random < customerSpawnChance) {
				customerManager.spawnRandomCustomer();
			}
			else if (random < monsterSpawnChance) {
				var numberOfDifferentMonsterTypes = 2;
				var monsterType = Math.floor(Math.random() * numberOfDifferentMonsterTypes);
				switch (monsterType) {
					case 0:
						var minY = 70;
						var maxY = 90;
						var y = Math.random() * (maxY - minY) + minY;

						var gnats = new Gnats(400, y);
						gnatses.push(gnats);
						break;
					case 1:
						var seagull = new Seagull(400, 10);
						seagulls.push(seagull);
						break;
					default:
						console.error("Error in monster spawning: unknown monster type.");
				}
			}
			lastCreatureSpawnTime = now;
		}
	}

	this.update = function() {
		if (player.getHitPoints() > 0) {
			this.playerScore++;
			window.updateTextDisplays();
		}
	}
}

window.updateGameOver = function() {
	if (player.getHitPoints() <= 0) {
		finalScore = this.playerScore;
		window.saveHighScore(finalScore);
		window.updateTextDisplays();
		window.textWriter.write("GAME OVER", 112, 100, "red");
	}
}

window.saveHighScore = function(score) {
	console.log("high score = " + score);
}

window.onload = function() {
	game.start();
};

window.updateTextDisplays = function() {
	window.textWriter.write("Hit Points: ", 5, 100, "white");
	window.textWriter.write(player.getHitPoints(), 43, 100, "white");
	window.textWriter.write("Score: ", 63, 100, "white");
	window.textWriter.write(game.playerScore, 86, 100, "white");
	
}