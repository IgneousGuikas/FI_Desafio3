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
    }).done(function(data) {

      var temp = data.split("SP,SP");

      if(temp.indexOf("") == -1) {
        temp.slice(temp.indexOf(""),1);
      }

      var i;
      for(i=0; i<temp.length; i++) {
        var temp2 = JSON.parse(temp[i]);
        var temp3 = "<tr><td>" + temp2.MACHINEID + "</td>";
        temp3 = temp3 + "<td>" + temp2.DATE + "</td>";
        if(table_selected == "process") {
          temp3 = temp3 + "<td>" + temp2.MAIN_PROGRAM + "</td>";
          temp3 = temp3 + "<td>" + temp2.RUNNING_PROGRAM + "</td>";
          temp3 = temp3 + "<td>" + temp2.RUNNING_SEQUENCE + "</td>";
        } else if(table_selected == "alarms") {
          temp3 = temp3 + "<td>" + temp2.ALARM_TYPE + "</td>";
        } else {
          temp3 = temp3 + "<td>" + temp2.ACTIVITY + "</td>";
        }
        temp3 = temp3 + "</tr>";
        $("#" + table_selected + "T tr:last").after(temp3);
      }

    });

  });

});
