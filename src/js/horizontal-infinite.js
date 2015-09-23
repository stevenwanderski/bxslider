class HorizontalInfinite {
  constructor(slider) {
    this.slider = slider;
    this.setupDefaults();
    this.setupEventHandlers();
  }

  setupDefaults() {
    let defaults = {
      infinite: true
    }

    this.slider.config = Object.assign(defaults, this.slider.config);
  }

  setupEventHandlers() {
    this.slider.$element.on('bxs:go', this.onGo.bind(this));
  }

  onGo(e, params) {
    if(this.needToAppend(params.fromIndex, params.toIndex)){

    }
  }

  needToAppend(fromIndex, toIndex) {

  }

  static publicMethods() {
    return [];
  }

  static pluginName() {
    return 'HorizontalInfinite';
  }
}

$.fn.bxslider.Constructor.Plugins.push(HorizontalInfinite);