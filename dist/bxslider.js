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

var HorizontalInfinite = (function () {
  function HorizontalInfinite(slider) {
    _classCallCheck(this, HorizontalInfinite);

    this.slider = slider;
    this.setupDefaults();
    this.setupEventHandlers();
  }

  _createClass(HorizontalInfinite, [{
    key: 'setupDefaults',
    value: function setupDefaults() {
      var defaults = {
        infinite: true
      };

      this.slider.config = Object.assign(defaults, this.slider.config);
    }
  }, {
    key: 'setupEventHandlers',
    value: function setupEventHandlers() {
      this.slider.$element.on('bxs:go', this.onGo.bind(this));
    }
  }, {
    key: 'onGo',
    value: function onGo(e, params) {
      if (this.needToAppend(params.fromIndex, params.toIndex)) {}
    }
  }, {
    key: 'needToAppend',
    value: function needToAppend(fromIndex, toIndex) {}
  }], [{
    key: 'publicMethods',
    value: function publicMethods() {
      return [];
    }
  }, {
    key: 'pluginName',
    value: function pluginName() {
      return 'HorizontalInfinite';
    }
  }]);

  return HorizontalInfinite;
})();

$.fn.bxslider.Constructor.Plugins.push(HorizontalInfinite);
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Horizontal = (function () {
  function Horizontal(slider) {
    _classCallCheck(this, Horizontal);

    this.slider = slider;
    this.slider.currentIndex = 0;
    this.setupDefaults();
    this.setupEventHandlers();
    this.setup();
  }

  _createClass(Horizontal, [{
    key: 'setupDefaults',
    value: function setupDefaults() {
      var defaults = {
        breakPoints: {
          0: 1
        },
        speed: 500,
        preventSlideWhitespace: false
      };

      this.slider.config = Object.assign(defaults, this.slider.config);
    }
  }, {
    key: 'setupEventHandlers',
    value: function setupEventHandlers() {
      this.slider.$element.on('bxs:go', this.onGo.bind(this));
      $(window).on('resize', this.onResize.bind(this));
    }
  }, {
    key: 'setup',
    value: function setup() {
      this.slider.$element.wrap('<div class="bxslider-stage"></div>');
      this.slider.$stage = this.slider.$element.parent();
      this.setSlideWidths();
    }
  }, {
    key: 'go',
    value: function go(index) {
      var speed = arguments.length <= 1 || arguments[1] === undefined ? this.slider.config.speed : arguments[1];

      this.slider.$element.trigger('bxs:go', {
        fromIndex: this.slider.currentIndex,
        toIndex: index,
        speed: speed
      });
    }
  }, {
    key: 'onGo',
    value: function onGo(e, params) {
      this.slider.currentIndex = params.toIndex;

      var leftPosition = this.getNewPosition(this.slider.currentIndex);
      this.slider.$element.css('transition-duration', params.speed + 'ms');
      this.slider.$element.css('left', -leftPosition);

      // Add completed go event here
    }
  }, {
    key: 'onResize',
    value: function onResize(e, params) {
      this.setSlideWidths();
      this.go(this.slider.currentIndex, 0);
    }
  }, {
    key: 'getNewPosition',
    value: function getNewPosition(index) {
      var positionIndex = index;
      if (this.slider.config.preventSlideWhitespace) {
        var lastVisibleIndex = this.slider.$children.length - this.slider.getVisibleSlideCount();
        if (index > lastVisibleIndex) {
          positionIndex = lastVisibleIndex;
        }
      }
      return this.slider.$children.eq(positionIndex).position().left;
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

var PagerControls = (function () {
  function PagerControls(slider) {
    _classCallCheck(this, PagerControls);

    this.slider = slider;
    this.setupDefaults();
    this.setup();
    this.setupEventHandlers();
  }

  _createClass(PagerControls, [{
    key: 'setupDefaults',
    value: function setupDefaults() {
      var defaults = {
        forwardControl: true,
        forwardClassName: 'bx-forward',
        forwardSelector: '.bx-forward',
        forwardText: 'Forward',
        backControl: true,
        backClassName: 'bx-back',
        backSelector: '.bx-back',
        backText: 'Back'
      };

      this.slider.config = Object.assign(defaults, this.slider.config);
    }
  }, {
    key: 'setupEventHandlers',
    value: function setupEventHandlers() {
      this.slider.$element.on('bxs:forward', this.onForward.bind(this));
      this.slider.$element.on('bxs:back', this.onBack.bind(this));
      this.slider.$forwardEl.on('click', this.clickForward.bind(this));
      this.slider.$backEl.on('click', this.clickBack.bind(this));
    }
  }, {
    key: 'setup',
    value: function setup() {
      if (this.slider.config.forwardControl) {
        this.setupForwardControl();
      }

      if (this.slider.config.backControl) {
        this.setupBackControl();
      }
    }
  }, {
    key: 'setupForwardControl',
    value: function setupForwardControl() {
      var $forwardEl = undefined;
      if ($(this.slider.config.forwardSelector).length) {
        $forwardEl = $(this.slider.config.forwardSelector).first();
      } else {
        $forwardEl = $('<a href="" class="' + this.slider.config.forwardClassName + '">' + this.slider.config.forwardText + '</a>');
      }

      this.slider.$forwardEl = $forwardEl;
      this.slider.$element.after(this.slider.$forwardEl);
    }
  }, {
    key: 'setupBackControl',
    value: function setupBackControl() {
      var $backEl = undefined;
      if ($(this.slider.config.backSelector).length) {
        $backEl = $(this.slider.config.backSelector).first();
      } else {
        $backEl = $('<a href="" class="' + this.slider.config.backClassName + '">' + this.slider.config.backText + '</a>');
      }

      this.slider.$backEl = $backEl;
      this.slider.$element.after(this.slider.$backEl);
    }
  }, {
    key: 'onForward',
    value: function onForward(e, params) {
      this.slider.go(this.getForwardIndex());
    }
  }, {
    key: 'onBack',
    value: function onBack(e, params) {
      this.slider.go(this.getBackIndex());
    }
  }, {
    key: 'clickForward',
    value: function clickForward(e, params) {
      e.preventDefault();
      this.slider.$element.trigger('bxs:forward');
    }
  }, {
    key: 'clickBack',
    value: function clickBack(e, params) {
      e.preventDefault();
      this.slider.$element.trigger('bxs:back');
    }
  }, {
    key: 'getForwardIndex',
    value: function getForwardIndex() {
      if (this.slider.currentIndex >= this.slider.$children.length - 1) {
        return 0;
      } else {
        return this.slider.currentIndex + 1;
      }
    }
  }, {
    key: 'getBackIndex',
    value: function getBackIndex() {
      if (this.slider.currentIndex === 0) {
        return this.slider.$children.length - 1;
      } else {
        return this.slider.currentIndex - 1;
      }
    }
  }], [{
    key: 'publicMethods',
    value: function publicMethods() {
      return [];
    }
  }, {
    key: 'pluginName',
    value: function pluginName() {
      return 'PagerControls';
    }
  }]);

  return PagerControls;
})();

$.fn.bxslider.Constructor.Plugins.push(PagerControls);
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Pager = (function () {
  function Pager(slider) {
    _classCallCheck(this, Pager);

    this.slider = slider;
    this.setupDefaults();

    if (this.slider.config.pager) {
      this.setupEventHandlers();
      this.setup();
    }
  }

  _createClass(Pager, [{
    key: 'setupDefaults',
    value: function setupDefaults() {
      var defaults = {
        pager: true,
        pagerActiveClassName: 'pager-active'
      };

      this.slider.config = Object.assign(defaults, this.slider.config);
    }
  }, {
    key: 'setupEventHandlers',
    value: function setupEventHandlers() {
      this.slider.$element.on('bxs:pager', this.onPager.bind(this));
      this.slider.$element.on('bxs:go', this.onGo.bind(this));
    }
  }, {
    key: 'setup',
    value: function setup() {
      var _this = this;

      this.slider.$pager = $('<div class="pager"></div>');

      var _loop = function (i) {
        var $pagerLink = $('<a href="">' + (i + 1) + '</a>');

        $pagerLink.on('click', function (e) {
          e.preventDefault();
          _this.slider.$element.trigger('bxs:pager', { index: i });
        });

        _this.slider.$pager.append($pagerLink);
      };

      for (var i = 0; i < this.slider.$children.length; i++) {
        _loop(i);
      };

      this.setActive(this.slider.currentIndex);
      this.slider.$element.after(this.slider.$pager);
    }
  }, {
    key: 'onPager',
    value: function onPager(e, params) {
      this.slider.go(params.index);
    }
  }, {
    key: 'onGo',
    value: function onGo(e, params) {
      this.setActive(params.toIndex);
    }
  }, {
    key: 'setActive',
    value: function setActive(index) {
      this.slider.$pager.children().removeClass(this.slider.config.pagerActiveClassName).eq(index).addClass(this.slider.config.pagerActiveClassName);
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
//# sourceMappingURL=bxslider.js.map