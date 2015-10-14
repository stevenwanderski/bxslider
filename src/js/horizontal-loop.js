class HorizontalLoop {
  constructor(slider, config) {
    this.slider = slider;
    this.config = config;
  }

  init() {
    this.setup();
  }

  setupEventHandlers() {
    this.slider.$el.on('bxs:transitionEnd', this.onTransitionEnd.bind(this));
    $(window).on('resize', this.onResize.bind(this));
  }

  setup() {
    this.setupDefaults();
    this.setupEventHandlers();
    this.purgeClones();
    this.setupClones();
    this.setupChildren();
    this.setupStartingIndex();
  }

  setupDefaults() {
    this.config = Object.assign(HorizontalLoop.defaults());
  }

  setupClones() {
    let cloneCount = this.slider.getVisibleSlideCount();
    this.appendClones(cloneCount);
    this.prependClones(cloneCount);
  }

  setupChildren() {
    this.slider.$children = this.slider.$children.filter('[data-bxslider-index]');
  }

  setupStartingIndex() {
    this.slider.go(this.slider.currentIndex, 0);
  }

  purgeClones() {
    this.slider.$el.find(`.${this.config.cloneClassName}`).remove();
  }

  appendClones(cloneCount) {
    let clones = this.slider.$children.slice(0, cloneCount).clone().addClass(this.config.cloneClassName).removeAttr('data-bxslider-index');
    this.slider.$el.append(clones);
  }

  prependClones(cloneCount) {
    let childrenLength = this.slider.$children.length;
    let clones = this.slider.$children.slice(childrenLength - cloneCount).clone().addClass(this.config.cloneClassName).removeAttr('data-bxslider-index');
    this.slider.$el.prepend(clones);
  }

  onTransitionEnd(e, params) {
    if(this.shouldReset(params.fromIndex, params.toIndex)){
      this.slider.go(0, 0);
    }
  }

  onResize(e) {
    this.setup();
  }

  shouldReset(fromIndex, toIndex) {
    return (fromIndex >= this.slider.$children.length - 1) && (toIndex >= this.slider.$children.length);
  }

  static shouldInitialize(config) {
    return config.infinite;
  }

  static defaults() {
    return {
      infinite: true,
      cloneClassName: 'bx-clone'
    }
  }

  static publicMethods() {
    return [];
  }

  static pluginName() {
    return 'HorizontalLoop';
  }
}

$.fn.bxslider.Constructor.Plugins.push(HorizontalLoop);