$(document).ready(function() {

  $.ajax({
    method: "GET",
    url: "http://18.223.194.18/getMachines"
  }).done(function(data) {

    var temp = data.split("SP,SP");

    if(temp.indexOf("") == -1) {
      temp.slice(temp.indexOf(""),1);
    }
    var i;
    for(i=0; i<temp.length; i++) {
      var temp2 = JSON.parse(temp[i]);
      var temp3 = "<tr><td>" + temp2.IDX + "</td>";
      temp3 = temp3 + "<td>" + temp2.IP + "</td>";
      temp3 = temp3 + "<td>" + temp2.MAX_AXIS + "</td>";
      temp3 = temp3 + "<td>" + temp2.CNC_TYPE + "</td>";
      temp3 = temp3 + "<td>" + temp2.MT_TYPE + "</td>";
      temp3 = temp3 + "<td>" + temp2.SERIES + "</td>";
      temp3 = temp3 + "<td>" + temp2.VERSION + "</td></tr>";
      $("#machines tr:last").after(temp3);
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
