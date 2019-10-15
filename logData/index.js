function mountTable() {
  var ts = $("#dataType").children("option:selected").val();
  var id_machine = $("#machineID").children("option:selected").val();

  $("#" + ts + "T").find("tr:gt(0)").remove();
  $("#" + ts + "T").show();

  $.ajax({
    method: "GET",
    url: "http://18.223.194.18/getData/" + ts
  }).done(function (data) {

    var temp = "";
    data.dados.forEach(function (value) {
      if( (id_machine == "all") || (id_machine == value.MACHINEID) ) {
        temp = temp + "<tr><td>" + value.MACHINEID + "</td>";
        temp = temp + "<td>" + value.DATE + "</td>";
        if(ts == "process") {
          temp = temp + "<td>" + value.MAIN_PROGRAM + "</td>";
          temp = temp + "<td>" + value.RUNNING_PROGRAM + "</td>";
          temp = temp + "<td>" + value.RUNNING_SEQUENCE + "</td>";
        } else if(ts == "alarms") {
          temp = temp + "<td>" + value.ALARM_TYPE + "</td>";
        } else {
          temp = temp + "<td>" + value.ACTIVITY + "</td>";
        }
        temp = temp + "</tr>";
      }
    });
    $("#" + ts + "T tr:last").after(temp);

  });
}



$(document).ready(function() {

  $("table").css("visibility", "visible");
  $("#processT").hide();
  $("#alarmsT").hide();
  $("#activitiesT").hide();

  $.ajax({
    method: "GET",
    url: "http://18.223.194.18/getMachines/ID"
  }).done(function(data) {

    var temp = "";
    data.dados.forEach(function(value) {
      temp = temp + "<option value=\"" + value + "\">" + value + "</option>";
    });
    $("#machineID").children("option:last").after(temp);

  });

  $("#dataType").change(function() {

    $("#processT").hide();
    $("#alarmsT").hide();
    $("#activitiesT").hide();

    mountTable();

  });

  $("#machineID").change(function() {

    mountTable();

  });

  $("#refresh").click(function() {

    mountTable();

  });

});
