

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

// build game field
times(10, function (y) {
    // create new row
    var $tr = $('<tr>');
    // append row to the table
    $table.append($tr);

    times(10, function (x) {
        var $td = $('<td>');
        $td.addClass('cell');
        $tr.append($td);
    });
});

/**
 * Created by jtuscher on 30.11.16.
 */
$('#game-display').click(function(event){
    event.preventDefault();
    $('#game').toggleClass('show');
    $('#form-field').toggleClass('hide');
});
