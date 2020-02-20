var Gnats = function(x, y) {
	this.x = x;
	this.y = y;
	this.height = 64;
	this.width = 64;
}
Gnats.prototype.getCollisionRightBoundary = function() {
    return this.x + 32;
}
Gnats.prototype.getCollisionLeftBoundary = function() {
    return this.x + 4;
}
Gnats.prototype.getCollisionTopBoundary = function() {
    return this.y + 8;
}
Gnats.prototype.getCollisionBottomBoundary = function() {
    return this.y + 32;
}