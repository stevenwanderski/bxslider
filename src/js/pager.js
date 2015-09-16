class Pager {
  constructor(slider) {
    this.slider = slider;

    let defaults = {
      pager: true
    }

    this.slider.config = Object.assign(defaults, this.slider.config);

    if(this.slider.config.pager){
      this.setup();
    }
  }

  setup() {
    let $pager = $('<div class="pager"></div>');

    for(let i = 0; i < this.slider.$children.length; i++){
      let $pagerLink = $(`<a href="">${i + 1}</a>`);
      $pagerLink.on('click', (e) => {
        e.preventDefault();
        this.clickPagerLink(i);
      });
      $pager.append($pagerLink);
    };

    this.slider.$element.after($pager);
  }

  clickPagerLink(index) {
    this.slider.go(index);
  }

  static publicMethods() {
    return [];
  }

  static pluginName() {
    return 'Pager'
  }
}

$.fn.bxslider.Constructor.Plugins.push(Pager);