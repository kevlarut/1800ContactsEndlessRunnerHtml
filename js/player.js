var player = new function() {

	var jumpHeight = 90;
	var jumpSpeed = 16;
	var localY = 0;
	var lastCollisionStartTime = null;
	var collisionInvincibilityTime = 1000;
	var isGettingHurt = true;
	
	this.x = 140;
	this.y = 100;
	this.height = 64;
	this.width = 64;
	
	this.getCollisionLeftBoundary = function() {
		return this.x + 10;
	}
	this.getCollisionRightBoundary = function() {
		return this.x + 24;
	}
	this.getCollisionTopBoundary = function() {
		return this.y - localY + 10;
	}
	this.getCollisionBottomBoundary = function() {
		return this.y - localY + 24;
	}
	
	var assets = {
		'running': [
			'img/running01.png',
			'img/running02.png',
			'img/running03.png',
			'img/running04.png',
			'img/running05.png',
			'img/running06.png',
			'img/running07.png',
			'img/running08.png',
			'img/running09.png',
			'img/running10.png',
			'img/running11.png',
			'img/running12.png',
		],
		'jumping1': [
			'img/jumping1.png'
		],
		'jumping2': [
			'img/jumping2.png'
		],
		'yoyo': [
			'img/yoyo1.png',
			'img/yoyo2.png',
			'img/yoyo3.png',
			'img/yoyo4.png',
			'img/yoyo5.png',
			'img/yoyo6.png',
			'img/yoyo7.png',
			'img/yoyo8.png'
		],
	}
	var sprites = [];
	var currentState = 'running';
	
	this.render = function(context) {
		var y = this.y - localY;
		if (isGettingHurt) {
			sprites[currentState].renderAsColor(context, this.x, y, "#FF0000");
		}
		else {
			sprites[currentState].render(context, this.x, y);
		}
	}

	this.hurt = function() {
		var now = new Date().getTime();
		if (!isGettingHurt) {
			lastCollisionStartTime = now;
			isGettingHurt = true;		
		}		
	}

	this.update = function() {
		sprites[currentState].update();
		
		switch (currentState) {
			case 'jumping1':
				localY += jumpSpeed;
				if (localY >= jumpHeight) {
					currentState = 'jumping2';
					localY = jumpHeight;
				}
				break;
			case 'jumping2':
				localY -= jumpSpeed;
				if (localY <= 0) {
					currentState = 'running';
					localY = 0;
				}
				break;
		}

		var now = new Date().getTime();
		if (isGettingHurt && now > lastCollisionStartTime + collisionInvincibilityTime) {
			isGettingHurt = false;
		}
	}

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
	
	this.jump = function() {
		currentState = 'jumping1';
	}
}