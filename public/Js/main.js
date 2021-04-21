import Container from './container.js';
import Player from './player.js';
import Enemy from './enemy.js';

// game start
$(function(){

  var player = new Player();
  var container = new Container(player);

  var enemies = [];

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
          var enemy = new Enemy(container);
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
    var game_interval = setInterval(function(){
      console.log(container.background.css('animation-play-state'));
      player.update_player();
      player.move_player(container);
      player.move_background(container);

      container.update_container();

      $(enemies).each(function(){
        this.update_enemy();
        this.move_enemy(container, player);
        this.destroy_enemy(container, player);
        this.deal_damage(player);
        });
      // player_floor = container_bottom - (player.height*2);
      }, 10);
    // };
  });
