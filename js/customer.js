var Customer = function() {
    this.x = 400;
    this.y = 100;
    this.isHappy = false;
}
Customer.prototype.getCollisionRightBoundary = function() {
    return this.x + 24;
}
Customer.prototype.getCollisionLeftBoundary = function() {
    return this.x + 10;
}
Customer.prototype.getCollisionTopBoundary = function() {
    return this.y + 10;
}
Customer.prototype.getCollisionBottomBoundary = function() {
    return this.y + 24;
}