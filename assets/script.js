/* 
Christian Mora
Work Day Scheduler 
*/

//Current day
var todayCurrent = moment();
$('#currentDate').html(todayCurrent.format("dddd MMMM Do, YYYY"));
var todayDay = todayCurrent.format("M/DD/YYYY");
var scheduleHours = {
  dateSet: "",
  events : [
    {
      hour : "08:00 AM",
      description : ""
    },
    {
      hour : "09:00 AM",
      description : ""
    },
    {
      hour : "10:00 AM",
      description : ""
    },
    {
      hour : "11:00 AM",
      description : ""
    },
    {
      hour : "12:00 PM",
      description : ""
    },
    {
      hour : "1:00 PM",
      description : "lunch"
    },
    {
      hour : "2:00 PM",
      description : ""
    },
    {
      hour : "3:00 PM",
      description : ""
    },
    {
      hour : "4:00 PM",
      description : ""
    }
    ]

    
  };


  function constructDay () {
    $('tbody').empty();
    
    for (i = 0; i < scheduleHours.events.length; i++) {
      var getHour = todayDay + " " + scheduleHours.events[i].hour;
      var fromNow = moment(getHour).fromNow().includes("ago");
      var coloCode;
    
      var rowDay = $('<tr>');
      if (fromNow) {
        colorCode = "table-success";
      }
      else{
        colorCode = "table-warning";
      }
      rowDay.append('<td style="width: 10%; text-align: center" class="col">' + scheduleHours.events[i].hour + '</td>');
      rowDay.append('<td class="col '+ colorCode + '"><input id="inputIndex' + i + '" type="text" placeholder="" value="' + scheduleHours.events[i].description + '"></td>');
      rowDay.append('<td class="col"><button class="save-btn" data-index="' + i + '" type="submit"><i class="far fa-save"></i></button></td>');
      $('tbody').append(rowDay);
     
    }
  };


  function setEventDesc (index, eventDesc) {     
    scheduleHours.events[index].description = eventDesc;
    
    constructDay();
  };

  function checkLocal() {
    var workingDay = JSON.parse(localStorage.getItem("DATE-" + todayDay));
    if (workingDay === null){
      return null;   
    } 
    else {
      return workingDay;
    }
  };


  function writeLocal () {
    localStorage.setItem("DATE-" + todayDay , JSON.stringify(scheduleHours));
  };



function loadDay() {
  data = checkLocal();
  if (data === null) {
    scheduleHours.dateSet = todayDay;
     for (i=0; i<scheduleHours.events.length; i++){
      scheduleHours.events[i].description ="";
     };
    constructDay();
  }
  else {
    scheduleHours = data;
    constructDay();
  }
;}

  var data = checkLocal();
  loadDay();
  

  // Event Handlers for Save Buttons
    $(document).on("click", ".save-btn", function(){
    var indexToSave = $(this).attr("data-index");
    var inputDesc = ($("#inputIndex"+indexToSave).val());
    setEventDesc(indexToSave, inputDesc);
    writeLocal();
  });
  
  