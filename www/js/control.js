// JavaScript Document
var onAnterior;
$(document).on("ready", arranque);
function arranque()
{
	$("#main-nav > li").on("click",onSelection);
	$(".media-grid > li").on("click",onModal);
	$('#modal-from-dom').modal({backdrop:true,keyboard: true})	
	
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
	}
}
function onKillModal()
{
	
	$('.modal-body').replaceWith('<div class="modal-body"></div>');
	

	
}
function onModal()
{
	$('#modal-from-dom').modal('show');
	var asestorItem=$($(this).parent()).parent();
	var hAnsertor=$(asestorItem).find('h3');
	var itemToAdd=$(asestorItem).attr('info');
	$($('.modal-header').find('h3')).text($(hAnsertor).text());
	$('.modal-body').replaceWith('<div class="modal-body">' +itemToAdd+'</div>');
	
}