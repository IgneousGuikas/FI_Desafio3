$(document).ready(function() {

  $("table").css("visibility", "visible");
  $("#processT").hide();
  $("#alarmsT").hide();
  $("#activitiesT").hide();

  $("select").change(function() {

    var temp = "#" + $(this).children("option:selected").val() + "T";

    $("#processT").hide();
    $("#alarmsT").hide();
    $("#activitiesT").hide();

    $(temp).show();

  });

});
