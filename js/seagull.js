var Seagull = function(x, y) {
	this.x = x;
	this.y = y;
	this.height = 64;
	this.width = 64;
}
Seagull.prototype.getCollisionRightBoundary = function() {
    return this.x + 36;
}
Seagull.prototype.getCollisionLeftBoundary = function() {
    return this.x + 20;
}
Seagull.prototype.getCollisionTopBoundary = function() {
    return this.y + 16;
}
Seagull.prototype.getCollisionBottomBoundary = function() {
    return this.y + 32;
}