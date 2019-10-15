$(document).ready(function() {

  $.ajax({
    method: "GET",
    url: "http://18.223.194.18/getMachines"
  }).done(function(data) {

    var temp = "";
    data.dados.forEach(function (value) {
      temp = temp + "<tr><td>" + value.MACHINEID + "</td>";
      temp = temp + "<td>" + value.IP + "</td>";
      temp = temp + "<td>" + value.MAX_AXIS + "</td>";
      temp = temp + "<td>" + value.CNC_TYPE + "</td>";
      temp = temp + "<td>" + value.MT_TYPE + "</td>";
      temp = temp + "<td>" + value.SERIES + "</td>";
      temp = temp + "<td>" + value.VERSION + "</td></tr>";
    });
    $("#machines tr:last").after(temp);

  });

  $("#add").click(function() {

    $.ajax({
      method: "POST",
      url: "http://18.223.194.18/updateMachines/add",
      data: {IP: $("#IP_add").val()}
    }).done(function(msg) {
      alert(msg);
      location.reload();
    });

  });

  $("#del").click(function() {

    $.ajax({
      method: "POST",
      url: "http://18.223.194.18/updateMachines/del",
      data: {IP: $("#IP_del").val()}
    }).done(function(msg) {
      alert(msg);
      location.reload();
    });

  });

});
