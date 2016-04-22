var BrickStep = (function () {
    function BrickStep() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
    }
    BrickStep.prototype.preload = function () {
        this.game.load.image('logo', '/assets/image/phaser.png');
    };
    BrickStep.prototype.create = function () {
        var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);
    };
    return BrickStep;
}());
window.onload = function () {
    var game = new BrickStep();
};
//# sourceMappingURL=app.js.map