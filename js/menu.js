/**
 * Created by khetmanska on 30.11.16.
 */
$(document).on('scroll resize', function () {
    var scrollFromTop = $(document).scrollTop();

    var distanceFromTopFunction = $('#two').offset().top;
    var distanceFromTopTeam = $('#three').offset().top;
    var distanceFromTopContact = $('#four').offset().top;
    var distanceFromTopFooter = $('#footer').offset().top;

    if (scrollFromTop >= distanceFromTopFunction
      && scrollFromTop<distanceFromTopTeam) {
      $('#navbar-function').addClass('menu-highlight');
    }
    else {
      $('#navbar-function').removeClass('menu-highlight');
    }

    if (scrollFromTop >= distanceFromTopTeam
      && scrollFromTop<distanceFromTopContact) {
      $('#navbar-team').addClass('menu-highlight');
    }
    else {
    $('#navbar-team').removeClass('menu-highlight');

  }
    if (scrollFromTop >= distanceFromTopContact
      && scrollFromTop<distanceFromTopFooter) {
      $('#navbar-contact').addClass('menu-highlight');
    }
    else {
      $('#navbar-contact').removeClass('menu-highlight');

    }
  }
);

