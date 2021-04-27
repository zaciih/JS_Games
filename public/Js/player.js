export default class Player {
  constructor() {
    this.player = $("#player");
    this.height = this.player.height();
    this.width = this.player.width();
    this.posx = 5;
    this.posy = 5;
    this.health = 3;
    this.maxHP = 3;
    this.player_left = false;
    this.player_right = false;
    this.jump = false;
    };
  update_player(){
    this.top = this.player.offset().top;
    this.bottom = this.top + this.height;
    this.left = this.player.offset().left;
    this.right = this.left + this.width;
    };
  move_player(container){
    this.player.css({
        'left': this.posx + "px",
        'top': this.posy + "px"
        });
    this.posy += container.gravityspeed;
    container.gravityspeed += container.gravity;
    if (this.left >= container.container_left && this.player_left == true) {
      this.posx -=2;
      }
    if (this.right <= container.background_right && this.player_right == true) {
        this.posx +=2;
        };
    if (this.posy >= container.player_floor) {
      this.posy = container.player_floor;
      };
    if (this.posy >= container.player_floor && this.jump == true) {
        this.posy -= 10;
        container.gravityspeed = container.grav_decrease;
      };
    };
  move_background(container){
    if (this.right >= container.background_right && this.player_right == true) {
      container.background.css({
        'animation-play-state': 'running'
        });
      } else {
          container.background.css({
            'animation-play-state': 'paused'
            });
        };
    };
  };
