var z = 10;                                     // wielkosc pola
var iconNames = ['theatre','ice-cream','animal','beach','beer','coffee','event-icon', 'cinema', 'food','gallery','horse', 'shop'];                  // tablica ikonek


// Find container
var $container = $('#game');
// Create new table (DOM node)
var $table = $('<table>');
// Append table to DOM
$container.append($table);
// do action x times
function times(x, action) {
  for (var i = 0; i < x; i += 1) {
    action(i);
  }
}

function randomCell() {                           // generowanie randomowego pola
  var x = Math.round(Math.random() * (z - 1));
  var y = Math.round(Math.random() * (z - 1));
  // console.log(x + '-' + y);
  // return x + '-' + y;
  return $('[x="' + x + '"][y="' + y + '"]')
}


function showBoard() {                           // budowanie planszy gry
// build game field
  times(z, function (y) {
    // create new row
    var $tr = $('<tr>');
    // append row to the table
    $table.append($tr);

    times(z, function (x) {
      var $td = $('<td>');
      $td.addClass('cell');
      $td.attr('x', x);
      $td.attr('y', y);
      // $td.addClass(x + '-' + y);
      $tr.append($td);
    });
  });
}

var score = 0;
function updateScore() {                          // dodawanie wyniku
  score += 1;
  $('#scorebutton').text(score);
}
// ||||||||||||||||||||||||Uruchamianie gry |||||||||||||||||||||||||||||||||||
$('#game-display').click(function (event) {
  event.preventDefault();
  $('.navbar').addClass('hide');
  $('#game').toggleClass('show');
  $('#game-right-container').toggleClass('show');
  $('#game-left-container').toggleClass('show');
  $('#form-field').toggleClass('hide');
  showBoard();

  $('table').on('click', 'td', function () {      // kontrola gracza myszka
    var click = {                                 // pole w ktore klika uytkownik
      x: parseInt($(this).attr('x')),
      y: parseInt($(this).attr('y'))
    };

    var $playerCell = $('td.player');            // aktualna komorka gracza

    var player = {                               // przemienia atrybuty x i y komorki tabeli na obiekt z wartosciami liczbowymi
      x: parseInt($playerCell.attr('x')),
      y: parseInt($playerCell.attr('y'))
    };

    if (
      Math.abs(click.x - player.x) <= 1 &&
      Math.abs(click.y - player.y) <= 1
    ) {
      $playerCell.removeClass('player');
      $(this).addClass('player');
    }

    if (
      $(this).hasClass('player') &&
      $(this).hasClass('event')

    ) {      // zdarzenie dodania punktu
      updateScore();
      $(this).removeClass('event')
        .removeClass(iconNames.join(' '));
    }

  });

  $(document).on('keydown', function (event) {
    var $playerCell = $('td.player');

    var player = {                               // przemienia atrybuty x i y komorki tabeli na obiekt z wartosciami liczbowymi
      x: parseInt($playerCell.attr('x')),
      y: parseInt($playerCell.attr('y'))
    };

    function putPlayerOn(x, y) {
      var fieldPressed = $('[x="' + x + '"][y="' + y + '"]')
      fieldPressed.addClass('player');
      if (
        fieldPressed.hasClass('player') &&
        fieldPressed.hasClass('event')

      ) {      // zdarzenie dodania punktu
        updateScore();
        fieldPressed.removeClass('event')
          .removeClass(iconNames.join(' '));
      }
    }
    $playerCell.removeClass('player');
    switch (event.keyCode) {
      case 37: // left
        //$('[x="' + (player.x - 1) + '"][y="' + player.y + '"]').addClass('player');
        if (player.x > 0) {
        putPlayerOn(player.x - 1, player.y);
        console.log(player.x - 1, player.y);
        // $('[x=10][y=5]')
        } else {
          putPlayerOn(player.x, player.y);
        }
        break;
      case 38: // up
        if (player.y > 0) {
        putPlayerOn(player.x, player.y - 1);
        } else {
          putPlayerOn(player.x, player.y);
        }
        break;
      case 39: // right
        if (player.x < 9) {
        putPlayerOn(player.x + 1, player.y);
        } else {
          putPlayerOn(player.x, player.y);
        }
        break;
      case 40: // down
        if (player.y < 9) {
        putPlayerOn(player.x, player.y + 1);
        } else {
          putPlayerOn(player.x, player.y);
        }
        break;
      default: return;
    }

    event.preventDefault();
  });

  // $('table').on('click', 'td', function () {      // kontrola gracza myszka
  //   var click = {                                 // pole w ktore klika uytkownik
  //     x: parseInt($(this).attr('x')),
  //     y: parseInt($(this).attr('y'))
  //
  //   };
  //
  //   var $playerCell = $('td.player');            // aktualna komorka gracza
  //   console.log($playerCell);
  //
  //   var player = {                               // przemienia atrybuty x i y komorki tabeli na obiekt z wartosciami liczbowymi
  //     x: parseInt($playerCell.attr('x')),
  //     y: parseInt($playerCell.attr('y'))
  //   };
  //
  //   console.log(click, player);
  //
  //   if (
  //     Math.abs(click.x - player.x) <= 1 &&
  //     Math.abs(click.y - player.y) <= 1
  //   ) {
  //     $playerCell.removeClass('player');
  //     $(this).addClass('player');
  //   }
  //
  //   if ($('td.player').hasClass('event')) {      // zdarzenie dodania punktu
  //     updateScore();
  //     $(this).removeClass('event');
  //   }
  //
  // });

});
// ||||||||||||||||||||||||Generowanie gracza |||||||||||||||||||||||||||||||||||
$('#startbutton').click(function () {
  var playerCell = randomCell();               // dodawanie gracza w losowym miejscu
  $('.cell').removeClass('player');
  playerCell.addClass('player');

  // var eventCell = randomCell();                // dodawanie eventow w losowych miejscach
  // eventCell.addClass(iconEvent);
  //
  // setTimeout(function () {
  //   eventCell.removeClass('event');
  // }, 1000);


  var timer = 60;
  var timerNewEvents = 500;        // co ile sekund generujemy eventy
  var timerRemoveEvents = 50000;     // co ile sekund usuwamy eventy
  var timerBlinkEvents = 1000;     // kiedy zaczyna migac event
  var timerGame = 61000;            // laczny czas gry : 61000 to minuta
  var createEvent = function () {
    var eventCell = randomCell();              // wyswietlanie eventow co X000 milisekund
    var eventIcon = iconNames[Math.round(Math.random() * (iconNames.length - 1))];
    eventCell                                  // generowanie eventow z losowa ikonka
      .addClass(eventIcon)
        .addClass('event');

    // setInterval(function () {
    //   eventCell.toggleClass(eventIcon);
    // }, timerBlinkEvents);

    setTimeout(function () {
      eventCell
          .removeClass(eventIcon)
          .removeClass('event');
    }, timerRemoveEvents);
  };
  createEvent();

  var stopEvents = setInterval(createEvent, timerNewEvents);

  var intervalTimer = setInterval(function () {
      timer = timer - 1;
      $('#timer').text(timer);
    }
    , 1000);

  setTimeout(function () {                      //koniec gry
    clearInterval(stopEvents);
    clearInterval(intervalTimer);
    $('.cell').removeClass('player');
    $('.event').hide();
  }, timerGame);


});







