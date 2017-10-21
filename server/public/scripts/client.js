console.log('js sourced');

$(document).ready(weReady);
function weReady() {
    console.log('icky thump!');
    clickHandler();
    refreshTasks();
}

function clickHandler() {
    $('#addTask').on('click', taskStasher);
    $('#viewTasks').on('click','.btn-danger', deleteTask);
    $('#viewTasks').on('click', '.btn-success', completeTask);
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
        
        var taskID = response[i].id;
        console.log(taskID);
        
       var newTask = response[i].task;
       var status = response[i].status;
        var $tr = $('<tr></tr>');
        $tr.append('<td>'+newTask+'</td>');
        $tr.append('<td>' + status + '</td>');
        $tr.append('<td>'+'<button class="btn-success" data-id="'+taskID+'">Complete</button>'+'</td>');
        $tr.append('<td>' + '<button class="btn-danger" data-id="'+ taskID +'">Delete</button>' + '</td>');

    //    var $td = $('<tr><td>' + newTask + '</td>' + '<td>' + status + '</td><td>' + '<button class="btn-success">Complete</button>'+'</td></tr>');
        

       $('#viewTasks').append($tr);
    }
}

function refreshTasks() {
    $('#taskInput').val();
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

function deleteTask() {
    var taskID = $(this).data('id');
    console.log(taskID);
    
    $.ajax({
        method: 'DELETE',
        url: '/queHacer/' + taskID
    }).done(function (response) {
        console.log('by the beard of Zeus!',response);

        
        
    }).fail(function (message) {
        console.log("I don't think we have that kind of time",message);
        
        
    });

    refreshTasks();
}

function completeTask() {
    var taskID = $(this).data('id');
    $.ajax({
        method: 'PUT',
        url: 'queHacer/' + taskID
    }).done(function (response) {
        console.log('we are in completeTask:', response);
        
        
    }).fail(function (message) {
        console.log('things were good and now they are bad:', message);
        
        
    });
}