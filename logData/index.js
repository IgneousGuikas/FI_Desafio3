function mountTable(data, ts) {
  var temp = "";
  data.forEach(function (value) {
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
  });
  $("#" + ts + "T tr:last").after(temp);
}



$(document).ready(function() {

  $("table").css("visibility", "visible");
  $("#processT").hide();
  $("#alarmsT").hide();
  $("#activitiesT").hide();

  $("select").change(function() {

    var table_selected = $(this).children("option:selected").val();

    $("#processT").hide();
    $("#alarmsT").hide();
    $("#activitiesT").hide();

    $("#" + table_selected + "T").find("tr:gt(0)").remove();
    $("#" + table_selected + "T").show();

    $.ajax({
      method: "GET",
      url: "http://18.223.194.18/getData/" + table_selected
    }).done(function (data) {
      mountTable(data.dados, table_selected);
    });

  });

  $("#refresh").click(function() {

    var table_selected = $("select").children("option:selected").val();

    $("#" + table_selected + "T").find("tr:gt(0)").remove();

    $.ajax({
      method: "GET",
      url: "http://18.223.194.18/getData/" + table_selected
    }).done(function(data) {
      mountTable(data.dados, table_selected);
    });

  });

});
