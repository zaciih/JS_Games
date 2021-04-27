export default class Heart {
  constructor(){
    this.spawn = $("#heart_container").prepend("<div class='heart' id='heart'></div");
    this.heart = $("#heart");
    this.position = 32;
  }

  animate(){
    this.heart.css({
      'background-position': `-${this.position}px 0px`
    });
    if (this.position < 128){
      this.position += 32;
    }else {
      this.position = 32;
    }
  }
}
