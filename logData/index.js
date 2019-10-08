function update(){
  $.ajax({
    method: "GET",
    url: "http://18.223.194.18/getData"
  }).done(function(data){
    var temp = data.split("SP,SP");
    var text = "";
    var i;
    for(i=0; i<temp.length; i++){
      temp2 = JSON.parse(temp[i]);
      text = text + "<p>Date: " + temp2.date + "</p>";
      text = text + "<p>Dados: " + temp2.dados + "</p>";
      text = text + "<p>Request: " + temp2.request + "</p>";
    }
    $('div').prepend(text);
  })
}

$(document).ready(function(){
  update();
})
