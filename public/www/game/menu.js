/// <reference path="game" />
var BrickStep;
(function (BrickStep) {
    class Menu extends Phaser.State {
        preload() {
            // this should be empty as resouces are loaded in boot.ts
        }
        create() {
            //TODO: menu scene set up
            this.game.stage.backgroundColor = '#000000';
            this.button_normal = this.game.add.button(240, 0, 'white_big', this.startNormal, this);
            this.button_zen = this.game.add.button(0, 160, 'white_big', this.startZen, this);
            this.button_setting = this.game.add.button(240, 320, 'white_big', this.startSetting, this);
            this.button_empty = this.game.add.button(0, 480, 'white_big');
            //setting texts
            var style = { font: "32px Futura condensed", align: "center", fill: "#000000" };
            this.text = this.game.add.text(this.game.world.centerX * 3 / 2, this.game.world.centerY / 4, "Normal", style);
            this.text.anchor = new Phaser.Point(0.5, 0.5);
            this.text = this.game.add.text(this.game.world.centerX / 2, this.game.world.centerY * 3 / 4, "Zen", style);
            this.text.anchor = new Phaser.Point(0.5, 0.5);
            this.text = this.game.add.text(this.game.world.centerX * 3 / 2, this.game.world.centerY * 5 / 4, "Setting", style);
            this.text.anchor = new Phaser.Point(0.5, 0.5);
        }
        startZen() {
            this.game.state.start('zen', true, false);
        }
        startNormal() {
            this.game.state.start('normal', true, false);
        }
        startSetting() {
            this.game.state.start('setting', true, false);
        }
        update() {
            //TODO: possible some animation?
        }
    }
    BrickStep.Menu = Menu;
})(BrickStep || (BrickStep = {}));
//# sourceMappingURL=menu.js.map