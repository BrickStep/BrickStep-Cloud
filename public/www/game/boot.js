var BrickStep;
(function (BrickStep) {
    BrickStep.user = "user";
    BrickStep.randomName = ['alligator',
        'anteater',
        'armadillo',
        'auroch',
        'axolotl',
        'badger',
        'bat',
        'beaver',
        'buffalo',
        'camel',
        'chameleon',
        'cheetah',
        'chipmunk',
        'chinchilla',
        'chupacabra',
        'cormorant',
        'coyote',
        'crow',
        'dingo',
        'dinosaur',
        'dolphin',
        'duck',
        'elephant',
        'ferret',
        'fox',
        'frog',
        'giraffe',
        'gopher',
        'grizzly',
        'hedgehog',
        'hippo',
        'hyena',
        'jackal',
        'ibex',
        'ifrit',
        'iguana',
        'koala',
        'kraken',
        'lemur',
        'leopard',
        'liger',
        'llama',
        'manatee',
        'mink',
        'monkey',
        'narwhal',
        'nyan cat',
        'orangutan',
        'otter',
        'panda',
        'penguin',
        'platypus',
        'python',
        'pumpkin',
        'quagga',
        'rabbit',
        'raccoon',
        'rhino',
        'sheep',
        'shrew',
        'skunk',
        'slow loris',
        'squirrel',
        'turtle',
        'walrus',
        'wolf',
        'wolverine',
        'wombat'];
    BrickStep.flag = false; //flag = true, have music, ==false, no music
    class KEY {
        constructor(L1, L2, L3, L4) {
            this.L = new Array(4);
            this.L[0] = L1;
            this.L[1] = L2;
            this.L[2] = L3;
            this.L[3] = L4;
        }
        disableAll(game) {
            for (var l of this.L) {
                game.input.keyboard.removeKeyCapture(l.keyCode);
                l.enabled = false;
            }
        }
        enableAll(game) {
            for (var l of this.L) {
                game.input.keyboard.addKeyCapture(l.keyCode);
                l.enabled = true;
            }
        }
        addListeners(f1, f2, f3, f4, that) {
            this.L[0].onDown.add(f1, that);
            this.L[1].onDown.add(f2, that);
            this.L[2].onDown.add(f3, that);
            this.L[3].onDown.add(f4, that);
        }
    }
    BrickStep.KEY = KEY;
    class Queue {
        constructor(max) {
            this.max = max;
            this.index = 0;
            this.cap = 0;
            this.toExact = 0;
            this.queue = new Array(max);
        }
        addOne(toAdd) {
            console.log(toAdd);
            this.index = this.index % this.max;
            if (++this.cap < this.max) {
                this.queue[this.index++] = toAdd;
                this.cap++;
            }
            else {
                console.error("queue overflow");
            }
        }
        peekOne() {
            if (this.cap > 0) {
                //console.log(this.queue[this.toExact])
                //console.log("to peek " + this.toExact);
                return this.queue[this.toExact];
            }
            else {
                console.error("queue underflow");
            }
        }
        popOne() {
            if (this.toExact >= this.max)
                this.toExact = this.toExact % this.max;
            //console.log("to Extact " + this.toExact);
            if (this.cap > 0) {
                this.cap--;
                return this.queue[this.toExact++];
            }
            else {
                console.error("queue underflow");
            }
        }
    }
    BrickStep.Queue = Queue;
    class BlackTile extends Phaser.Sprite {
        constructor(game, x, y, key) {
            super(game, x, y, key);
        }
        fadeOutToGrey() {
            this.game.add.tween(this).to({ alpha: 0.2 }, 100, "Linear", true);
        }
    }
    BrickStep.BlackTile = BlackTile;
    class LoseDialogGroup extends Phaser.Group {
        constructor(game) {
            super(game);
            this.outTween = new Phaser.Tween(this, this.game, this.game.tweens).to({ x: 1, y: 1 }, 1000, "Linear", false);
            //this.game.add.existing(this.outTween);
        }
        init(text, back, b1, b2) {
            this.statusText = text;
            this.backgroud = back;
            this.button_Try = b1;
            this.button_Menu = b2;
            this.x = 0.1;
            this.y = 0.1;
            this.alpha = 0.9;
            //b1.input.enabled = false;
            //b2.input.enabled = false;
        }
        show(score) {
            this.game.add.existing(this);
            this.statusText.setText(score);
            this.button_Menu.input.enabled = true;
            this.button_Try.input.enabled = true;
            this.visible = true;
            console.log("add");
            //this.game.add.existing(this.outTween);
            this.outTween.start();
        }
    }
    BrickStep.LoseDialogGroup = LoseDialogGroup;
    class Boot extends Phaser.State {
        constructor() {
            super();
        }
        preload() {
            //load resouces
            this.loadResouces();
            BrickStep.user = "anonymous " + BrickStep.randomName[Math.floor(Math.random() * BrickStep.randomName.length)];
        }
        loadResouces() {
            this.load.image('black', './assets/image/tile_b.png');
            this.load.image('white', './assets/image/tile_w.png');
            this.load.image('white_big', './assets/image/tile_w_b.png');
            this.load.image('black_big', './assets/image/tile_b_b.png');
            this.load.image('button_on', './assets/image/tile_w_on.png');
            this.load.image('button_off', './assets/image/tile_w_off.png');
            this.load.audio('backmusic', './assets/music/111.mp3');
            this.load.audio('drum1', './assets/music/drum/drum1.mp3');
            this.load.audio('drum2', './assets/music/drum/drum2.mp3');
            this.load.audio('drum3', './assets/music/drum/drum3.mp3');
            this.load.audio('drum4', './assets/music/drum/drum4.mp3');
            //TODO: load resouces
            this.load.spritesheet('button_tryAgain', './assets/image/button/buttonTryAgain.png', 163, 67, 3);
            this.load.spritesheet('button_menu', './assets/image/button/buttonMenu.png', 163, 67, 3);
            this.load.image('youLose', './assets/image/youLose.png');
        }
        create() {
            //settings for the game
            //disable multitouch or mutiinput at once
            this.input.maxPointers = 1;
            //pause the game if lost focus
            this.stage.disableVisibilityChange = false;
            //cache should not be clean ever
            this.game.state.start('menu', true, false);
        }
    }
    BrickStep.Boot = Boot;
})(BrickStep || (BrickStep = {}));
//# sourceMappingURL=boot.js.map