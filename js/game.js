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

function randomCell() {
  var x = Math.round(Math.random() * (z - 1));
  var y = Math.round(Math.random() * (z - 1));
  console.log(x + '-' + y);
  return x + '-' + y;
}
var selector = '.' + randomCell();

function showBoard() {
// build game field
  times(z, function (y) {
    // create new row
    var $tr = $('<tr>');
    // append row to the table
    $table.append($tr);

    times(z, function (x) {
      var $td = $('<td>');
      $td.addClass('cell');
      $td.addClass(x + '-' + y);
      $tr.append($td);
    });
  });
}
/**
 * Created by jtuscher on 30.11.16.
 */
$('#game-display').click(function (event) {
  event.preventDefault();
  $('#game').toggleClass('show');
  $('#form-field').toggleClass('hide');
  $('#startbutton').toggleClass('show');
  showBoard();
});
$('#startbutton').click(function () {
  $(selector).addClass('player');
});

