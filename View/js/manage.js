;
$(document).ready(function(){

/**
 * @function  {[动态加载页面]}
 */
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