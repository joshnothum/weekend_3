console.log('js sourced');

$(document).ready(weReady);
function weReady() {
    console.log('icky thump!');
    clickHandler();
    refreshTasks();
}

function clickHandler() {
    $('#addTask').on('click', taskStasher);
    $('#viewTasks').on('click','#taskID', deleteTask);
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
        var taskID = response[i].taskID;
       var newTask = response[i].task;
       var status = response[i].status;
        var $tr = $('<tr></tr>');
        $tr.append('<td>'+newTask+'</td>');
        $tr.append('<td>' + status + '</td>');
        $tr.append('<td>'+'<button class="btn-success" id="'+taskID+'">Complete</button>'+'</td>');
        $tr.append('<td>' + '<button class="btn-danger">Delete</button>' + '</td>');
        
       console.log(status);
       
       

    //    var $td = $('<tr><td>' + newTask + '</td>' + '<td>' + status + '</td><td>' + '<button class="btn-success">Complete</button>'+'</td></tr>');
        

       $('#viewTasks').append($tr);
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

function deleteTask() {
    $.ajax({
        method: 'DELETE',
        url: '/queHacer'
    }).done(function (response) {
        console.log('by the beard of Zeus!',response);

        
        
    }).fail(function (message) {
        console.log("I don't think we have that kidn of time",message);
        
        
    });
}