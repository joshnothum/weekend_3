console.log('js sourced');

$(document).ready(weReady);
function weReady() {
    console.log('icky thump!');
    clickHandler();
    refreshTasks();
}

function clickHandler() {
    $('#addTask').on('click', taskStasher);
}


function taskStasher() {
    var task = $('#taskInput').val();
    var status = 'N';

    var addTask = {task, status};
    console.log(addTask);
    


    $.ajax({
        method: "POST",
        url: '/queHacer',
        data: addTask
    }).done(function (response) {
        console.log(response);
        refreshTasks();
        
        
    }).fail(function (message) {
        console.log('try again!', message);
        
        
    });
    
}

function taskAdder(response) {
    console.log('we are here in taskAdder');
    console.log(response);
    
    for (var i = 0; i < response.length; i++) {
       var newTask = response[i].task;
       var completion = response[i].status;

       console.log(completion);
       

       var $td = $('<tr><td>' + newTask +'</td>'+'<td>'+ completion +'</tr>');



       $('#viewTasks').append($td);
    }
}

function refreshTasks() {
    $('#viewTasks').empty();
    $.ajax({
        method: "GET",
        url: '/queHacer'
    }).done(function (response) {
        console.log('we did it!', response);
        taskAdder(response);
        
        
    }).fail(function (error) {
        console.log('oh no! we didnt do it!', message);
        
        
    });

    
}