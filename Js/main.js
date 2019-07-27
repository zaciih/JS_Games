$(function(){
  class Player {
    constructor() {
      this.player = $("#player");
      this.height = this.player.height();
      this.width = this.player.width();
      this.top = this.player.offset().top;
      this.bottom = this.top + this.height;
      this.left = this.player.offset().left;
      this.right = this.left + this.width;
      this.posx = 5;
      this.posy = 5;
      };
    update_player(top, bottom, left, right){
      top = this.player.offset().top;
      bottom = this.top + this.height;
      left = this.player.offset().left;
      right = this.left + this.width;
      move_player(top, bottom, left, right);
      console.log("player posx = "+ player.posx);
      console.log("wall = "+ background_right);
      };
    };


  var player = new Player();

  var container = $("#game_area");
  var container_top = container.offset().top;
  var container_bottom = container_top + container.height();
  var container_left = container.offset().left;
  var container_right = container_left + container.width();
  var player_floor = container_bottom - (player.height*1.5);

  // game_start();

  var background = $("#background");
  var background_right = container_right - player.width;
  var player_left = false;
  var player_right = false;
  var jump = false;

  var gravity = 0.1;
  var gravityspeed = 0;
  var grav_decrease = -5;

  var game_interval;


  //arrow key movement
  $(document).keydown(function(e){
    switch (e.which) {
        case 37:
        case 65:
          player_left = true;
        break;

        case 39:
        case 68:
          player_right = true;
        break;

        case 38:
        case 87:
          jump = true;
        break;

        default: return; //exit this handler for other keys
      }
      e.preventDefault(); //prevent the default action (scroll / move caret)
    });

  $(document).keyup(function(e){
    switch (e.which) {
      case 37:
      case 65:
        player_left = false;
      break;

      case 39:
      case 68:
        player_right = false;
      break;

      case 38:
      case 87:
        jump = false;
      break;

      default: return;
      }
      e.preventDefault();
    });

  // function game_start(){
    game_interval = setInterval(function(container, container_bottom, container_left,
      container_right, background_right, background_left, player_floor){
      container = $("#game_area");
      container_top = container.offset().top
      container_bottom = container_top + container.height();
      container_left = container.offset().left;
      container_right = container_left + container.width();
      background_right = container_right - (player.width*2);
      player.update_player();
      player_floor = container_bottom - (player.height*2);
      move_background(background_right, player_right);
      }, 10);
    // };

  function move_player(top, bottom, left, right){
    player.player.css({
        'left': player.posx + "px",
        'top': player.posy + "px"
      });
    player.posy += gravityspeed;
    gravityspeed += gravity;
    if (left >= container_left && player_left == true) {
      player.posx -=2;
      }
    if (right <= background_right && player_right == true) {
        player.posx +=2;
      };
    if (player.posy >= player_floor) {
      // console.log(true);
      player.posy = player_floor;
      gravityspeed = 0;
      };
    if (player.posy >= player_floor && jump == true) {
        player.posy -= 10;
        gravityspeed = grav_decrease;
      };
    };

  function move_background(background_right, player_right){
    if (player_right >= background_right && right === true) {
      background.css({
        'animation-play-state': 'running'
        });
      } else {
        background.css({
          'animation-play-state': 'paused'
          });
        };
    };
  });
