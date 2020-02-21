var Gnats = function(x, y) {
	this.x = x;
	this.y = y;
	this.height = 64;
	this.width = 64;
}
Gnats.prototype.getCollisionRightBoundary = function() {
    return this.x + 40;
}
Gnats.prototype.getCollisionLeftBoundary = function() {
    return this.x + 24;
}
Gnats.prototype.getCollisionTopBoundary = function() {
    return this.y + 24;
}
Gnats.prototype.getCollisionBottomBoundary = function() {
    return this.y + 40;
}