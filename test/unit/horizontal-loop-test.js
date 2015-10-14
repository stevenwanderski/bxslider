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

describe('HorizontalLoop', () => {
  let $el, slider;

  beforeEach(() => {
    $('body').append(sliderMarkup);
    $el = $('.slider');
    slider = {
      $el: $el,
      $children: $el.children(),
      getVisibleSlideCount: () => 3
    }
  });

  afterEach(() => {
    $('.slider-wrapper').remove();
  });

  describe('#prependClones', () => {
    it('prepends the supplied number of cloned slides', () => {
      let hl = new HorizontalLoop(slider, {
        cloneClassName: 'foo-bar'
      });

      hl.prependClones(3);

      expect($el.find(`.foo-bar`).length).to.equal(3);
    });
  });

  describe('#appendClones', () => {
    it('appends the supplied number of cloned slides', () => {
      let hl = new HorizontalLoop(slider, {
        cloneClassName: 'foo-bar'
      });

      hl.appendClones(3);

      expect($el.find(`.foo-bar`).length).to.equal(3);
    });
  });
});
