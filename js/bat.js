var Bat = function(x, y) {
	this.x = x;
	this.y = y;
	this.height = 64;
	this.width = 64;
}
Bat.prototype.getCollisionRightBoundary = function() {
    return this.x + 32;
}
Bat.prototype.getCollisionLeftBoundary = function() {
    return this.x + 4;
}
Bat.prototype.getCollisionTopBoundary = function() {
    return this.y + 8;
}
Bat.prototype.getCollisionBottomBoundary = function() {
    return this.y + 32;
}