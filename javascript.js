//document ready
$(function() {
	$("#marker1").click(function(e) {
        $("#content").load("pages/popup1.html");
    });
});

$(document).ready(function(){
    $("main").draggable({stack:"div"});
})
