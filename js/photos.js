/**
 * Created by jtuscher on 02.12.16.
 */
$(document).on('scroll resize', function () {
    var scrollFromTop = $(document).scrollTop();

    var distanceFromTopTeam = $('#three').offset().top - 240;

    if (
      scrollFromTop >= distanceFromTopTeam &&
        !$('#three').hasClass('i-ve-been-there')
    ) {
      $('#three').addClass('i-ve-been-there');
      $('.front').addClass('flip-front-scroll');
      $('.back').addClass('flip-back-scroll');
      setTimeout(function () {
        $('.front').removeClass('flip-front-scroll');
        $('.back').removeClass('flip-back-scroll');
      }, 2000);
    }

  }
);

