/**
 * Created by khetmanska on 30.11.16.
 */
$(document).on('scroll resize', function() {
  var scrollFromTop = $(document).scrollTop();
  var distanceFromTop = $('#two').offset().top;

  console.log(scrollFromTop);
  console.log(distanceFromTop);
  if (scrollFromTop>distanceFromTop) {
    $('#menubar').addClass('menu-highlight');
  }

});
