$(function(){

  // $('.slider').on('bxs:transitionEnd', function(e, params){
  //   console.log('im done!');
  // })

  $('.slider').bxslider({
    breakPoints: {
      0: 1,
      400: 2,
      600: 3
    },
    pager: true
  });

});