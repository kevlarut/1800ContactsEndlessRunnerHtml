treeManager.prototype = new sprite();
treeManager.prototype.constructor = treeManager;
function treeManager() {

	this.startingX = 0;
	this.x = 0;
	
	var treeForeground = [];
	var treeMidground = [];
	var treeBackground = [];
	
	this.render = function(context, x, y) {
	
		if (window.location.protocol == 'file:') {
			return;
		}
		
		var width = 400; //TODO: This is the x spawn point on the right; figure it out instead of hard coding it here.
			
		for (var i = 0; i < treeForeground.length; i++) {
			var tree = treeForeground[i];			
			context.putImageData(tree.imageData, x + width + tree.x, y);
		}	
		for (var i = 0; i < treeMidground.length; i++) {
			var tree = treeMidground[i];
			context.putImageData(tree.imageData,  x + width + tree.x, y);
		}	
		for (var i = 0; i < treeBackground.length; i++) {
			var tree = treeBackground[i];
			context.putImageData(tree.imageData, x + width + tree.x, y);
		}	
	}
	
	this.update = function() {	
		
		if (window.location.protocol == 'file:') {
			return;
		}
		
		var spawnChance = 1 / 5;
	
		if (Math.random() < spawnChance) {
			this.spawnRandomTree();
		}
	
		var speed = 10;
		for (var i = 0; i < treeForeground.length; i++) {
			treeForeground[i].x -= 2;
			//TODO: If it's too far to the left, delete it to save memory
		}
		for (var i = 0; i < treeMidground.length; i++) {
			treeMidground[i].x -= 1.25;
			//TODO: If it's too far to the left, delete it to save memory
		}
		for (var i = 0; i < treeBackground.length; i++) {
			treeBackground[i].x -= 0.5;
			//TODO: If it's too far to the left, delete it to save memory
		}
		
		sprite.prototype.update();
	}
	
	this.colorize = function(image) {
	
		console.log(window.location.protocol);
		if (window.location.protocol == 'file:') {
			return null;
		}
	
		var canvas = document.createElement('canvas');
		var context = canvas.getContext('2d');
		context.drawImage(image, 0, 0);
			
		var originalPixels = context.getImageData(0, 0, image.width, image.height);
		var colorizedPixels = originalPixels;
		
		if (!originalPixels) {
			console.error('ERROR: I cannot colorize a tree image which has not been loaded.');
		}
		
		var color = { red: 255, green: 0, blue: 0 };		
		for (var i = 0, length = originalPixels.data.length; i < lengthL; i += 4)
        {
            if (colorizedPixels.data[i + 3] > 0) // If it's not a transparent pixel
            {
                colorizedPixels.data[i] = originalPixels.data[i] / 255 * color.red;
                colorizedPixels.data[i + 1] = originalPixels.data[i + 1] / 255 * color.green;
                colorizedPixels.data[i + 2] = originalPixels.data[i + 2] / 255 * color.blue;
            }
        }
		
		return colorizedPixels;
	}
	
	this.spawnRandomTree = function() {	
		var layer = Math.floor(Math.random() * 2);
		var frameIndex = Math.floor(Math.random() * (this.frameImages.length - 1));
		var imageData = this.colorize(this.frameImages[frameIndex]);
				
		var tree = {
			x: 0,
			imageData: imageData
		};
				
		switch(layer) {
			case 0:
				treeBackground.push(tree);
				break;
			case 1:
				treeMidground.push(tree);
				break;
			case 2:
				treeForeground.push(tree);
				break;
			default:
				console.error('Invalid layer in spawnRandomTree: ' + layer);
				break;
		}
			
	}
}