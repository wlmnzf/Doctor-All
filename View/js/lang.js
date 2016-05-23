;
//deraction=true:cn=>en
// String.prototype.replaceAll = function(oldStr, newStr) {
// 	    return this.replace(new RegExp(oldStr,"gm"),newStr); 
// 	}
var regChar=new Array("*",".","?","+","$","^","[","]","(",")","{","}","|");

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

function judgeLocalstorage()
{
	if(window.localStorage)
	{
	    return true;
	}
	return false;
}

function ClearBr(key) { 
    // key = key.replace(/<\/?.+?>/g,""); 
    key = key.replace(/[\r\n]*/gm, ""); 
    // key = key.replace(/[\s]/gm, ""); 
    return key; 
} 

function replaceReg(obj,str)
  {
		var index=-1;
		var start=0;
		   // alert("ddd");
		while((index=obj.indexOf(str,start))>0)
		 {
		      // alert(index);
			  
			obj=obj.substr(0, index)+"\\"+obj.substr(index);
			  // alert(obj);
			 start=index+2;
		  }
		   // alert("sss");
		  return obj;
	}

function replaceAll(obj ,oldStr, newStr) 
{
    for(var i=0;i<regChar.length;i++)
    {
		if(oldStr.indexOf(regChar[i])>0)
		   oldStr=replaceReg(oldStr,regChar[i]);
    }


	 return obj.replace(new RegExp(">[\\s]*"+oldStr+"[\\s]*<","gm"),function(word){
          // console.log(word);
         return ">"+newStr+"<"}
  ); 
   // return obj.replace(/>[\s]*关于我们[\s]*</gm, "><"); 
}

function change(data,deriction)
{
                encn=data;
                encn=JSON.parse(encn);

                    var css_src=$("#css_src").val();
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

			    for(var i=0;i<encn.length;i++)
			    {
			    	//if(encn[i].remark)
			    	var id=encn[i].remark;
			    		tmpText=$("body").html()
				    	tmpText=ClearBr(tmpText);
				    	// tmpText=tmpText.replace(/\s+([^<>]+)(?=<)/g, function (m) { 
				    	// 	    console.log(m);
			      //   			return m.replace(/(^\s*)|(\s*$)/g,""); 
			   			// 	});
				    	var json=JSON.parse(unescape(encn[i].json));

				    	for(var j=0;j<json.length;j++)
				    	{
				    		// var reg=new RegExp(json[j].cn,"mg");
				    		if(deriction)
				    		{
				    			tmpText=replaceAll(tmpText, json[j].cn, json[j].en);
				    		}
				    		else
				    		{
				    			tmpText=replaceAll(tmpText, json[j].en, json[j].cn);
				    		}
				    		// tmpText=tmpText.replace(/首页/gm,"index"); 
				    	}
				    	$("body").html(tmpText)
			     

			    }
}

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


   // $(".head").html();
}

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
        $.cookie("targetlang",targetlang,{ 
                 path: "/"
            })
        current=$(".language").find(".current");
		current.removeClass("current");
		$(".language").find("."+targetlang).addClass("current");
		$(".language").click(language)
	}



$(document).ready(function(){
	// var encn=$.cookie("encn");
	var css_src=$("#css_src").val();
	$("link").each(function(){
		var path=$(this).attr("href").replace(css_src,css_src+"/en");
		download(path);

	})

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
 //    targetlang=$("#targetLang").val();
    // if(targetlang!="en"&&targetlang!="cn")
    // {
    // 	storagelang=$.cookie("targetlang");
    // 	if(storagelang)
    // }

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