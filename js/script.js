window.onload = function(){
	document.getElementById("portfolio").addEventListener("click", expand);
	document.getElementById("about").addEventListener("click", expand);
	document.getElementById("contact").addEventListener("click", expand);
}

function expand(){
	var closeBox = document.getElementById('close');
	closeBox.className = addClass('visible', closeBox.className);
	this.className = addClass('outa', this.className);
}

function addClass(cls, eleClasses){
	var classes = eleClasses.split(" ");
	if(!hasClass(classes, cls)){
		classes.push(cls);
	}
	return classes.join(" ");
}

function hasClass(classes, cls){
	for(var i=0; i<classes.length; i++){
		if(classes[i] === cls){
			return true;
		}
	}
	return false;
}

function removeClass(cls, eleClasses){
	var classes = eleClasses.split(" ");
	var newClasses = [];
	for(var i=0;i<classes.length;i++){
		if(classes[i] !== cls){
			newClasses.push(classes[i]);
		}
	}
	return newClasses.join(" ");
}