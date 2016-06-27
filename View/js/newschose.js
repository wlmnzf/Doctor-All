function changehref(){
	var a = document.getElementsByClassName("article-title");
	var len = a.length;
	for (var i=0;i<len;i++) {
		a[i].href="/Doctor/News/newsdetail?id="+a[i].name;
	}
}
$(document).ready(function(){
	changehref();
});