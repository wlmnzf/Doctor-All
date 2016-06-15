;
/**
 * [regChar 正则表达式中的需要转义的字符]
 * @type {Array}
 */
var regChar=new Array("*",".","?","+","$","^","[","]","(",")","{","}","|");


//滑动监听,返回顶部
$(window).scroll(function(){
  		 var $sc=$(window).scrollTop();
 	  if ($sc > 100 ) {
                $('#right_iconbox').fadeIn(500);
            }

            if ($sc >= 500) {

                $('.go-top').stop().animate({
                    opacity: 1
                }, 500);
            } else {

                $('.go-top').stop().animate({
                    opacity: 0
                }, 500);
            }
 		})
 		$("#goTopBtn").click(function(){
	    var sc=$(window).scrollTop();
   		$('body,html').animate({scrollTop:0},500);
 		})


/**
 * @function {[下载css文件]}
 * @param  {[path  string   替换的中英文css文件的地址]}
 * @return {[无]}
 */
function download(path){
		// if(!path || path.length === 0){
		// 	throw new Error('argument "path" is required !');
		// }
		// var head = document.getElementsByTagName('head')[0];
  //       var link = document.createElement('link');
  //       link.href = path;
  //       link.rel = 'stylesheet';
  //       link.type = 'text/css';
  //       head.appendChild(link);
       var node="<div  style='background-image:url("+path+");width:0;height:0;'></div>"
       var body =$("body");
       body.append($(node));
    }





/**
 * @function {[判断浏览器是否支持LocalStorage功能]}
 * @return {[bool]}
 */
function judgeLocalstorage()
{
	if(window.localStorage)
	{
	    return true;
	}
	return false;
}



/**
 * @function  {[清除空格和换行]}
 * @param {[key string 要清除空格和换行的文字]}
 * @return {[string 已经清除空格和换行的文字]}
 */
function ClearBr(key) { 
    key = key.replace(/[\r\n]*/gm, ""); 
    return key; 
} 



/**
 * @function {[将正则表达式中的特殊符号转义]}
 * @param  {[obj string 需要转义的正则表达式]}
 * @param  {[str string  转义字符]}
 * @return {[string  已转义的正则表达式]}
 */
function replaceReg(obj,str)
  {
		var index=-1;
		var start=0;
		   // alert("ddd");
		while((index=obj.indexOf(str,start))>0)
		 {
			obj=obj.substr(0, index)+"\\"+obj.substr(index);
			 start=index+2;
		  }
		  return obj;
	}


/**
 * @function {[替换文字]}
 * @param  {[obj string  要替换的整段文字]}
 * @param  {[oldStr string 要被替换的文字]}
 * @param  {[newStr string 替换成的新文字]}
 * @return {[string  已被替换的文字]}
 */
function replaceAll(obj ,oldStr, newStr) 
{
    for(var i=0;i<regChar.length;i++)
    {
		if(oldStr.indexOf(regChar[i])>0)
		   oldStr=replaceReg(oldStr,regChar[i]);
    }


	 return obj.replace(new RegExp(">[\\s]*"+oldStr+"[\\s]*<","gm"),function(word){
         return ">"+newStr+"<"}
  ); 
}



/**
 * @function {[转换语言核心部分]}
 * @param  {[data string 中英文百科大字典]}
 * @param  {[deriction bool true:中->英  false:英->中]}
 * @return {[type]}
 */
function change(data,deriction)
{
                encn=data;
                encn=JSON.parse(encn);

                    var css_src=$("#css_src").val();
                    //替换css为英文版本css或中文版本的css
				   if(deriction)
				    	{
				    			$("link").each(function(){
											var path=$(this).attr("href").replace(css_src,css_src+"/en");
											$(this).attr("href",path);
										})
				    	}
				    	else
				    	{
				    		  	$("link").each(function(){
											var path=$(this).attr("href").replace(css_src+"/en",css_src);
											$(this).attr("href",path);
									})
				    	}


               //正则替换
			    for(var i=0;i<encn.length;i++)
			    {
			    	//if(encn[i].remark)
			    	var id=encn[i].remark;
			    		tmpText=$("body").html()
				    	tmpText=ClearBr(tmpText);

				    	var json=JSON.parse(unescape(encn[i].json));

				    	for(var j=0;j<json.length;j++)
				    	{
				    		if(deriction)
				    		{
				    			tmpText=replaceAll(tmpText, json[j].cn, json[j].en);
				    		}
				    		else
				    		{
				    			tmpText=replaceAll(tmpText, json[j].en, json[j].cn);
				    		}
				    	}
				    	$("body").html(tmpText)
			     

			    }
}



/**
 * @function {[改变语言]}
 * @param  {[deriction bool true:中->英]}
 * @return {[无]}
 */
function changeLang(deriction)
{
    var encn="";
    if(judgeLocalstorage())
    {
    	encn=localStorage.getItem("encn");
    }

    if(encn==""||encn==undefined||encn==null)
    {
		var url=$("#encn_src").val();
		$.post(url,
	            {},
	            function(data,status){
	                 // $.cookie("encn",data);
	                 change(data,deriction);
	            });
     }
     else
     {
     	change(encn,deriction)
     }
}



/**
 * @function {[function:页面初始化函数，判断这个网页应该显示中文还是英文]}
 * @return {[无]}
 */
function language(){
		var targetlang="en";
		var current=$(this).find(".current");
		if(current.hasClass("en"))//当前是英语
		{
			targetlang="cn";
			// $.cookie("targetlang","cn")
			changeLang(false);
		}
		else
		{
			targetlang="en";
			changeLang(true);
		}
		//改变状态后，将语言选项（中文还是英文），存入cookie
        $.cookie("targetlang",targetlang,{ 
                 path: "/"
            })
        current=$(".language").find(".current");
		current.removeClass("current");
		$(".language").find("."+targetlang).addClass("current");
		$(".language").click(language)
	}



$(document).ready(function(){
	var css_src=$("#css_src").val();
	//预下载英文版本的css
	$("link").each(function(){
		var path=$(this).attr("href").replace(css_src,css_src+"/en");
		download(path);

	})
     //如果localstorage存在下载来的字典数据就直接取用，否则，重新下载
    if(judgeLocalstorage())
    {
    	 var url=$("#encn_src").val();
		  $.post(url,
            {},
            function(data,status){
                 // lacalStorage["encn"]=data;
                 localStorage.setItem("encn",data)
            });
    }

	$(".language").click(language)
    

    var targetlang="cn";
    storagelang=$.cookie("targetlang");
    if(!(storagelang==""||storagelang==undefined||storagelang==null))
    {
    	targetlang=storagelang;
    }

   
    var current=$(this).find(".current");
	if(current.hasClass("en")&&targetlang=="cn")//当前是英语
		{
			$(".language").click();
			$.cookie("targetlang","cn",{ 
                 path: "/"
            })
		}
	else if(current.hasClass("cn")&&targetlang=="en")
		{
			$(".language").click();
			$.cookie("targetlang","en",{ 
                 path: "/"
            })
		}


})