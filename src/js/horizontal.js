class Horizontal {
  constructor(slider, config) {
    this.slider = slider;
    this.config = config;
    this.slider.$children = this.slider.$el.children();
  }

  init() {
    console.log('i am lakos.');
    this.setup();
  }

  setupEventHandlers() {
    this.slider.$el.on('bxs:go', this.onGo.bind(this));
    this.slider.$el.on('transitionend', this.onTransitionEnd.bind(this));
    $(window).on('resize', this.onResize.bind(this));
  }

  setupDefaults() {
    this.config = Object.assign(Horizontal.defaults(), this.config);
  }

  setup() {
    this.setupDefaults();
    this.setupEventHandlers();

    this.slider.$el.wrap('<div class="bxslider-stage"></div>');
    this.slider.$stage = this.slider.$el.parent();
    this.slider.$children.each(function(index, el){
      $(el).attr('data-bxslider-index', index);
    });
    this.setSlideWidths();
    this.go(this.config.startIndex, 0);
  }

  go(index, speed = this.config.speed) {
    this.slider.$el.trigger('bxs:go', {
      fromIndex: this.slider.currentIndex,
      toIndex: index,
      speed: speed
    });
  }

  onGo(e, params) {
    this.slider.transitionParams = params;
    this.slider.currentIndex = params.toIndex > this.slider.$children.length - 1 ? 0 : params.toIndex;

    let leftPosition = this.getNewPosition(params.toIndex);
    this.slider.$el.css('transition-duration', `${params.speed}s`);
    this.slider.$el.css('left', -leftPosition);
  }

  onTransitionEnd(e, params) {
    this.slider.$el.trigger('bxs:transitionEnd', this.slider.transitionParams);
    this.slider.transitionParams = null;
  }

  onResize(e, params) {
    this.setSlideWidths();
    this.go(this.slider.currentIndex, 0);
  }

  getNewPosition(index) {
    let positionIndex = index;

    if(this.config.preventSlideWhitespace){
      let lastVisibleIndex = this.slider.$children.length - this.getVisibleSlideCount();
      if(index > lastVisibleIndex){
        positionIndex = lastVisibleIndex;
      }
    }

    return this.slider.$children.filter('[data-bxslider-index]').eq(positionIndex).position().left;
  }

  getNewIndex(index) {
    let newIndex = index;

    if(this.config.preventSlideWhitespace){
      let lastVisibleIndex = this.getLastVisibleIndex();
      if(index > lastVisibleIndex){
        newIndex = lastVisibleIndex;
      }
    }

    return newIndex;
  }

  getVisibleSlideCount() {
    return this.config.breakPoints[this.getBreakPoint()];
  }

  getLastVisibleIndex() {
    return this.slider.$children.length - this.getVisibleSlideCount();
  }

  getBreakPoint() {
    let windowWidth = $(window).width();
    let sortedBreakPointsKeys = Object.keys(this.config.breakPoints);
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

  static shouldInitialize(config) {
    return true;
  }

  static defaults() {
    return {
      breakPoints: {
        0: 1
      },
      speed: 0.5,
      startIndex: 0,
      preventSlideWhitespace: false
    }
  }

  static publicMethods() {
    return ['go', 'getVisibleSlideCount', 'getLastVisibleIndex'];
  }

  static pluginName() {
    return 'Horizontal'
  }
}

$.fn.bxslider.Constructor.Plugins.push(Horizontal);