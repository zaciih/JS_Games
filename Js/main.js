$(function(){
  class Player {
    constructor() {
      this.player = $("#player");
      this.height = this.player.height();
      this.width = this.player.width();
      this.posx = 5;
      this.posy = 5;
      };
      update_player(){
        this.top = this.player.offset().top;
        this.bottom = this.top + this.height;
        this.left = this.player.offset().left;
        this.right = this.left + this.width;
        };
      move_player(){
        this.player.css({
            'left': player.posx + "px",
            'top': player.posy + "px"
            });
        this.posy += gravityspeed;
        gravityspeed += gravity;
        if (this.left >= container_left && player_left == true) {
          this.posx -=2;
          }
        if (this.right <= background_right && player_right == true) {
            this.posx +=2;
            };
        if (this.posy >= player_floor) {
          this.posy = player_floor;
          };
        if (this.posy >= player_floor && jump == true) {
            this.posy -= 10;
            gravityspeed = grav_decrease;
          };
        };
      move_background(){
        if (this.right >= background_right && player_right == true) {
          background.css({
            'animation-play-state': 'running'
            });
          } else {
              background.css({
                'animation-play-state': 'paused'
                });
            };
        };
    };

  var player = new Player();

  var container = $("#game_area");
  var container_top = container.offset().top;
  var container_bottom = container_top + container.height();
  var container_left = container.offset().left;
  var container_right = container_left + container.width();
  var player_floor = container_bottom - (player.height*1.5);

  class Enemy {
    constructor() {
      this.spawn = container.prepend("<div class='enemy' id='enemy'></div");
      this.enemy = $("#enemy");
      this.height = this.enemy.height();
      this.width = this.enemy.width();
      this.posx = Math.floor(Math.random()*container.width());
      this.posy = Math.floor(Math.random()*container.height());
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
        if (this.left >= container_left && this.posy >= player_floor) {
          this.posx -=1;
          };
        if (this.posy >= player_floor) {
          this.posy = player_floor;
          };
        };
        destroy_enemy(){
          if ((player.bottom - 1.5) == this.top && player.right >= this.left && player.left <= this.right) {
            this.enemy.remove();
        };
      };
    };

  var enemies = [];

  // game_start();

  var background = $("#background");
  var background_right = container_right - player.width;
  var player_left = false;
  var player_right = false;
  var jump = false;

  var gravity = 0.1;
  var gravityspeed = 0;
  var grav_decrease = -5;
  var enemy_grav = 5;

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

        case 32:
          enemy = new Enemy;
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
    game_interval = setInterval(function(){
      container = $("#game_area");
      container_top = container.offset().top
      container_bottom = container_top + container.height();
      container_left = container.offset().left;
      container_right = container_left + container.width();
      background_right = container_right - (player.width*2);
      $(player).each(function(){
        this.update_player();
        this.move_player();
        this.move_background();
      });
      $(enemies).each(function(){
        this.update_enemy();
        this.move_enemy();
        this.destroy_enemy();
        });
      player_floor = container_bottom - (player.height*2);
      }, 10);
    // };
  });
