console.log('js sourced');

$(document).ready(weReady);
function weReady() {
    console.log('icky thump!');
    clickHandler();
}

function clickHandler() {
    $('#addTask').on('click', refreshTasks);
}

function taskAdder(response) {
    console.log('we are here in taskAdder');
    for (var i = 0; i < response.length; i++) {
       var newTask = response[i].task;

       var $li = $('<li>' + newTask + '</li>');

       $('#taskHeader').append($li);
    }
}

function refreshTasks() {

    $.ajax({
        method: "GET",
        url: '/quehacer'
    }).done(function (response) {
        console.log('we did it!', response);
        taskAdder(response);
        
        
    }).fail(function (error) {
        console.log('oh no! we didnt do it!', message);
        
        
    });

    
}