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


function taskStasher() {
    var task = $('#taskInput').val();
    var status = 'N';
    var $this = $(this).closest('tr');
    var addTask = {task, status};
    console.log(addTask);
    


    $.ajax({
        method: "POST",
        url: '/queHacer',
        data: addTask
    }).done(function (response) {
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

        var newTask = response[i].task;
        var status = response[i].status;
        var $tr = $('<tr></tr>');
        if (status === 'N') {
            $tr.append('<td>' + newTask + '</td>');
            $tr.append('<td>' + status + '</td>');
            $tr.append('<td>' + '<button class="btn-success" data-id="' + taskID + '" value ="' + status +'">Complete</button>' + '</td>');
            $tr.append('<td>' + '<button class="btn-danger" data-id="' + taskID + '">Delete</button>' + '</td>');

            //    var $td = $('<tr><td>' + newTask + '</td>' + '<td>' + status + '</td><td>' + '<button class="btn-success">Complete</button>'+'</td></tr>');


            $('#viewTasks').append($tr);
        }//end of if
        else {
            $tr.append('<td>' + newTask + '</td>');
            $tr.append('<td>' + status + '</td>');
            $tr.append('<td>' + '<button class="btn-warning" data-id="' + taskID + '">Return</button>' + '</td>');
            $tr.append('<td>' + '<button class="btn-danger" data-id="' + taskID + '" value ="'+status+'">Delete</button>' + '</td>');
            $('#completedTasks').append($tr);
        }//end of else
    }

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

function deleteTask() {
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
        }

    }

function completeTask() {
    var taskID = $(this).data('id');
    var status = $(this).val();
    console.log('this is my status:',status);
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
}

/*function fadeOut() {
      var taskID = $(this).data('id');
        $(this).closest('tr').fadeOut('slow');



      console.log(taskID);

      $.ajax({
          method: 'DELETE',
          url: '/queHacer/' + taskID
      }).done(function (response) {
          console.log('by the beard of Zeus!', response);
          refreshTasks(fadeOutRow);
          



      }).fail(function (message) {
          console.log("I don't think we have that kind of time", message);


      });
}*/