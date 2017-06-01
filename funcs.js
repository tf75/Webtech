addEventListener('load', start);


var preload = document.getElementById("preload");



function start() {
  var e1 = document.querySelector("#e1");
  e1.onmouseover = mouseOverBox;
  e1.onmouseout= mouseNotBox;
}

function mouseOverBox(event){
	var e = event.target;
	if (e.tagName.toLowerCase() != 'div') return;
	e.style.opacity = 1;
}

function mouseNotBox(event){
 	var e = event.target;
	if (e.tagName.toLowerCase() != 'div') return;
   console.log(event);
	e.style.opacity = 0.75;
}

window.addEventListener('load', function(){
  preload.style.display = 'none';
});

function mouse2overbox(){

	var on = document.getElementById("2demo").style.opacity = 0.75;
}

function mouse2notbox(){

	var on = document.getElementById("2demo").style.opacity = 1;
}

function mouse3overbox(){

	var on = document.getElementById("3demo").style.opacity = 0.75;
}

function mouse3notbox(){

	var on = document.getElementById("3demo").style.opacity = 1;
}

function mouse4overbox(){

	var on = document.getElementById("4demo").style.opacity = 0.75;
}

function mouse4notbox(){

	var on = document.getElementById("4demo").style.opacity = 1;
}

function mouse5overbox(){

	var on = document.getElementById("5demo").style.opacity = 0.75;
}

function mouse5notbox(){

	var on = document.getElementById("5demo").style.opacity = 1;
}

function mouse6overbox(){

	var on = document.getElementById("6demo").style.opacity = 0.75;
}

function mouse6notbox(){

	var on = document.getElementById("6demo").style.opacity = 1;
}

function mouse7overbox(){

	var on = document.getElementById("7demo").style.opacity = 0.75;
}

function mouse7notbox(){

	var on = document.getElementById("7demo").style.opacity = 1;
}

