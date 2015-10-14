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
    function BxSlider(el, config) {
      _classCallCheck(this, BxSlider);

      this.$el = $(el);
      this.config = config;
      this.loadPlugins();
    }

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    _createClass(BxSlider, [{
      key: 'loadPlugins',
      value: function loadPlugins() {
        var _this = this;

        $.fn[NAME].Constructor.Plugins.forEach(function (plugin) {
          var config = Object.assign(plugin.defaults(), _this.config);

          if (!plugin.shouldInitialize(config)) {
            next;
          }

          var pluginInstance = new plugin(_this, config);
          pluginInstance.init();

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

var Horizontal = (function () {
  function Horizontal(slider, config) {
    _classCallCheck(this, Horizontal);

    this.slider = slider;
    this.config = config;
    this.slider.$children = this.slider.$el.children();
  }

  _createClass(Horizontal, [{
    key: 'init',
    value: function init() {
      console.log('i am lakos.');
      this.setup();
    }
  }, {
    key: 'setupEventHandlers',
    value: function setupEventHandlers() {
      this.slider.$el.on('bxs:go', this.onGo.bind(this));
      this.slider.$el.on('transitionend', this.onTransitionEnd.bind(this));
      $(window).on('resize', this.onResize.bind(this));
    }
  }, {
    key: 'setupDefaults',
    value: function setupDefaults() {
      this.config = Object.assign(Horizontal.defaults(), this.config);
    }
  }, {
    key: 'setup',
    value: function setup() {
      this.setupDefaults();
      this.setupEventHandlers();

      this.slider.$el.wrap('<div class="bxslider-stage"></div>');
      this.slider.$stage = this.slider.$el.parent();
      this.slider.$children.each(function (index, el) {
        $(el).attr('data-bxslider-index', index);
      });
      this.setSlideWidths();
      this.go(this.config.startIndex, 0);
    }
  }, {
    key: 'go',
    value: function go(index) {
      var speed = arguments.length <= 1 || arguments[1] === undefined ? this.config.speed : arguments[1];

      this.slider.$el.trigger('bxs:go', {
        fromIndex: this.slider.currentIndex,
        toIndex: index,
        speed: speed
      });
    }
  }, {
    key: 'onGo',
    value: function onGo(e, params) {
      this.slider.transitionParams = params;
      this.slider.currentIndex = params.toIndex > this.slider.$children.length - 1 ? 0 : params.toIndex;

      var leftPosition = this.getNewPosition(params.toIndex);
      this.slider.$el.css('transition-duration', params.speed + 's');
      this.slider.$el.css('left', -leftPosition);
    }
  }, {
    key: 'onTransitionEnd',
    value: function onTransitionEnd(e, params) {
      this.slider.$el.trigger('bxs:transitionEnd', this.slider.transitionParams);
      this.slider.transitionParams = null;
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

      if (this.config.preventSlideWhitespace) {
        var lastVisibleIndex = this.slider.$children.length - this.getVisibleSlideCount();
        if (index > lastVisibleIndex) {
          positionIndex = lastVisibleIndex;
        }
      }

      return this.slider.$children.filter('[data-bxslider-index]').eq(positionIndex).position().left;
    }
  }, {
    key: 'getNewIndex',
    value: function getNewIndex(index) {
      var newIndex = index;

      if (this.config.preventSlideWhitespace) {
        var lastVisibleIndex = this.getLastVisibleIndex();
        if (index > lastVisibleIndex) {
          newIndex = lastVisibleIndex;
        }
      }

      return newIndex;
    }
  }, {
    key: 'getVisibleSlideCount',
    value: function getVisibleSlideCount() {
      return this.config.breakPoints[this.getBreakPoint()];
    }
  }, {
    key: 'getLastVisibleIndex',
    value: function getLastVisibleIndex() {
      return this.slider.$children.length - this.getVisibleSlideCount();
    }
  }, {
    key: 'getBreakPoint',
    value: function getBreakPoint() {
      var windowWidth = $(window).width();
      var sortedBreakPointsKeys = Object.keys(this.config.breakPoints);
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
    key: 'shouldInitialize',
    value: function shouldInitialize(config) {
      return true;
    }
  }, {
    key: 'defaults',
    value: function defaults() {
      return {
        breakPoints: {
          0: 1
        },
        speed: 0.5,
        startIndex: 0,
        preventSlideWhitespace: false
      };
    }
  }, {
    key: 'publicMethods',
    value: function publicMethods() {
      return ['go', 'getVisibleSlideCount', 'getLastVisibleIndex'];
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

var HorizontalLoop = (function () {
  function HorizontalLoop(slider, config) {
    _classCallCheck(this, HorizontalLoop);

    this.slider = slider;
    this.config = config;
  }

  _createClass(HorizontalLoop, [{
    key: 'init',
    value: function init() {
      this.setup();
    }
  }, {
    key: 'setupEventHandlers',
    value: function setupEventHandlers() {
      this.slider.$el.on('bxs:transitionEnd', this.onTransitionEnd.bind(this));
      $(window).on('resize', this.onResize.bind(this));
    }
  }, {
    key: 'setup',
    value: function setup() {
      this.setupDefaults();
      this.setupEventHandlers();
      this.purgeClones();
      this.setupClones();
      this.setupChildren();
      this.setupStartingIndex();
    }
  }, {
    key: 'setupDefaults',
    value: function setupDefaults() {
      this.config = Object.assign(HorizontalLoop.defaults());
    }
  }, {
    key: 'setupClones',
    value: function setupClones() {
      var cloneCount = this.slider.getVisibleSlideCount();
      this.appendClones(cloneCount);
      this.prependClones(cloneCount);
    }
  }, {
    key: 'setupChildren',
    value: function setupChildren() {
      this.slider.$children = this.slider.$children.filter('[data-bxslider-index]');
    }
  }, {
    key: 'setupStartingIndex',
    value: function setupStartingIndex() {
      this.slider.go(this.slider.currentIndex, 0);
    }
  }, {
    key: 'purgeClones',
    value: function purgeClones() {
      this.slider.$el.find('.' + this.config.cloneClassName).remove();
    }
  }, {
    key: 'appendClones',
    value: function appendClones(cloneCount) {
      var clones = this.slider.$children.slice(0, cloneCount).clone().addClass(this.config.cloneClassName).removeAttr('data-bxslider-index');
      this.slider.$el.append(clones);
    }
  }, {
    key: 'prependClones',
    value: function prependClones(cloneCount) {
      var childrenLength = this.slider.$children.length;
      var clones = this.slider.$children.slice(childrenLength - cloneCount).clone().addClass(this.config.cloneClassName).removeAttr('data-bxslider-index');
      this.slider.$el.prepend(clones);
    }
  }, {
    key: 'onTransitionEnd',
    value: function onTransitionEnd(e, params) {
      if (this.shouldReset(params.fromIndex, params.toIndex)) {
        this.slider.go(0, 0);
      }
    }
  }, {
    key: 'onResize',
    value: function onResize(e) {
      this.setup();
    }
  }, {
    key: 'shouldReset',
    value: function shouldReset(fromIndex, toIndex) {
      return fromIndex >= this.slider.$children.length - 1 && toIndex >= this.slider.$children.length;
    }
  }], [{
    key: 'shouldInitialize',
    value: function shouldInitialize(config) {
      return config.infinite;
    }
  }, {
    key: 'defaults',
    value: function defaults() {
      return {
        infinite: true,
        cloneClassName: 'bx-clone'
      };
    }
  }, {
    key: 'publicMethods',
    value: function publicMethods() {
      return [];
    }
  }, {
    key: 'pluginName',
    value: function pluginName() {
      return 'HorizontalLoop';
    }
  }]);

  return HorizontalLoop;
})();

$.fn.bxslider.Constructor.Plugins.push(HorizontalLoop);

var PagerControls = (function () {
  function PagerControls(slider) {
    _classCallCheck(this, PagerControls);

    this.slider = slider;
  }

  // $.fn.bxslider.Constructor.Plugins.push(PagerControls);

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
      this.setupDefaults();

      if (this.slider.config.forwardControl) {
        this.setupForwardControl();
      }

      if (this.slider.config.backControl) {
        this.setupBackControl();
      }

      this.setupEventHandlers();
    }
  }, {
    key: 'setupForwardControl',
    value: function setupForwardControl() {
      var $forwardEl = undefined;
      if ($(this.slider.config.forwardSelector).length) {
        $forwardEl = $(this.slider.config.forwardSelector).first();
      } else {
        $forwardEl = $('<a href="" class="' + this.slider.config.forwardClassName + '">' + this.slider.config.forwardText + '</a>');
        this.slider.$element.after($forwardEl);
      }

      this.slider.$forwardEl = $forwardEl;
    }
  }, {
    key: 'setupBackControl',
    value: function setupBackControl() {
      var $backEl = undefined;
      if ($(this.slider.config.backSelector).length) {
        $backEl = $(this.slider.config.backSelector).first();
      } else {
        $backEl = $('<a href="" class="' + this.slider.config.backClassName + '">' + this.slider.config.backText + '</a>');
        this.slider.$element.after($backEl);
      }

      this.slider.$backEl = $backEl;
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
      this.forward();
    }
  }, {
    key: 'clickBack',
    value: function clickBack(e, params) {
      e.preventDefault();
      this.back();
    }
  }, {
    key: 'getForwardIndex',
    value: function getForwardIndex() {
      return this.slider.currentIndex + 1;
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
  }, {
    key: 'forward',
    value: function forward() {
      this.slider.$element.trigger('bxs:forward', {
        from: this.slider.currentIndex,
        to: this.getForwardIndex()
      });
    }
  }, {
    key: 'back',
    value: function back() {
      this.slider.$element.trigger('bxs:back', {
        from: this.slider.currentIndex,
        to: this.getBackIndex()
      });
    }
  }], [{
    key: 'publicMethods',
    value: function publicMethods() {
      return ['forward', 'back'];
    }
  }, {
    key: 'pluginName',
    value: function pluginName() {
      return 'PagerControls';
    }
  }]);

  return PagerControls;
})();

var Pager = (function () {
  function Pager(slider, config) {
    _classCallCheck(this, Pager);

    this.slider = slider;
    this.config = config;
  }

  _createClass(Pager, [{
    key: 'setupDefaults',
    value: function setupDefaults() {
      this.slider.config = Object.assign(Pager.defaults, this.config);
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
      var _this2 = this;

      if (!this.slider.config.pager) {
        return;
      }

      this.setupDefaults();
      this.setupEventHandlers();

      this.slider.$pager = $('<div class="pager"></div>');

      var _loop = function (i) {
        var $pagerLink = $('<a href="">' + (i + 1) + '</a>');

        $pagerLink.on('click', function (e) {
          e.preventDefault();
          _this2.slider.$element.trigger('bxs:pager', { index: i });
        });

        _this2.slider.$pager.append($pagerLink);
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
    key: 'shouldInitialize',
    value: function shouldInitialize(config) {
      return config.pager;
    }
  }, {
    key: 'defaults',
    value: function defaults() {
      return {
        pager: true,
        pagerActiveClassName: 'pager-active'
      };
    }
  }, {
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