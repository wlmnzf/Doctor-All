;
$(document).ready(function(){

	$(".dropdown-page-item").click(function(){
		var src=$(this).data("src");
		if(!(src==""||src==null||src==undefined))
		{
			$.post(src,
            {},
            function(data,status){
              $(".container").html(data);
            });
          
		}
	})


})