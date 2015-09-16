const BxSlider = (($) => {

  const NAME                = 'bxslider'
  const VERSION             = '5.0.0'
  const DATA_KEY            = 'bxslider'
  const EVENT_KEY           = `.${DATA_KEY}`

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class BxSlider {

    constructor(element, config) {
      this.$element = $(element);
      this.$children = this.$element.children();
      this.config = config;

      this._plugins = {};
      this._loadPlugins();
    }

    // public

    go(index) {
      console.error('The `go` method must exist in at least one plugin.');
    }

    // private

    _loadPlugins() {
      $.fn[NAME].Constructor.Plugins.forEach((plugin) => {
        let pluginInstance = new plugin(this);
        plugin.publicMethods().forEach((methodKey) => {
          BxSlider.prototype[methodKey] = plugin.prototype[methodKey].bind(pluginInstance);
        });
      });
    }

    static _jQueryInterface(config, ...args) {
      return this.each(function () {
        let $this = $(this);
        let data  = $this.data(DATA_KEY);

        if (!data) {
          data = data = new BxSlider(this, config);
          $this.data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          data[config].apply(this, args);
        }
      })
    }

  }

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = BxSlider._jQueryInterface;
  $.fn[NAME].Constructor = BxSlider;
  $.fn[NAME].Constructor.Plugins = [];

  return BxSlider;

})(jQuery);