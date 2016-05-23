var width=0;
var index=0;
var height=0;
window.onresize = function(){
   height=$(".banner li img").eq(0).height();
	$(".tab").height(height);
}

function banner_init()
{
	width=$(".banner li").eq(0).width();
	$(".banner li").each(function(i)
	{
		$(this).css("left",i*width);
	})
	height=$(".banner li img").eq(0).height();
	$(".tab").height(height);
}

function show_index(i)
{
	var pic_list=$(".banner li");
	var len=pic_list.length;

	if(i>0)
	{
		pic_list.eq(1).animate({left:"0px"},"slow",function(){
			pic_list.eq(0).css("left",(len-1)*width);
			pic_list.eq(0).appendTo(".banner ul");
		});
	}
	else
	{
		pic_list.eq(len-1).css("left","-"+width.toString()+"px");
		pic_list.eq(len-1).animate({left:"0px"},"slow",function(){
			pic_list.each(function(i){
				if(i<len-1)
				{
					$(this).css("left",((i+1)*width).toString()+"px");
				}
			})
			
			pic_list.eq(len-1).insertBefore(pic_list.eq(0));
		});
	}
}

function show_last()
{
	show_index(-1);
}

function show_next()
{
	show_index(+1);
}

$(document).ready(function(){
	 banner_init();
	 var idInt = setInterval(function(){
	 	show_next();
	 },4000);
	 
	 $(".left-arrow").click(function(){
	 	 show_last();
	 })
	 
	 $(".right-arrow").click(function(){
	 	 show_next();
	 })
})
