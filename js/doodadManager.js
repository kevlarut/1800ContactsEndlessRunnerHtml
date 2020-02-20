var doodadManager = new function() {

	this.startingX = 0;
	this.x = 0;
	this.y = 0;
	this.lastSpawnTime = null;

	var doodads = [];
	var assets = {
		'park-bench': [
			'img/park-bench.png'
		],
		'garbage': [
			'img/garbage.png'
		],
	};
	var sprites = [];

	this.preLoadImages = function() {
		for (var key in assets) {
			if (assets.hasOwnProperty(key)) {
				var spriteAsset = assets[key];
				var currentState = new Sprite();				
				currentState.preLoadImages(spriteAsset);
				sprites[key] = currentState;
			}
		}
	}

	this.render = function(context) {		
		var width = 400;
			
		for (var i = 0; i < doodads.length; i++) {
			var doodad = doodads[i];			
			sprites[doodad.imageName].render(context, this.x + width + doodad.x, this.y + doodad.y);
		}	
	}
	
	this.update = function() {			
		var spawnChance = 1 / 50;
	
		if (Math.random() < spawnChance) {
			this.spawnRandomDoodad();
		}
	
		var boundaryToDelete = -500;
		for (var i = 0; i < doodads.length; i++) {
			var doodad = doodads[i];
			doodad.x -= this.speed;
			if (doodad.x < boundaryToDelete) {
				doodads.splice(i--, 1);
			}
		}
		
		Sprite.prototype.update();
	}
		
	this.spawnRandomDoodad = function() {	

		var minimumSpawnDelay = 500;		
		var now = new Date().getTime();

		if (this.lastSpawnTime == null || now >= this.lastSpawnTime + minimumSpawnDelay) {
			var assetKeys = Object.keys(assets);
			var imageName = assetKeys[assetKeys.length * Math.random() << 0];
					
			var doodad = {
				x: 0,
				y: 120,
				imageName: imageName
			}
					
			doodads.push(doodad);	
			this.lastSpawnTime = now;
		}		
	}
}