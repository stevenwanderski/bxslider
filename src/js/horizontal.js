class Horizontal {
  constructor(slider) {
    this.slider = slider;
    this.slider.currentIndex = 0;
    this.setupDefaults();
    this.setupEventHandlers();
    this.setup();
  }

  setupDefaults() {
    let defaults = {
      breakPoints: {
        0: 1
      },
      speed: 500,
      preventSlideWhitespace: false
    }

    this.slider.config = Object.assign(defaults, this.slider.config);
  }

  setupEventHandlers() {
    this.slider.$element.on('bxs:go', this.onGo.bind(this));
    $(window).on('resize', this.onResize.bind(this));
  }

  setup() {
    this.slider.$element.wrap('<div class="bxslider-stage"></div>');
    this.slider.$stage = this.slider.$element.parent();
    this.setSlideWidths();
  }

  go(index, speed = this.slider.config.speed) {
    this.slider.$element.trigger('bxs:go', {
      fromIndex: this.slider.currentIndex,
      toIndex: index,
      speed: speed
    });
  }

  onGo(e, params) {
    this.slider.currentIndex = params.toIndex;

    let leftPosition = this.getNewPosition(this.slider.currentIndex);
    this.slider.$element.css('transition-duration', `${params.speed}ms`);
    this.slider.$element.css('left', -leftPosition);

    // Add completed go event here
  }

  onResize(e, params) {
    this.setSlideWidths();
    this.go(this.slider.currentIndex, 0);
  }

  getNewPosition(index) {
    let positionIndex = index;
    if(this.slider.config.preventSlideWhitespace){
      let lastVisibleIndex = this.slider.$children.length - this.slider.getVisibleSlideCount();
      if(index > lastVisibleIndex){
        positionIndex = lastVisibleIndex;
      }
    }
    return this.slider.$children.eq(positionIndex).position().left;
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

$.fn.bxslider.Constructor.Plugins.push(Horizontal);