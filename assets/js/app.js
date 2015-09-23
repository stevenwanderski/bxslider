$(function(){

  $('.slider').bxslider({
    breakPoints: {
      0: 1,
      400: 2,
      600: 3
    },
    pager: true,
    speed: 500,
    preventSlideWhitespace: false
  });

});