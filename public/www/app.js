// class BrickStep {
//     State:{}
//     constructor() {
//         this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
//     }
//     game: Phaser.Game;
//     preload() {
//         this.game.load.image('logo', 'assets/image/phaser.png');
//     }
//     create() {
//         var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
//         logo.anchor.setTo(0.5, 0.5);
//     }
// }
/// <reference path="game/game.ts"/>
window.onload = () => {
    requirejs(['game/boot', 'game/menu', 'game/game', 'game/main/normal', 'game/main/zen', 'game/setting'], function () {
        var game = new BrickStep.Game;
    });
};
//# sourceMappingURL=app.js.map