let expect = chai.expect;
let sliderMarkup = `
<div class="slider-wrapper">
  <div class="slider" data-bxslider-mode="horizontal">
    <div class="slide">slide1</div>
    <div class="slide">slide2</div>
    <div class="slide">slide3</div>
    <div class="slide">slide4</div>
  </div>
</div>
`;

describe('Horizontal', () => {
  let $el, slider;

  beforeEach(() => {
    $('body').append(sliderMarkup);
    $el = $('.slider');
    slider = { $el: $el }
  });

  afterEach(() => {
    $('.slider-wrapper').remove();
  });

  describe('#go', () => {
    it('sets the left value to the supplied index', () => {
      let h = new Horizontal(slider, {});
      h.init();
      let targetLeftPosition = $el.children().eq(1).position().left;

      h.go(1, 0);

      let newLeftPosition = parseInt($el.css('left'), 10);
      expect(newLeftPosition).to.equal(-targetLeftPosition);
    });

    it('sets the current index to the supplied index', () => {
      let h = new Horizontal(slider, {});
      h.init();

      h.go(1);

      expect(h.slider.currentIndex).to.equal(1);
    });

    describe('`duration` param', () => {
      it('overrides `duration` with supplied param', () => {
        let h = new Horizontal(slider, {});
        h.init();

        h.go(1, 0.2);

        expect($el.css('transition-duration')).to.equal('0.2s');
      });
    })

    describe('when `preventSlideWhitespace` is true', () => {
      it('sets the `left` value to the last visible slide without showing whitespace', () => {
        let h = new Horizontal(slider, {
          preventSlideWhitespace: true,
          breakPoints: {
            0: 3
          }
        });
        h.init();
        let targetLeftPosition = $el.children().eq(1).position().left;

        h.go(3, 0);

        expect(parseInt($el.css('left'), 10)).to.equal(-targetLeftPosition);
      });
    });
  });
});