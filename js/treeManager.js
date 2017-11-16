var treeManager = new function() {

	this.startingX = 0;
	x = 0;
	y = 0;
	
	var treeForeground = [];
	var treeMidground = [];
	var treeBackground = [];
	var assets = {
		'tree1': [
			'img/tree1.png'
		],
		'tree2': [
			'img/tree2.png'
		],
		'tree3': [
			'img/tree3.png'
		],
		'tree4': [
			'img/tree4.png'
		],
		'tree5': [
			'img/tree5.png'
		],
		'tree6': [
			'img/tree6.png'
		],
		'tree7': [
			'img/tree7.png'
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
		
		var width = 400; //TODO: This is the x spawn point on the right; figure it out instead of hard coding it here.
			
		for (var i = 0; i < treeBackground.length; i++) {
			var tree = treeBackground[i];			
			sprites[tree.imageName].renderAsColor(context, x + width + tree.x, y, tree.color);
		}	
		for (var i = 0; i < treeMidground.length; i++) {
			var tree = treeMidground[i];			
			sprites[tree.imageName].renderAsColor(context, x + width + tree.x, y, tree.color);
		}	
		for (var i = 0; i < treeForeground.length; i++) {
			var tree = treeForeground[i];
			sprites[tree.imageName].renderAsColor(context, x + width + tree.x, y, tree.color);
		}	
	}
	
	this.update = function() {			
		var spawnChance = 1 / 10;
	
		if (Math.random() < spawnChance) {
			this.spawnRandomTree();
		}
	
		var speed = 8;
		var boundaryToDelete = -500;
		for (var i = 0; i < treeForeground.length; i++) {
			var tree = treeForeground[i];
			tree.x -= speed;
			if (tree.x < boundaryToDelete) {
				treeForeground.splice(i--, 1);
			}
		}
		for (var i = 0; i < treeMidground.length; i++) {
			var tree = treeMidground[i];
			tree.x -= speed / 2;
			if (tree.x < boundaryToDelete) {
				treeMidground.splice(i--, 1);
			}
		}
		for (var i = 0; i < treeBackground.length; i++) {
			var tree = treeBackground[i];
			tree.x -= speed / 4;
			if (tree.x < boundaryToDelete) {
				treeBackground.splice(i--, 1);
			}
		}
		
		Sprite.prototype.update();
	}
		
	this.spawnRandomTree = function() {	
		var layer = Math.floor(Math.random() * 3);
		var assetKeys = Object.keys(assets);
		var imageName = assetKeys[assetKeys.length * Math.random() << 0];
				
		var tree = {
			x: 0,
			imageName: imageName
		}
				
		switch(layer) {
			case 0:
				tree.color = backgroundTreeColors[Math.floor(Math.random() * backgroundTreeColors.length)];
				treeBackground.push(tree);
				break;
			case 1:
				tree.color = midgroundTreeColors[Math.floor(Math.random() * midgroundTreeColors.length)];
				treeMidground.push(tree);
				break;
			case 2:
				tree.color = foregroundTreeColors[Math.floor(Math.random() * foregroundTreeColors.length)];
				treeForeground.push(tree);
				break;
			default:
				console.error('Invalid layer in spawnRandomTree: ' + layer);
				break;
		}
			
	}
}