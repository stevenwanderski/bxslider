'use strict';

var expect = chai.expect;
var sliderMarkup = '\n<div class="slider-wrapper">\n  <div class="slider" data-bxslider-mode="horizontal">\n    <div class="slide">slide1</div>\n    <div class="slide">slide2</div>\n    <div class="slide">slide3</div>\n    <div class="slide">slide4</div>\n  </div>\n</div>\n';

describe('HorizontalLoop', function () {
  var $el = undefined,
      slider = undefined;

  beforeEach(function () {
    $('body').append(sliderMarkup);
    $el = $('.slider');
    slider = {
      $el: $el,
      $children: $el.children(),
      getVisibleSlideCount: function getVisibleSlideCount() {
        return 3;
      }
    };
  });

  afterEach(function () {
    $('.slider-wrapper').remove();
  });

  describe('#prependClones', function () {
    it('prepends the supplied number of cloned slides', function () {
      var hl = new HorizontalLoop(slider, {
        cloneClassName: 'foo-bar'
      });

      hl.prependClones(3);

      expect($el.find('.foo-bar').length).to.equal(3);
    });
  });

  describe('#appendClones', function () {
    it('appends the supplied number of cloned slides', function () {
      var hl = new HorizontalLoop(slider, {
        cloneClassName: 'foo-bar'
      });

      hl.appendClones(3);

      expect($el.find('.foo-bar').length).to.equal(3);
    });
  });
});
//# sourceMappingURL=horizontal-loop-test.js.map