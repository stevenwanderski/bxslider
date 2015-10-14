class PagerControls {
  constructor(slider) {
    this.slider = slider;
  }

  setupDefaults() {
    let defaults = {
      forwardControl: true,
      forwardClassName: 'bx-forward',
      forwardSelector: '.bx-forward',
      forwardText: 'Forward',
      backControl: true,
      backClassName: 'bx-back',
      backSelector: '.bx-back',
      backText: 'Back'
    }

    this.slider.config = Object.assign(defaults, this.slider.config);
  }

  setupEventHandlers() {
    this.slider.$element.on('bxs:forward', this.onForward.bind(this));
    this.slider.$element.on('bxs:back', this.onBack.bind(this));
    this.slider.$forwardEl.on('click', this.clickForward.bind(this));
    this.slider.$backEl.on('click', this.clickBack.bind(this));
  }

  setup() {
    this.setupDefaults();

    if(this.slider.config.forwardControl){
      this.setupForwardControl();
    }

    if(this.slider.config.backControl){
      this.setupBackControl();
    }

    this.setupEventHandlers();
  }

  setupForwardControl() {
    let $forwardEl;
    if($(this.slider.config.forwardSelector).length){
      $forwardEl = $(this.slider.config.forwardSelector).first();
    }else{
      $forwardEl = $(`<a href="" class="${this.slider.config.forwardClassName}">${this.slider.config.forwardText}</a>`);
      this.slider.$element.after($forwardEl);
    }

    this.slider.$forwardEl = $forwardEl;
  }

  setupBackControl() {
    let $backEl;
    if($(this.slider.config.backSelector).length){
      $backEl = $(this.slider.config.backSelector).first();
    }else{
      $backEl = $(`<a href="" class="${this.slider.config.backClassName}">${this.slider.config.backText}</a>`);
      this.slider.$element.after($backEl);
    }

    this.slider.$backEl = $backEl;
  }

  onForward(e, params) {
    this.slider.go(this.getForwardIndex());
  }

  onBack(e, params) {
    this.slider.go(this.getBackIndex());
  }

  clickForward(e, params) {
    e.preventDefault();
    this.forward();
  }

  clickBack(e, params) {
    e.preventDefault();
    this.back();
  }

  getForwardIndex() {
    return this.slider.currentIndex + 1;
    if(this.slider.currentIndex >= this.slider.$children.length - 1){
      return 0;
    }else{
      return this.slider.currentIndex + 1;
    }
  }

  getBackIndex() {
    if(this.slider.currentIndex === 0){
      return this.slider.$children.length - 1;
    }else{
      return this.slider.currentIndex - 1;
    }
  }

  forward() {
    this.slider.$element.trigger('bxs:forward', {
      from: this.slider.currentIndex,
      to: this.getForwardIndex()
    });
  }

  back() {
    this.slider.$element.trigger('bxs:back', {
      from: this.slider.currentIndex,
      to: this.getBackIndex()
    });
  }

  static publicMethods() {
    return ['forward', 'back'];
  }

  static pluginName() {
    return 'PagerControls';
  }
}

// $.fn.bxslider.Constructor.Plugins.push(PagerControls);