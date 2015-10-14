class Pager {
  constructor(slider, config) {
    this.slider = slider;
    this.config = config;
  }

  setupDefaults() {
    this.slider.config = Object.assign(Pager.defaults, this.config);
  }

  setupEventHandlers() {
    this.slider.$element.on('bxs:pager', this.onPager.bind(this));
    this.slider.$element.on('bxs:go', this.onGo.bind(this));
  }

  setup() {
    if(!this.slider.config.pager){
      return;
    }

    this.setupDefaults();
    this.setupEventHandlers();

    this.slider.$pager = $('<div class="pager"></div>');

    for(let i = 0; i < this.slider.$children.length; i++){
      let $pagerLink = $(`<a href="">${i + 1}</a>`);

      $pagerLink.on('click', (e) => {
        e.preventDefault();
        this.slider.$element.trigger('bxs:pager', { index: i });
      });

      this.slider.$pager.append($pagerLink);
    };

    this.setActive(this.slider.currentIndex);
    this.slider.$element.after(this.slider.$pager);
  }

  onPager(e, params) {
    this.slider.go(params.index);
  }

  onGo(e, params) {
    this.setActive(params.toIndex);
  }

  setActive(index) {
    this.slider.$pager
      .children()
      .removeClass(this.slider.config.pagerActiveClassName)
      .eq(index)
      .addClass(this.slider.config.pagerActiveClassName);
  }

  static shouldInitialize(config) {
    return config.pager;
  }

  static defaults() {
    return {
      pager: true,
      pagerActiveClassName: 'pager-active'
    }
  }

  static publicMethods() {
    return [];
  }

  static pluginName() {
    return 'Pager'
  }
}

$.fn.bxslider.Constructor.Plugins.push(Pager);