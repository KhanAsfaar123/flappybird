// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };
var score = -1;
var player;
var pipes;
var pipe_interval = 1.75


// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
for(var count = 0; count < 5; count++){
}
/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("Batman","assets/flappy_batman.png");
    game.load.audio("sound", "assets/sfx_swooshing.ogg");
    game.load.image("Flappy", "assets/flappy-cropped.png")
    game.load.image("pipe","assets/pipe.png");

}

/*
 * Initialises the game. This function is only called once.
 */
function create(){
    game.stage.setBackgroundColor("#00CCFF");
    game.add.text(20,20,"Welcome to my game ", {font:"30px Calibri", fill: "#FFFFFF"});
    game.add.sprite(285,5, "Batman");
    game.input.onDown.add(clickHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(spaceHandler);
    label_score = game.add.text(10,365,"0",{font:"30px Calibri", fill:"#FFFFFF"})
    player = game.add.sprite(250,100,"Flappy")
    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown);
    pipes = game.add.group();
    for(var count = 0; count < 8; count++){
        if(count != 5){
          //  game.add.sprite(500,50 * count,"pipe");
        //game.add.sprite(700, 50 * count,"pipe");
    }
    }
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(player);
    player.body.velocity.y= -0;
    player.body.velocity.x=0;
    player.body.gravity.y=300;
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(player_jump);
    game.time.events.loop(pipe_interval*Phaser.Timer.SECOND,generate_pipe);
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
    var score = 0;
    game.physics.arcade.overlap(player, pipes, game_over);


}
function clickHandler(event){
    //alert("Click!")
   //game.add.sprite(event.x,event.y,"Batman");
}
function spaceHandler(){
    game.sound.play("sound");
    //changeScore();
}
function changeScore(){
   score = score + 1;
   label_score.setText(score.toString());

}
function player_jump(){
    player.body.velocity.y = -175;
}

function moveRight(){
    player.x = player.x + 10
}
function moveLeft(){
    player.x = player.x - 10
}
function moveUp(){
    player.y = player.y - 10
}
function moveDown(){
    player.y = player.y + 10
}
function add_pipe_block(x,y) {
    var pipe = pipes.create(x, y, "pipe");
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x = -200;
}

function generate_pipe() {
    var gap_start = game.rnd.integerInRange(1,5);
    for (var count = 0; count < 8; count = count+1) {
    if(count != gap_start && count != gap_start+1){
        add_pipe_block(750, count * 50);
     }
    }
changeScore();
}

function game_over(){
    location.reload();
}