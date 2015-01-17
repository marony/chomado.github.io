enchant();
 
var SCREEN_WIDTH = 320;
var SCREEN_HEIGHT = 320;
var CHARACTER_WIDTH = 32;
var CHARACTER_HEIGHT = 32;
 
window.onload = function() 
{
	var core = new Core(SCREEN_WIDTH, SCREEN_HEIGHT);
	core.preload('image/chara1.png');
	core.fps = 15;
 
	// score
	var score = 0;
	var scoreLabel = new Label('Score: 0');
	scoreLabel.x = 200;
	scoreLabel.y = 5;
 
	// time_limit
	var timeLeft = 10 * core.fps;
	var timeLabel = new Label('Time: ?');
	timeLabel.x = 5;
	timeLabel.y = 5;
	core.on('enterframe', function() {
		timeLeft--;
		timeLabel.text = 'Time: ' + timeLeft;
 
		if (timeLeft < 0) {
			alert('Your score: ' + score);
			this.stop();
		}
	});
 
	// Charaクラス : new Chara(どのアイコン画像, 触れた時にいくつ増減するか)
	var Chara = Class.create(Sprite, {
		initialize: function (frameNumber, point) { 
			Sprite.call(this, CHARACTER_WIDTH, CHARACTER_HEIGHT);
			this.set_random_position();
			this.frame = frameNumber;
			this.image = core.assets['image/chara1.png'];
 
			this.on('touchstart', function() {
				score += point;
				scoreLabel.text = 'Score: ' + score;
				this.set_random_position();
			});
			core.rootScene.addChild(this);
		},
		set_random_position: function () {
			this.x = rand(SCREEN_WIDTH - CHARACTER_WIDTH);
			this.y = rand(SCREEN_HEIGHT - CHARACTER_HEIGHT);
		}
	});
 
	// main
	core.onload = function() {
		var girl = new Chara(12, 3);
 
		var enemies = [];
		for (var i = 0; i < 9; i++) {
			enemies[i] = new Chara(i, -2);
		}
 
		girl.on('touchstart', function() {
			for (var i = 0; i < enemies.length; i++) {
				enemies[i].set_random_position();
			}
		});
 
		core.rootScene.addChild(scoreLabel);
		core.rootScene.addChild(timeLabel);
	}
	core.start();
}
function rand(n) {
	return Math.floor(Math.random() * (n + 1));
}
