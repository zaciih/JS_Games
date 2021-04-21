export default class Container {
  constructor(player) {
    this.container = $("#game_area");
    this.width = this.container.width();
    this.height = this.container.height();
    this.container_top = this.container.offset().top;
    this.container_bottom = this.container_top + this.height;
    this.container_left = this.container.offset().left;
    this.container_right = this.container_left + this.width;
    this.player_floor = this.container_bottom - (player.height*1.5);
    this.background = $("#background");
    this.background_right = this.container_right - player.width;
    this.gravity = 0.1;
    this.gravityspeed = 0;
    this.grav_decrease = -5;
    this.enemy_grav = 5;
  };
  update_container(){
    this.container_left = this.container.offset().left;
  }
}
