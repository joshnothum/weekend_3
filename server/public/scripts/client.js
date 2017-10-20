console.log('js sourced');

$(document).ready(weReady);
function weReady() {
    console.log('icky thump!');
    clickHandler();
}

function clickHandler() {
    $('#addTask').on('click', taskAdder);
}

function taskAdder(response) {
    console.log('we are here');

    var $li = $('<li>' + newTask + '</li>');

    $('#taskHeader').append($li);

}

function refreshTasks() {

    $.ajax({
        method: "GET",
        url: '/quehacer'
    }).done(function (response) {
        taskAdder(response);
        console.log('we did it!', reponse);
        
        
    }).fail(function (error) {
        console.log('oh no! we didnt do it!', message);
        
        
    });

    
}