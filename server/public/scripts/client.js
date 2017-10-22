console.log('js sourced');

$(document).ready(weReady);
function weReady() {
    console.log('icky thump!');
    clickHandler();
    refreshTasks();
}

function clickHandler() {
    $('#hideTasks').on('click',function(){
        $('#readyToHide').fadeToggle(400);
    });
    $('#addTask').on('click', taskStasher);
    $('#tables').on('click', '.btn-danger', deleteTask);
    $('#tables').on('click', '.btn-success', completeTask);
    $('#tables').on('click', '.btn-warning', completeTask);
}
function refreshTasks() {
    $('#taskInput').val('');
    $('#viewTasks').empty();
    $('#completedTasks').empty();
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
//post inputs to database
function taskStasher() {
    var task = $('#taskInput').val();
    var status = 'N'; //automatically set status to N; No need for extra input;
    var $this = $(this).closest('tr');
    var addTask = {task, status};

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
    for (var i = 0; i < response.length; i++) {

        var taskID = response[i].id;

        var newTask = response[i].task;
        var status = response[i].status;
        var $tr = $('<tr></tr>');
        if (status === 'N') {
            $tr.append('<td>' + newTask + '</td>');
            $tr.append('<td>' + status + '</td>');
            $tr.append('<td>' + '<button class="btn-success" data-id="' + taskID + '" value ="' + status +'">Complete</button>' + '</td>');
            $tr.append('<td>' + '<button class="btn-danger" data-id="' + taskID + '">Delete</button>' + '</td>');


            $('#viewTasks').append($tr);
        }//end of if
        else {
            $tr.append('<td>' + newTask + '</td>');
            $tr.append('<td>' + status + '</td>');
            $tr.append('<td>' + '<button class="btn-warning" data-id="' + taskID + '">Return</button>' + '</td>');
            $tr.append('<td>' + '<button class="btn-danger" data-id="' + taskID + '" value ="'+status+'">Delete</button>' + '</td>');
            $('#completedTasks').append($tr);
        }//end of else
    }//end of for loop

}//end of taskAdder

function deleteTask() {
    //added confrim message box
    if(confirm("Delete?") == true){
    var taskID = $(this).data('id');
            $.ajax({
                method: 'DELETE',
                url: '/queHacer/' + taskID
            }).done(function (response) {
                console.log('by the beard of Zeus!', response);

            }).fail(function (message) {
                console.log("I don't think we have that kind of time", message);
            });

            $(this).closest('tr').fadeOut('fast', function () {

            });
        }//end of confirm if

    }//end of deleteTasks

function completeTask() {
    var taskID = $(this).data('id');
    var status = $(this).val();
    status = {status};
    
    $.ajax({
        method: 'PUT',
        url: 'queHacer/' + taskID,
        data: status
    }).done(function (response) {
        console.log('we are in completeTask:', response);
        refreshTasks();
        
    }).fail(function (message) {
        console.log('things were good and now they are bad:', message);
        
        
    });
}//end of completeTasks
