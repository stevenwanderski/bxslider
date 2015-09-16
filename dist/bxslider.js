'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var BxSlider = (function ($) {

  var NAME = 'bxslider';
  var VERSION = '5.0.0';
  var DATA_KEY = 'bxslider';
  var EVENT_KEY = '.' + DATA_KEY;

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var BxSlider = (function () {
    function BxSlider(element, config) {
      _classCallCheck(this, BxSlider);

      this.$element = $(element);
      this.$children = this.$element.children();
      this.config = config;

      this._plugins = {};
      this._loadPlugins();
    }

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    // public

    _createClass(BxSlider, [{
      key: 'go',
      value: function go(index) {
        console.error('The `go` method must exist in at least one plugin.');
      }

      // private

    }, {
      key: '_loadPlugins',
      value: function _loadPlugins() {
        var _this = this;

        $.fn[NAME].Constructor.Plugins.forEach(function (plugin) {
          var pluginInstance = new plugin(_this);
          plugin.publicMethods().forEach(function (methodKey) {
            BxSlider.prototype[methodKey] = plugin.prototype[methodKey].bind(pluginInstance);
          });
        });
      }
    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        return this.each(function () {
          var $this = $(this);
          var data = $this.data(DATA_KEY);

          if (!data) {
            data = data = new BxSlider(this, config);
            $this.data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            data[config].apply(this, args);
          }
        });
      }
    }]);

    return BxSlider;
  })();

  $.fn[NAME] = BxSlider._jQueryInterface;
  $.fn[NAME].Constructor = BxSlider;
  $.fn[NAME].Constructor.Plugins = [];

  return BxSlider;
})(jQuery);
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Horizontal = (function () {
  function Horizontal(slider) {
    _classCallCheck(this, Horizontal);

    this.slider = slider;
    this.slider.currentIndex = 0;

    var defaults = {
      breakPoints: {
        0: 1
      },
      speed: 500,
      preventSlideWhitespace: false
    };

    this.slider.config = Object.assign(defaults, this.slider.config);
    this.setup();
  }

  _createClass(Horizontal, [{
    key: 'setup',
    value: function setup() {
      var _this = this;

      this.slider.$element.wrap('<div class="bxslider-stage"></div>');
      this.slider.$stage = this.slider.$element.parent();
      this.setSlideWidths();

      $(window).on('resize', function () {
        _this.setSlideWidths();
        _this.go(_this.slider.currentIndex, 0);
      });
    }
  }, {
    key: 'go',
    value: function go(index) {
      var speed = arguments.length <= 1 || arguments[1] === undefined ? this.slider.config.speed : arguments[1];

      this.slider.currentIndex = index;

      var newIndex = this.getNewIndex(index);

      this.slider.$element.css('transition-duration', speed + 'ms');
      var leftPosition = this.slider.$children.eq(newIndex).position().left;
      this.slider.$element.css('left', -leftPosition);
    }
  }, {
    key: 'getNewIndex',
    value: function getNewIndex(index) {
      var newIndex = index;

      if (this.slider.config.preventSlideWhitespace) {
        var lastVisibleIndex = this.slider.$children.length - this.slider.getVisibleSlideCount();
        if (index > lastVisibleIndex) {
          newIndex = lastVisibleIndex;
        }
      }

      return newIndex;
    }
  }, {
    key: 'getVisibleSlideCount',
    value: function getVisibleSlideCount() {
      return this.slider.config.breakPoints[this.getBreakPoint()];
    }
  }, {
    key: 'getBreakPoint',
    value: function getBreakPoint() {
      var windowWidth = $(window).width();
      var sortedBreakPointsKeys = Object.keys(this.slider.config.breakPoints);
      var breakPoint = 0;
      for (var i = 0; i <= sortedBreakPointsKeys.length; i++) {
        if (windowWidth > sortedBreakPointsKeys[i]) {
          breakPoint = sortedBreakPointsKeys[i];
        } else {
          break;
        }
      };
      return breakPoint;
    }
  }, {
    key: 'setSlideWidths',
    value: function setSlideWidths() {
      var elementWidth = this.slider.$stage.width();
      this.slider.$children.outerWidth(Math.floor(elementWidth / this.getVisibleSlideCount()));
    }
  }], [{
    key: 'publicMethods',
    value: function publicMethods() {
      return ['go', 'getVisibleSlideCount'];
    }
  }, {
    key: 'pluginName',
    value: function pluginName() {
      return 'Horizontal';
    }
  }]);

  return Horizontal;
})();

$.fn.bxslider.Constructor.Plugins.push(Horizontal);
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Pager = (function () {
  function Pager(slider) {
    _classCallCheck(this, Pager);

    this.slider = slider;

    var defaults = {
      pager: true
    };

    this.slider.config = Object.assign(defaults, this.slider.config);

    if (this.slider.config.pager) {
      this.setup();
    }
  }

  _createClass(Pager, [{
    key: 'setup',
    value: function setup() {
      var _this = this;

      var $pager = $('<div class="pager"></div>');

      var _loop = function (i) {
        var $pagerLink = $('<a href="">' + (i + 1) + '</a>');
        $pagerLink.on('click', function (e) {
          e.preventDefault();
          _this.clickPagerLink(i);
        });
        $pager.append($pagerLink);
      };

      for (var i = 0; i < this.slider.$children.length; i++) {
        _loop(i);
      };

      this.slider.$element.after($pager);
    }
  }, {
    key: 'clickPagerLink',
    value: function clickPagerLink(index) {
      this.slider.go(index);
    }
  }], [{
    key: 'publicMethods',
    value: function publicMethods() {
      return [];
    }
  }, {
    key: 'pluginName',
    value: function pluginName() {
      return 'Pager';
    }
  }]);

  return Pager;
})();

$.fn.bxslider.Constructor.Plugins.push(Pager);