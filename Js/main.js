$(function(){
  class Player {
    constructor(player, top, bottom, left, right, height, width) {
      this.player = $("#player");
      this.height = this.player.height();
      this.width = this.player.width();
      this.top = this.player.offset().top;
      this.bottom = this.top + this.height;
      this.left = this.player.offset().left;
      this.right = this.left + this.width;
      }
    }


  var player = new Player();
  // var player = $("#player");
  // console.log("player height = "+ player.height);
  // console.log("player width = "+ player.width);
  // console.log("player top = "+ player.top);
  // console.log("player bottom = "+ player.bottom);
  // console.log("player left = "+ player.left);
  // console.log("player right = "+ player.right);
  var container = $("#game_area");
  var container_top = container.offset().top;
  var container_bottom = container_top + container.height();
  var container_left = container.offset().left;
  var container_right = container_left + container.width();
  var player_floor = container_bottom - (player.height*1.5);

  // game_start();

  const player_pos = {
    x: container.width()/2 - player.width/2,
    y: container.height()-100 - player.height/2,
    };

    // console.log("player_pos = "+ player_pos);

  var background = $("#background");

  // var player_left = player.offset().left
  // var player_right = player_left + player.width();
  // var player_top = player.offset().top;
  // var player_bottom = player_top + player.height();
  var background_right = container_right - player.width;
  var left = false;
  var right = false;
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
          left = true;
        break;

        case 39:
        case 68:
          right = true;
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
        left = false;
      break;

      case 39:
      case 68:
        right = false;
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
      background_right = container_right - player.width*2;
      player_left = player.left
      player_right = player.left + player.width;
      player_top = player.top;
      player_bottom = player.top + player.height;
      player_floor = container_bottom - (player.height*2);
      move_player(player_bottom, container_bottom, background_right, container_left,
         player_floor, player);
      console.log("player posy = "+ player_pos.y);
      console.log("floor = "+ player_floor);

      move_background(background_right, player_right);
      }, 10);
    // };

  function move_player(player_bottom, container_bottom, background_right,
     container_left, player_floor, player){
    player.player.css({
        'left': player_pos.x + "px",
        'top': player_pos.y + "px"
      });
    player_pos.y += gravityspeed;
    gravityspeed += gravity;
    if (player_left >= container_left && left == true) {
      player_pos.x -=2;
      }
    if (player_right <= background_right && right == true) {
        player_pos.x +=2;
      };
    if (player_pos.y >= player_floor) {
      // console.log(true);
      player_pos.y = player_floor;
      gravityspeed = 0;
      };
    if (player_pos.y >= player_floor && jump == true) {
        player_pos.y -= 10;
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
