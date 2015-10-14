'use strict';

var expect = chai.expect;
var sliderMarkup = '\n<div class="slider-wrapper">\n  <div class="slider" data-bxslider-mode="horizontal">\n    <div class="slide">slide1</div>\n    <div class="slide">slide2</div>\n    <div class="slide">slide3</div>\n    <div class="slide">slide4</div>\n  </div>\n</div>\n';

describe('Horizontal', function () {
  var $el = undefined,
      slider = undefined;

  beforeEach(function () {
    $('body').append(sliderMarkup);
    $el = $('.slider');
    slider = { $el: $el };
  });

  afterEach(function () {
    $('.slider-wrapper').remove();
  });

  describe('#go', function () {
    it('sets the left value to the supplied index', function () {
      var h = new Horizontal(slider, {});
      h.init();
      var targetLeftPosition = $el.children().eq(1).position().left;

      h.go(1, 0);

      var newLeftPosition = parseInt($el.css('left'), 10);
      expect(newLeftPosition).to.equal(-targetLeftPosition);
    });

    it('sets the current index to the supplied index', function () {
      var h = new Horizontal(slider, {});
      h.init();

      h.go(1);

      expect(h.slider.currentIndex).to.equal(1);
    });

    describe('`duration` param', function () {
      it('overrides `duration` with supplied param', function () {
        var h = new Horizontal(slider, {});
        h.init();

        h.go(1, 0.2);

        expect($el.css('transition-duration')).to.equal('0.2s');
      });
    });

    describe('when `preventSlideWhitespace` is true', function () {
      it('sets the `left` value to the last visible slide without showing whitespace', function () {
        var h = new Horizontal(slider, {
          preventSlideWhitespace: true,
          breakPoints: {
            0: 3
          }
        });
        h.init();
        var targetLeftPosition = $el.children().eq(1).position().left;

        h.go(3, 0);

        expect(parseInt($el.css('left'), 10)).to.equal(-targetLeftPosition);
      });
    });
  });
});
//# sourceMappingURL=horizontal-test.js.map