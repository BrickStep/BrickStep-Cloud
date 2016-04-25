///<reference path="../scripts/phaser"/>
var BrickStep;
(function (BrickStep) {
    class Game extends Phaser.Game {
        constructor() {
            //initilize with null because this class will only include declearation
            super(480, 640, Phaser.AUTO, 'content', null);
            this.state.add('boot', BrickStep.Boot, false);
            this.state.add('menu', BrickStep.Menu, false);
            this.state.add('zen', BrickStep.ZenMode, false);
            this.state.add('normal', BrickStep.NormalMode, false);
            this.state.add('setting', BrickStep.Setting, false);
            this.state.start('boot');
        }
    }
    BrickStep.Game = Game;
})(BrickStep || (BrickStep = {}));
//# sourceMappingURL=game.js.map