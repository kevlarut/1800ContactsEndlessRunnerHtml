var customerManager = new function() {
	
	var assets = {
		'my-brand': [
			'img/customer.png',
			'img/customer-happy.png',
			'img/dialog-my-brand.png'
		],
		'date-night': [
			'img/customer-date.png',
			'img/customer-date-night.png',
			'img/dialog-date-night.png'
		],
		'girl': [
			'img/customer-girl.png',
			'img/customer-girl-happy.png',
			'img/dialog-girl.png'
		],
		'pirate': [
			'img/customer-pirate.png',
			'img/customer-pirate-happy.png',
			'img/dialog-pirate.png'
		],
		'the-fall': [
			'img/customer-the-fall.png',
			'img/customer-the-fall-happy.png',
			'img/dialog-the-fall.png'
		]
	};
	var customers = [];
	var sprites = [];
	var customerSpeed = 8;

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
		for (var i = 0; i < customers.length; i++) {
			var customer = customers[i];
			var frameIndex = customer.isHappy ? 1 : 0;
			sprites[customer.type].renderFrame(context, customer.x, customer.y, frameIndex);
			if (customer.isHappy) {
				sprites[customer.type].renderFrame(context, 64, 16, 2);
			}
		}
	}

	this.update = function() {
		for (var i = 0; i < customers.length; i++) {
			var customer = customers[i];
			customer.x -= customerSpeed;
			if (customer.x < -64) {
				customers.splice(i--, 1);
			}
			else if (!customer.isHappy && isCustomerInCollisionWithPlayer(customer, player)) {
				deliverContactsToCustomer(customer);
			}
		}
	}

	var isCustomerInCollisionWithPlayer = function(customer, player) {
		if (customer.getCollisionRightBoundary() >= player.getCollisionLeftBoundary()
		&& customer.getCollisionLeftBoundary() <= player.getCollisionRightBoundary()
		&& customer.getCollisionBottomBoundary() >= player.getCollisionTopBoundary()
		&& customer.getCollisionTopBoundary() <= player.getCollisionBottomBoundary()) {
			return true;
		}
		else {
			return false;
		}
	}

	var deliverContactsToCustomer = function(customer) {
		customer.isHappy = true;
		//TODO: Play sound
	}

	this.spawnRandomCustomer = function() {
		var keys = Object.keys(assets);
		var key = keys[keys.length * Math.random() << 0];
		var customer = new Customer();
		customer.type = key;
		customers.push(customer);
	}
}