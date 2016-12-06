var z = 10;

// var activate = function () {
//     $('.block').removeClass('inactive').addClass('active')
// };
// $('.block').on('click', activate);

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
  return $('[x="' + x + '"][y="' + y +'"]')
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
/**
 * Created by jtuscher on 30.11.16.
 */
var score = 0;
function updateScore() {                          // dodawanie wyniku
  score += 1;
  var label = 'Score: ' + score;
  // $('table').empty(score);
  $('#scorebutton').text(label);
}
 // ||||||||||||||||||||||||Uruchamianie gry |||||||||||||||||||||||||||||||||||
$('#game-display').click(function (event) {
  event.preventDefault();
  $('#game').toggleClass('show');
  $('#scorebutton').toggleClass('show');
  $('#form-field').toggleClass('hide');
  $('#startbutton').toggleClass('show');
  showBoard();

    $('table').on('click', 'td', function () {      // kontrola gracza
      var click = {                                 // pole w ktore klika uytkownik
        x: parseInt($(this).attr('x')),
        y: parseInt($(this).attr('y'))

      };

      var $playerCell = $('td.player');            // aktualna komorka gracza
      console.log($playerCell);

      var player = {                               // przemienia atrybuty x i y komorki tabeli na obiekt z wartosciami liczbowymi
        x: parseInt($playerCell.attr('x')),
        y: parseInt($playerCell.attr('y'))
      };

      console.log(click, player);

      if (
        Math.abs(click.x - player.x) <= 1 &&
        Math.abs(click.y - player.y) <= 1
      ) {
        $playerCell.removeClass('player');
        $(this).addClass('player');
      }

      if ($('td.player').hasClass('event')) {      // zdarzenie dodania punktu
        updateScore();
        $(this).removeClass('event');
      }

    })
});
// ||||||||||||||||||||||||Generowanie gracza |||||||||||||||||||||||||||||||||||
$('#startbutton').click(function () {
  var playerCell = randomCell();
  $('.cell').removeClass('player');
  playerCell.addClass('player');

  var eventCell = randomCell();
  eventCell.addClass('event');

  var intervalId = setInterval(function () {
    var eventCell = randomCell();
    eventCell.addClass('event');
  }, 2000);

  setTimeout(function(){
    clearInterval(intervalId);
    $('.cell').removeClass('player');
  }, 6000);

});







