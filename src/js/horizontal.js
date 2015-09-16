class Horizontal {
  constructor(slider) {
    this.slider = slider;
    this.slider.currentIndex = 0;

    let defaults = {
      breakPoints: {
        0: 1
      },
      speed: 500,
      preventSlideWhitespace: false
    }

    this.slider.config = Object.assign(defaults, this.slider.config);
    this.setup();
  }

  setup() {
    this.slider.$element.wrap('<div class="bxslider-stage"></div>');
    this.slider.$stage = this.slider.$element.parent();
    this.setSlideWidths();

    $(window).on('resize', () => {
      this.setSlideWidths();
      this.go(this.slider.currentIndex, 0);
    });
  }

  go(index, speed = this.slider.config.speed) {
    this.slider.currentIndex = index;

    let newIndex = this.getNewIndex(index);

    this.slider.$element.css('transition-duration', `${speed}ms`);
    let leftPosition = this.slider.$children.eq(newIndex).position().left;
    this.slider.$element.css('left', -leftPosition);
  }

  getNewIndex(index) {
    let newIndex = index;

    if(this.slider.config.preventSlideWhitespace){
      let lastVisibleIndex = this.slider.$children.length - this.slider.getVisibleSlideCount();
      if(index > lastVisibleIndex){
        newIndex = lastVisibleIndex;
      }
    }

    return newIndex;
  }

  getVisibleSlideCount() {
    return this.slider.config.breakPoints[this.getBreakPoint()];
  }

  getBreakPoint() {
    let windowWidth = $(window).width();
    let sortedBreakPointsKeys = Object.keys(this.slider.config.breakPoints);
    let breakPoint = 0;
    for (let i = 0; i <= sortedBreakPointsKeys.length; i++) {
      if(windowWidth > sortedBreakPointsKeys[i]){
        breakPoint = sortedBreakPointsKeys[i];
      }else{
        break;
      }
    };
    return breakPoint;
  }

  setSlideWidths() {
    let elementWidth = this.slider.$stage.width();
    this.slider.$children.outerWidth(Math.floor(elementWidth / this.getVisibleSlideCount()));
  }

  static publicMethods() {
    return ['go', 'getVisibleSlideCount'];
  }

  static pluginName() {
    return 'Horizontal'
  }
}

$.fn.bxslider.Constructor.Plugins.push(Horizontal)