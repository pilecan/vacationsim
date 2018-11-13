let lastGalleries = "";
let newGalleries = true;
let iii = "?apiKey=MpCCNSeWtXa6plAfn1iFyXTf7xyUz8GH";
let abc = "huvsw:01dti/ooeb/erq/brl310fdxaccvis0xdgaukrrsjo2gomnhgtjqqw/tkpgomnhgtjqq";

function wait(ms) {
	var d = new Date();
	var d2 = null;
	do {
		d2 = new Date();
	}
	while (d2 - d < ms);
}

let googleMaps = null;

function showGoogleMaps() {
	toggleOptions('.selector');
	if (!(googleMaps && !googleMaps.closed)) {
		googleMaps = window.open("https://www.google.ca/maps/@18.7734624,102.7498123,2.92z");
	}
}

function getParameterByName(name) {
	// console.log("name before-->"+name)
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	//  console.log("name-->"+name)
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	// console.log("result-->"+results)
	return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getBlob() {
	var blob = null;
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "./data/gallery1.txt");
	xhr.responseType = "blob"; //force the HTTP response, response-type header to be blob
	xhr.onload = function () {
		blob = xhr.response; //xhr.response is now a blob object
	}
	xhr.send();
}

function insertAndExecute(src) {
	var scripts = Array.prototype.slice.call(document.getElementById(id).getElementsByTagName("script"));
	for (var i = 0; i < scripts.length; i++) {
		if (scripts[i].src != "") {
			var tag = document.createElement("script");
			tag.src = scripts[i].src;
			document.getElementsByTagName("head")[0].appendChild(tag);
		} else {
			eval(scripts[i].innerHTML);
		}
	}
}

function code(str) {
	var str2 = "";
	for (i = 0; i < str.length; i++) {
		str2 += String.fromCharCode(str.charCodeAt(i) + (i % 5));
	}

	return str2;	
}

function xxx(str2) {
	var str = "";

	for (i = 0; i < str2.length; i++) {
		str += String.fromCharCode(str2.charCodeAt(i) - (i % 5));
	}
	return str;
}



function getIndexOfGalleries(gallery, title) {
	var i = 0;
	for (key in gallery) {
		if (title == key) {
			break;
		}
		i++;
	}
	return i;

}

function jsUcfirst(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function removeAccents(str) {
	return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}