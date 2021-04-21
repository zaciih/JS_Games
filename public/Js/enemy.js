export default class Enemy {
  constructor(container) {
    this.spawn = container.container.prepend("<div class='enemy' id='enemy'></div");
    this.enemy = $("#enemy");
    this.height = this.enemy.height();
    this.width = this.enemy.width();
    this.posx = Math.floor(Math.random()*container.width);
    this.posy = Math.floor(Math.random()*container.height);
    this.enemy_direction = -1;
    };
  update_enemy(){
    this.top = this.enemy.offset().top;
    this.bottom = this.top + this.height;
    this.left = this.enemy.offset().left;
    this.right = this.left + this.width;
    };
  move_enemy(container, player){
    this.enemy.css({
      'left': this.posx + "px",
      'top': this.posy + "px"
      });
    this.posy += container.enemy_grav;
    this.posx += this.enemy_direction;
    if (this.left == container.container_left && this.posy >= container.player_floor) {
      this.enemy_direction = 1;
    }
    else if (this.right == container.container_right && this.posy >= container.player_floor) {
      this.enemy_direction = -1;
    };
    if (player.right >= container.background_right && player.player_left == true && this.enemy_direction != 1) {
        this.enemy_direction = -2;
    };
    if (this.posy >= container.player_floor) {
      this.posy = container.player_floor;
    };
  };
  destroy_enemy(container, player){
    if ((player.bottom - 1.5) == this.top && player.right >= this.left && player.left <= this.right
    || this.right <= container.container_left) {
      this.enemy.remove();
      };
    };
  deal_damage(player){
    if (this.left <= player.right && this.right >= player.left && player.top <= this.top && player.bottom >= this.bottom) {
      player.health -=1;
      this.enemy.remove();
      console.log("taking damage" + player.health);
      }
    };
  };
