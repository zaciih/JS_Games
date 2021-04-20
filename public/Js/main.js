import Container from './container.js';
import Player from './player.js'

// game start
$(function(){

  var player = new Player();
  var container = new Container(player);

  var enemy_direction = 1;

  class Enemy {
    constructor() {
      this.spawn = container.prepend("<div class='enemy' id='enemy'></div");
      this.enemy = $("#enemy");
      this.height = this.enemy.height();
      this.width = this.enemy.width();
      this.posx = Math.floor(Math.random()*container.width());
      this.posy = Math.floor(Math.random()*container.height());
      this.enemy_direction = -1;
      };
    update_enemy(){
      this.top = this.enemy.offset().top;
      this.bottom = this.top + this.height;
      this.left = this.enemy.offset().left;
      this.right = this.left + this.width;
      };
    move_enemy(){
      this.enemy.css({
        'left': this.posx + "px",
        'top': this.posy + "px"
        });
      this.posy += enemy_grav;
      this.posx += this.enemy_direction;
      if (this.left == container_left && this.posy >= player_floor) {
        console.log("enemy hit left");
        this.enemy_direction = 1;
      }
      else if (this.right == container_right && this.posy >= player_floor) {
        console.log("enemy hit right");
        this.enemy_direction = -1;
        console.log(this.enemy_direction);
      };
      if (player.right >= background_right && player_left == true && this.enemy_direction != 1) {
          this.enemy_direction = -2;
      };
      if (this.posy >= player_floor) {
        this.posy = player_floor;
      };
    };
    destroy_enemy(){
      if ((player.bottom - 1.5) == this.top && player.right >= this.left && player.left <= this.right
      || this.right <= container_left) {
        this.enemy.remove();
        };
      };
    deal_damage(){
      if (this.left <= player.right && this.right >= player.left && player.top <= this.top && player.bottom >= this.bottom) {
        player.health -=1;
        this.enemy.remove();
        console.log("taking damage" + player.health);
        }
      };
    };

  var enemies = [];

  var game_interval;

  //arrow key movement
  $(document).keydown(function(e){
    switch (e.which) {
        case 37:
        case 65:
          player.player_left = true;
        break;

        case 39:
        case 68:
          player.player_right = true;
        break;

        case 38:
        case 87:
          player.jump = true;
        break;

        case 32:
          // square = new Test;
          var enemy = new Enemy;
          enemies.push(enemy);
        break;

        default: return; //exit this handler for other keys
      }
      e.preventDefault(); //prevent the default action (scroll / move caret)
    });

  $(document).keyup(function(e){
    switch (e.which) {
      case 37:
      case 65:
        player.player_left = false;
      break;

      case 39:
      case 68:
        player.player_right = false;
      break;

      case 38:
      case 87:
        player.jump = false;
      break;

      default: return;
      }
      e.preventDefault();
    });

  // function game_start(){
    game_interval = setInterval(function(){
      player.update_player();
      player.move_player(container);
      player.move_background(container);

      $(enemies).each(function(){
        this.update_enemy();
        this.move_enemy();
        this.destroy_enemy();
        this.deal_damage();
        });
      // player_floor = container_bottom - (player.height*2);
      }, 10);
    // };
  });
