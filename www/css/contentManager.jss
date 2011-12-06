var headerContent;
var slides;
var sliderOrder = new Array ();
var readyForLoad = false;
var xmlUrl = "sample.xml"; 
sliderOrder = [0,1];

$(document).ready(function() 
{
	console.log("DOM ready")
	readyForLoad = true;
	
	if (xmlUrl)
	{
		loadXml(xmlUrl)
	};  
});


function loadXml(dname)
{
	xmlUrl = dname;
	if (!readyForLoad)
	{
		return;
	}
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	xmlhttp.open("GET", dname ,false);
	xmlhttp.send();
	xmlDoc=xmlhttp.responseXML; 
	
	headerContent =  xmlDoc.getElementsByTagName("header");
	slides = xmlDoc.getElementsByTagName("slide");
	
	setTitle();
	buildGrid();
}

function setTitle ()
{
	var headerId = headerContent[0].getAttribute("id") ;
	var titleContent = headerContent[0].childNodes[0].nodeValue ;
	document.getElementById("sectionTitle").innerHTML = titleContent;
	document.getElementById("sectionId").innerHTML = "<h3>Sección</h3><h1>"+ headerId +"</h1>";
}
function buildGrid()
{
	var amountSlides = (slides.length > 10)? 10 : slides.length ;
	
	if ( amountSlides < 2 )
	{
		alert ("Se nececitan por lo menso dos presentaciones");
		return;
	};
	
	var gridContent = "";
	sliderOrder = [];
	
	for ( i = 0 ; i < amountSlides ; i ++)
	{
		var type =  slides[i].getAttribute("type") ; 
		gridContent += "<div class='flip-container'><div id='itemGrilla"+i+"' class='front face "+ type + "' itemIndex='"+i+"' >";
		var thumbId = (i <11)? "0" + (i + 1) : (i+ 1);
		gridContent += "<div class='thumbId'>"+ thumbId + "</div>";		
		gridContent += slides[i].childNodes[0].childNodes[0].nodeValue  + "</div></div>";
		sliderOrder[i] = i;		
	};
	document.getElementById("grilla").innerHTML = gridContent ;
	
	/* buildPresentation(); */
}

function closePresentation()
{
	$('#slides_wrapper').hide();
	$('#grilla').show();
	$('#escondidos').show();
	$('#botones').show();
	document.getElementById("slides_wrapper").innerHTML = "" ;

	onClosePresentation(); 
}
function buildPresentation()
{
	var amountSlides = sliderOrder.length;
	
	/*
	var slideWidth = (amountSlides - 1)* 768 ;
	$('#slides_wrapper').css('width' ,  slideWidth + 'px' );
	*/
	
	$('#slides_wrapper').css('height' , '1024px' );
	$('#slides_wrapper').show();
	$('#grilla').hide();
	$('#escondidos').hide();
	$('#botones').hide();

	
	
	if ( amountSlides < 2 )
	{
		alert ("Se nececitan por lo menso dos presentaciones");
		return;
	};
	
	var presentationContent =  '<a class="closeButton" onClick="closePresentation();" style="z-index: 300"><img src="img/close.gif" /></a>';
	
	
	for ( i = 0 ; i < amountSlides ; i ++)
	{
		if (i == 0)
		{
			presentationContent +=  "<section id='slide-" + (i+1) + "' class='slide firstslide'>" ;
		}else if ( i == amountSlides -1)
		{
			presentationContent +=  "<section id='slide-" + (i+1) + "' class='slide lastslide'>" ;
		}else
		{
			presentationContent +=  "<section id='slide-" + (i+1) + "' class='slide'>" ;
		}
		var presentation = slides[ sliderOrder[i] ].getElementsByTagName("presentation")[0].childNodes[0].nodeValue  ;
		presentationContent +=  presentation + "</section>";		
	};
	
	document.getElementById("slides_wrapper").innerHTML = presentationContent ;
	
	$('#slides_wrapper .slide').css('width' , '768px' );
	$('#slides_wrapper .slide').css('height' , '1024px' );
	$('#slides_wrapper').addClass('sliderAnimConfig');
	
	initSlider();
}