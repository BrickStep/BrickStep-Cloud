var BrickStep;
(function (BrickStep) {
    class Setting extends Phaser.State {
        preload() {
        }
        create() {
            this.game.stage.backgroundColor = '#000000';
            var style1 = { font: "64px Futura condensed", align: "center", fill: "#FFFFFF" };
            var style2 = { font: "64px Futura condensed", align: "center", fill: "#000000" };
            this.text = this.game.add.text(this.game.world.centerX / 2, this.game.world.centerY / 4, "Music", style1);
            this.text.anchor = new Phaser.Point(0.5, 0.5);
            if (BrickStep.flag == false) {
                this.button_music = this.game.add.button(240, 0, 'button_off', this.settingMusic, this);
            }
            else {
                this.button_music = this.game.add.button(240, 0, 'button_on', this.settingMusic, this);
            }
            this.button_user = this.game.add.button(240, 160, 'black_big', this.settingUser, this);
            this.button1 = this.game.add.button(0, 160, 'white_big', this.settingUser, this);
            this.button2 = this.game.add.sprite(240, 320, 'white_big');
            this.button3 = this.game.add.button(0, 480, 'white_big', this.backToMenu, this);
            var style = { font: "32px Futura condensed", align: "center", fill: "#ffffff" };
            this.userText = this.game.add.text(this.game.world.centerX * 3 / 2, this.game.world.centerY * 3 / 4, BrickStep.user, style);
            this.userText.anchor = new Phaser.Point(0.5, 0.5);
            this.text = this.game.add.text(this.game.world.centerX / 2, this.game.world.centerY * 3 / 4, "User", style2);
            this.text.anchor = new Phaser.Point(0.5, 0.5);
            this.text = this.game.add.text(this.game.world.centerX / 2, this.game.world.centerY * 7 / 4, "Back", style2);
            this.text.anchor = new Phaser.Point(0.5, 0.5);
        }
        settingMusic() {
            if (BrickStep.flag == false) {
                this.button_music = this.game.add.button(240, 0, 'button_on', this.settingMusic, this);
                BrickStep.music = this.game.add.audio('backmusic');
                BrickStep.music.play();
                BrickStep.music.pause();
                BrickStep.music.loop = true;
                BrickStep.flag = true;
            }
            else {
                this.button_music = this.game.add.button(240, 0, 'button_off', this.settingMusic, this);
                BrickStep.flag = false;
            }
        }
        settingUser() {
            var name = prompt('input your username', 'user');
            if (name != null) {
                BrickStep.user = name;
                this.userText.setText(name);
            }
        }
        backToMenu() {
            this.game.state.start('menu', true, false);
        }
        update() {
        }
    }
    BrickStep.Setting = Setting;
})(BrickStep || (BrickStep = {}));
//# sourceMappingURL=setting.js.map