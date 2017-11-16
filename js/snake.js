var Snake = function(x, y) {
	this.x = x;
	this.y = y;
	this.height = 64;
	this.width = 64;
}
Snake.prototype.getCollisionRightBoundary = function() {
    return this.x + 32;
}
Snake.prototype.getCollisionLeftBoundary = function() {
    return this.x + 4;
}
Snake.prototype.getCollisionTopBoundary = function() {
    return this.y + 8;
}
Snake.prototype.getCollisionBottomBoundary = function() {
    return this.y + 32;
}