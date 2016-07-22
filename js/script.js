$(document).ready(function(){
	var _KID1AGE = Date.now() - new Date(2007, 3, 11);
	var _KID2AGE = Date.now() - new Date(2012, 4, 8);

	$("#kid1").html(ageInYears(_KID1AGE));
	$("#kid2").html(ageInYears(_KID2AGE));

	var meter = [];

    meter.push(meterPart('.outline', '#000', 6, 1));
    //meter.push(meterPart('.low', '#fde47f', 3, 1));
    meter.push(meterPart('.avg', '#7ccce5', 3, 1));
    //meter.push(meterPart('.high', '#e04644', 3, 0.30));
    meter.push(meterPart('.mask', '#333', 5, 0));
    //meter.push(meterPart('.ends', '#000', 65, 2));

	for(var i = 0; i<meter.length; i++){
		updateMeter(meter[i]);
	}

        $("#meter").on('click', function(){

			updateMask('.mask', '361, 361');
		});

});

function meterPart(classSelector, strokeColour, strokeWidth, strokeDash){
	var thisMeter = {};
	var circumference;
	thisMeter.classSelector = classSelector;
	thisMeter.strokeColour = strokeColour;
	thisMeter.strokeWidth = strokeWidth;
	thisMeter.radius = $("#wrapper").height() * 0.75 / 2;
	circumference = 2 * Math.PI * thisMeter.radius;
	console.log(circumference);

	thisMeter.strokeDash = circumference / 2 * strokeDash;
	thisMeter.strokeGap = circumference;

	thisMeter.strokeDashArray = thisMeter.strokeDash + ", " + thisMeter.strokeGap;

	return thisMeter;
}

function updateMeter(meter){
	$(meter.classSelector).attr({
		"r" : meter.radius,
		"stroke" : meter.strokeColour,
		"stroke-width" : meter.strokeWidth,
		"stroke-dasharray" : meter.strokeDashArray});

}

function updateMask(selector, setTo){
	$(selector).attr({'stroke-dasharray' : setTo});
	console.log($(selector));
}


function ageInYears(ageInMilliseconds){
	return Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365);
}

$('.navPane').click(function(){
	var panes = $('.navPane');
	if(!paneIsOut(panes)){
		expandPane($(this));
		$('.paneOverlay', this).addClass('darken');


		showPaneContent($(this));
	}
});

function expandPane(paneToExpand){
	paneToExpand.addClass("outa");
	$('#close').delay(300).fadeIn(100);
}

function showPaneContent(pane){
	pane.find('.paneContent').delay(200).fadeIn(200);
}

function hidePaneContent(pane){
	pane.find('.paneContent').fadeOut(200);
}

$("#close").on("click", function(){
	var closeBox = $('.outa');
	if(categoryOpen()){
		hideCategoryContent();
		showHiddenCategories();
	}
	else{

		hidePaneContent(closeBox);
		setTimeout(function(){
			closeBox.removeClass('outa');
			$(".paneOverlay").removeClass('darken');
			$('#close').fadeOut(100);
		}, 200);
	}
});

function categoryOpen(){
	var categoryContent = $('.paneContent > div');
	for( var i = 0; i < categoryContent.length; i++){
		if($(categoryContent[i]).hasClass('subjectContent')){
			return true;
		}
	}
	return false;
}

function hideCategoryContent(){
	var innerContent = '#' + $(".subjectContent").attr('id') + "-content";
	$(innerContent).fadeOut(100);
	$(".subjectContent").removeClass('subjectContent');
}

function showHiddenCategories(){
	$('.paneContent > div:hidden').delay(200).fadeIn();

}

function paneIsOut(panes){
	for(var i = 0; i < panes.length; i++){
		if($(panes[i]).hasClass('outa')){
			return true;
		}
	}
	return false;
}

$('.paneContent > div').on('click', function(){
	var contentPanes = $('.paneContent > div');
	var visibleContent;
	for(var i = 0; i < contentPanes.length; i++){
       if(contentPanes[i].id != $(this).attr('id')){
		   $(contentPanes[i]).fadeOut();
	   }
	   else{
		   visibleContent = $(contentPanes[i]);
	   }
	}
	setTimeout(function(){
		visibleContent.addClass('subjectContent');
		var sel = '#' + visibleContent.attr('id')+'-content';
		$(sel).delay(300).fadeIn(300);
	}, 300);
});
