// JavaScript Document
var onAnterior;
$(document).on("ready", arranque);
function arranque()
{
	 $("#main-nav > li").on("click",onSelection);
	 onAnterior= $("#main-nav ").children(0);
}
function goToByScroll(id)
{
  	$('html,body').animate({scrollTop: $("#"+id).offset().top},'fast');
}
function onSelection()
{
	if(onAnterior!=this)
	{
		
		$(onAnterior).removeClass("active");
		$(this).addClass("active");
		//onAnterior=this;
		//alert($(onAnterior).attr("class"));
	}
}