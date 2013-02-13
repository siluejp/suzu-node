enchant();
window.onload = function(){

    if ( !window.confirm('即応力テスト：クマをクリックして消しましょう！') ) location.href="/";
    
    var score = 0;
    var game = new Game(320, 320);
    game.fps = 15;
    game.preload("images/chara1.png");

    game.onload = function(){
    
        var gameOverScene = new Scene();
        gameOverScene.backgroundColor = 'black';
        
        var Bear = Class.create( Sprite, {
            initialize: function(x, y) {
                Sprite.call ( this, 32, 32 );
                this.x = x;
                this.y = y;
                this.frame = rand(5);
                this.opacity = rand(100) / 100;
                this.image = game.assets['chara1.png'];
                
                this.addEventListener("enterframe", function(){
		            this.x += 1;
        		    this.frame = this.age % 2 + 6;
        		    console.log( this.age );
        		    
        		    if ( this.age > 60 ) {
        		        game.pushScene(gameOverScene);
        		        var label = new Label();
                        label.x = 100;
                        label.y = 160;
                        label.color = 'white';
                        label.font = '30px "Arial"';
                        label.text = score + '匹撃退';
    
                        var label2 = new Label();
                        label2.x = 100;
                        label2.y = 200;
                        label2.color = 'white';
                        label2.font = '14px "Arial"';
                        label2.text = '10秒後に自動で戻ります';
    
                        gameOverScene.addChild(label);
                        gameOverScene.addChild(label2);
        		        game.stop();
        		        
        		        setTimeout( function() {
      						location.href="/";
						}, 10000);
        		    }
       			});
       			this.addEventListener("touchstart", function(){
            		game.rootScene.removeChild(this);
            		score += 1;
        		});
                game.rootScene.addChild(this);
            }
        });
        
        var bears = [];
        for ( var i = 0; i < 100; i++ ) {
        	bears[i] = new Bear( rand(320), rand(320) );
        }
	}
    game.start();
};

function rand(n) {
	return Math.floor( Math.random() * ( n + 1 ) );
}