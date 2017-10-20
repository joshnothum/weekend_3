console.log('js sourced');

$(document).ready(weReady);
function weReady() {
    console.log('icky thump!');
    clickHandler();
    refreshTasks();
}

function clickHandler() {
    $('#addTask').on('click', refreshTasks);
}

function taskAdder(response) {
    console.log('we are here in taskAdder');
    for (var i = 0; i < response.length; i++) {
       var newTask = response[i].task;
       var completion = response[i].status;

       var $li = $('<li>' + newTask + ':'+ completion +'</li>');



       $('#taskHeader').append($li);
    }
}

function refreshTasks() {

    $.ajax({
        method: "GET",
        url: '/quehacer'
    }).done(function (response) {
        console.log('we did it!', response);
        $('#taskHeader').empty();
        taskAdder(response);
        
        
    }).fail(function (error) {
        console.log('oh no! we didnt do it!', message);
        
        
    });

    
}