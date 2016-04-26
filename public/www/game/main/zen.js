var BrickStep;
(function (BrickStep) {
    class ZenMode extends Phaser.State {
        constructor(...args) {
            super(...args);
            this.isLost = false;
            this.isPush = false;
        }
        L1() {
            this.LDown(0);
        }
        L2() {
            this.LDown(1);
        }
        L3() {
            this.LDown(2);
        }
        L4() {
            this.LDown(3);
        }
        LDown(index) {
            let toBe = this.BlackQueue.peekOne();
            if (toBe.indexInRow != index) {
                this.youDie();
            }
            else {
                if (this.isLost)
                    return;
                if (BrickStep.flag == true) {
                    if (index == 0) {
                        this.drum1.play();
                    }
                    else if (index == 1) {
                        this.drum2.play();
                    }
                    else if (index == 2) {
                        this.drum3.play();
                    }
                    else if (index == 3) {
                        this.drum4.play();
                    }
                }
                this.addRowOfTiles();
                this.tiles.addAll('y', 160);
                //console.log("You Win " + toBe.indexInRow);
                toBe.fadeOutToGrey();
                this.BlackQueue.popOne();
            }
        }
        preload() {
            this.BlackQueue = new BrickStep.Queue(5000);
        }
        create() {
            this.isLost = false;
            this.isPush = false;
            let L1 = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
            let L2 = this.game.input.keyboard.addKey(Phaser.Keyboard.F);
            let L3 = this.game.input.keyboard.addKey(Phaser.Keyboard.J);
            let L4 = this.game.input.keyboard.addKey(Phaser.Keyboard.K);
            this.key = new BrickStep.KEY(L1, L2, L3, L4);
            this.key.addListeners(this.L1, this.L2, this.L3, this.L4, this);
            this.drum1 = this.game.add.audio('drum1');
            this.drum2 = this.game.add.audio('drum2');
            this.drum3 = this.game.add.audio('drum3');
            this.drum4 = this.game.add.audio('drum4');
            this.BlackQueue = new BrickStep.Queue(10000);
            this.game.stage.backgroundColor = '#ffffff';
            this.tiles = this.game.add.group();
            var style = {
                font: "32px Futura condensed",
                align: "center",
                fill: "#3d3d3d"
            };
            this.score = 0;
            this.scoreText = this.game.add.text(this.game.world.centerX, 20, '0', style);
            this.scoreText.anchor = new Phaser.Point(0.5, 0.5);
            this.DText = this.game.add.text(10, 600, 'D', style);
            this.FText = this.game.add.text(130, 600, 'F', style);
            this.JText = this.game.add.text(250, 600, 'J', style);
            this.KText = this.game.add.text(370, 600, 'K', style);
            this.initTiles();
            this.initLosePage();
        }
        youDie() {
            console.log("YOU DIE");
            this.isLost = true;
            this.loseGroup.show(this.scoreText.text);
            if (this.isPush)
                return;
            this.isPush = true;
            var url = "/score?username=" + BrickStep.user + "&score=" + this.scoreText.text + "&mode=z";
            $.get(url);
        }
        retry() {
            this.game.state.restart();
        }
        initLosePage() {
            this.loseGroup = new BrickStep.LoseDialogGroup(this.game);
            this.loseGroup.visible = false;
            let background = new Phaser.Sprite(this.game, this.game.world.centerX, this.game.world.centerY, 'youLose');
            background.anchor = new Phaser.Point(0.5, 0.5);
            this.loseGroup.add(background);
            let style = {
                font: "120px Futura condensed",
                align: "center",
                fill: "#000000"
            };
            let statusText = new Phaser.Text(this.game, 240, 275, '', style);
            statusText.anchor = new Phaser.Point(0.5, 0.5);
            this.loseGroup.add(statusText);
            //let b1 = new Phaser.Button(this.game,120,573,'button_tryAgain',this.retry,this,1,0,2,0);
            let b1 = new Phaser.Button(this.game, 120, 573, 'button_tryAgain', this.retry, this, 1, 0, 2, 0);
            let b2 = new Phaser.Button(this.game, 360, 573, 'button_menu', this.backToMenu, this, 1, 0, 2, 0);
            b1.anchor = new Phaser.Point(0.5, 0.5);
            b2.anchor = new Phaser.Point(0.5, 0.5);
            //this.game.add.existing(b1);
            this.loseGroup.add(b1);
            this.loseGroup.add(b2);
            this.loseGroup.init(statusText, background, b1, b2);
        }
        initTiles() {
            // random roll a number from 0 to 3
            // the rolled number is the black tile, the others are white
            for (var j = 3; j > -1; j--) {
                var black = Math.floor(Math.random() * 4);
                for (var i = 0; i < 4; i++)
                    if (i != black) {
                        this.addWhiteTile(i * 120, j * 160);
                    }
                    else {
                        this.addBlackTile(i * 120, j * 160, i);
                    }
            }
        }
        addWhiteTile(x, y) {
            // Create a tile at the position x and y
            var tile = this.game.add.sprite(x, y, 'white');
            // Add to created group
            this.tiles.add(tile);
            tile.checkWorldBounds = true;
            tile.outOfBoundsKill = true;
            tile.events.onEnterBounds.add(this.destoryLisenter, tile);
        }
        addBlackTile(x, y, index) {
            // Create a tile at the position x and y
            let tile = new BrickStep.BlackTile(this.game, x, y, 'black');
            this.game.add.existing(tile);
            tile.indexInRow = index;
            console.log(tile.indexInRow);
            this.BlackQueue.addOne(tile);
            tile.events.onOutOfBounds.add(this.blackTileKillListener, this);
            // Add to created group
            this.tiles.add(tile);
            tile.checkWorldBounds = true;
            tile.outOfBoundsKill = true;
            // console.log(tile.checkWorldBounds);
            tile.events.onEnterBounds.add(this.destoryLisenter, this, 0, tile);
        }
        destoryLisenter(tile) {
            console.log("addedListener");
            // Automatically kill the pipe when it's no longer visible
            tile.outOfBoundsKill = true;
        }
        blackTileKillListener(tile) {
            if (tile === this.BlackQueue.peekOne()) {
                console.log("YOU LOSE");
            }
            //this.BlackQueue.popOne();
        }
        addRowOfTiles() {
            this.score++;
            // random roll a number from 0 to 3
            var black = Math.floor(Math.random() * 4);
            // the rolled number is the black tile, the others are white
            for (var i = 0; i < 4; i++)
                if (i != black) {
                    this.addWhiteTile(i * 120, -160);
                }
                else {
                    this.addBlackTile(i * 120, -160, i);
                }
        }
        backToMenu() {
            this.game.state.start('menu', true, false);
        }
        update() {
            this.scoreText.setText(this.score);
        }
    }
    BrickStep.ZenMode = ZenMode;
})(BrickStep || (BrickStep = {}));
//# sourceMappingURL=zen.js.map