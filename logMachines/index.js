$(document).ready(function() {

  $.ajax({
    method: "GET",
    url: "http://18.223.194.18/getMachines"
  }).done(function(data) {

    var temp = data.split("SP,SP");
    var i;
    for(i=0; i<temp.length; i++){
      var temp2 = "<tr><td>" + temp[i].IDX + "</td>";
      temp2 = temp2 + "<td>" + temp[i].IP + "</td>";
      temp2 = temp2 + "<td>" + temp[i].MAX_AXIS + "</td>";
      temp2 = temp2 + "<td>" + temp[i].CNC_TYPE + "</td>";
      temp2 = temp2 + "<td>" + temp[i].MT_TYPE + "</td>";
      temp2 = temp2 + "<td>" + temp[i].SERIES + "</td>";
      temp2 = temp2 + "<td>" + temp[i].VERSION + "</td></tr>";
      $("#machines").after(temp2);
    }

  });

  $("#add").click(function() {

    $.ajax({
      method: "POST",
      url: "http://18.223.194.18/updateMachines/add",
      data: {IP: $("#IP").val()}
    }).done(function(msg) {
      alert(msg);
    });

    $("#IP").val("");

  });

  $("#del").click(function() {

    $.ajax({
      method: "POST",
      url: "http://18.223.194.18/updateMachines/del",
      data: {IDX: $("#idx").val()}
    }).done(function(msg) {
      alert(msg);
      location.reload();
    });

  });

});
