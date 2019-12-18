function jump_top(){ 
	var u = navigator.userAgent;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if(isAndroid){
		$("body").css("height","0px");
		$("body").css("height",document.body.scrollHeight);
		$('[jump=true]').bind("focus",function(event){
			if($(event.target).attr("type")=="button")return;
			$("body").css("margin-bottom","500px");
			$(window).scrollTop($(event.target).offset().top-100);
			event.preventDefault();
		});
		$("body").bind("click",function(event){
			if($(event.target).attr("type")=="button")return;
			$("body").css("height","0px");
			$("body").css("height",document.body.scrollHeight);
			$("body").css("margin-bottom","0px");
			event.preventDefault();
		}); 
	};
}
jump_top();