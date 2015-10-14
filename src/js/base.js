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

    constructor(el, config) {
      this.$el = $(el);
      this.config = config;
      this.loadPlugins();
    }

    loadPlugins() {
      $.fn[NAME].Constructor.Plugins.forEach((plugin) => {
        let config = Object.assign(plugin.defaults(), this.config);

        if(!plugin.shouldInitialize(config)){
          next;
        }

        let pluginInstance = new plugin(this, config);
        pluginInstance.init();

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