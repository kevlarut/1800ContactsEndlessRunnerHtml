var player = new function() {

	var jumpHeight = 90;
	var jumpSpeed = 16;
	var slideSpeed = 16;
	var localY = 0;
	var lastCollisionStartTime = null;
	var collisionInvincibilityTime = 1000;
	var isGettingHurt = true;
	var hitPoints = 4;
	var maxHitPoints = 4;
	
	this.x = 50;
	this.y = 100;
	this.height = 64;
	this.width = 64;
	this.isSlideKeyPressed = false;

	var slideAutomaticRecoilTime = 100;
	var slideEnterTime = null;
	
	this.getCollisionLeftBoundary = function() {
		return this.x + 26;
	}
	this.getCollisionRightBoundary = function() {
		return this.x + this.width - 22;
	}
	this.getCollisionTopBoundary = function() {
		var slidingOffset = this.isSliding() ? 6 : 0;
		return this.y - localY + 14 + slidingOffset;
	}
	this.getCollisionBottomBoundary = function() {
		var slidingOffset = this.isSliding() ? 6 : 0;
		return this.y - localY + 28 + slidingOffset;
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
		'sliding': [
			'img/sliding1.png',
			'img/sliding2.png',
			'img/sliding3.png',
			'img/sliding4.png',
			'img/sliding5.png',
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

		hitboxDisplay.render(this, context);
	}

	this.decreaseHitPoints = function() {
		if (hitPoints > 0) {
			hitPoints--;
		}
	}

	this.hurt = function() {
		var now = new Date().getTime();
		if (!isGettingHurt) {
			lastCollisionStartTime = now;
			isGettingHurt = true;	
			audioManager.playSound('hit');	
			this.decreaseHitPoints();
		}		
	}

	this.getHitPoints = function() {
		return hitPoints;
	}

	this.increaseHitPoints = function() {
		if (hitPoints < maxHitPoints) {
			hitPoints++;
		}
	}

	this.resetHitPoints = function() {
		hitPoints = maxHitPoints;
	}

	this.stopSliding = function() {
		if (currentState == "sliding") {
			currentState = "running";
			localY = 0;
		}
	}

	this.update = function() {			
		var now = new Date().getTime();
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
					this.slide();
					localY = 0;
				}
				break;
			case 'sliding':
				localY -= slideSpeed;
				if (localY <= 0) {
					localY = 0;

					if (!this.isSlideKeyPressed && now >= slideEnterTime + slideAutomaticRecoilTime) {						
						this.stopSliding();
					}
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
		if (currentState != "jumping2") {
			currentState = 'jumping1';
			audioManager.playSound('jump');
		}
	}

	this.drop = function() {
		if (currentState == "jumping1") {
			currentState = "jumping2";
		}
	}
	
	this.slide = function() {
		switch (currentState) {
			case "sliding":
				break;
			default:
				slideEnterTime = new Date().getTime();
				currentState = 'sliding';
				audioManager.playSound('slide');
				break;
		}
	}

	this.isJumping = function() {
		return currentState == "jumping1" || currentState == "jumping2";
	}

	this.isSliding = function() {
		return currentState == 'sliding';
	}
}