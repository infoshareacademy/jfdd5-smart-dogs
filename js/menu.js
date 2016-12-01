/**
 * Created by khetmanska on 30.11.16.
 */
$(document).on('scroll resize', function() {
  var scrollFromTop = $(document).scrollTop();
  var distanceFromTopTwo = $('#two').offset().top;

  console.log(scrollFromTop);
  console.log(distanceFromTopTwo);
  if (scrollFromTop>distanceFromTopTwo) {
    $('#navbar-function').addClass('menu-highlight');
  }

});
