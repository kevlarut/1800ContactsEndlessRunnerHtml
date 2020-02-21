var hitboxDisplay = new function() {

    this.isHitboxDisplayEnabled = false;

    this.render = function(gameObject, context) {
        if (this.isHitboxDisplayEnabled) {
            var width = gameObject.getCollisionRightBoundary() - gameObject.getCollisionLeftBoundary();
            var height = gameObject.getCollisionBottomBoundary() - gameObject.getCollisionTopBoundary();
            var x = gameObject.getCollisionLeftBoundary();
            var y = gameObject.getCollisionTopBoundary();

            context.beginPath();
            context.rect(x, y, width, height);
            context.fillStyle = "#ffff0099";
            context.fill();
        }
    }
}