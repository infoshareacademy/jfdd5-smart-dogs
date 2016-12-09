var z = 10;                                     // wielkosc pola

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

    if ($(this).hasClass('event')) {      // zdarzenie dodania punktu
      updateScore();
      $($(this)).removeClass('event')
        .removeClass('cinema')
        .removeClass('theatre')
        .removeClass('animal')
        .removeClass('beach')
        .removeClass('beer')
        .removeClass('coffee')
        .removeClass('event-icon')
        .removeClass('food')
        .removeClass('gallery')
        .removeClass('horse')
        .removeClass('ice-cream')
        .removeClass('shop');
    }

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

  var iconNames = ['theatre','ice-cream','animal','beach','beer','coffee','event-icon', 'cinema',
  'food','gallery','horse', 'shop'];                  // tablica ikonek
  var timer = 60;
  var timerNewEvents = 2000;        // co ile sekund generujemy eventy
  var timerRemoveEvents = 8000;     // co ile sekund usuwamy eventy
  var timerGame = 61000;            // laczny czas gry : 61000 to minuta
  var createEvent = function () {
    var eventCell = randomCell();              // wyswietlanie eventow co X000 milisekund
    var eventIcon = iconNames[Math.round(Math.random() * (iconNames.length - 1))];
    eventCell                                  // generowanie eventow z losowa ikonka
      .addClass(eventIcon)
        .addClass('event');

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







