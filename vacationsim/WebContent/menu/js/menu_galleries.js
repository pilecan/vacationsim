
function setMenuGallery(currentGalleries,isModification) {
	if (menuGalleries[currentGalleries] == undefined) {
		console.log("currentGalleries = " + currentGalleries + " not found...");
		currentGalleries = "welcome";
	}

	menuGalleries[currentGalleries] = window.sessionStorage.getItem("menuGalleries-"+currentGalleries);

	centerImage[currentGalleries] = window.sessionStorage.getItem("centerimage-"+currentGalleries);
	
	backgroundImage[currentGalleries] = window.sessionStorage.getItem("background-"+currentGalleries);

	if (!isModification){
		document.body.style.backgroundImage = "url(" + backgroundImage[currentGalleries] + ")";
	}

	currentGalleriesNumber = getIndexOfGalleries(menuGalleries, currentGalleries);

	try {
		document.getElementById("center_image").src = centerImage[currentGalleries];
	} catch (err) {
		try {
			window.parent.document.getElementById("center_image").src = centerImage[currentGalleries];
		} catch (err) {
			window.parent.parent.document.getElementById("center_image").src = centerImage[currentGalleries];
			
		}
	}

	let arrayGallery = menuGalleries[currentGalleries].split("\|");

	let angle = 0;
	let inclinaison = 360 / Object.keys(arrayGallery).length;

	try {
		document.getElementById("items").innerHTML = "";
	} catch (err) {
		try {
			window.parent.document.getElementById("items").innerHTML = "";
		} catch (err) {
			window.parent.parent.document.getElementById("items").innerHTML = "";

		}
	}

	let line = "";
	for (index = 0; index < Object.keys(arrayGallery).length; index++) {
		angle = index * inclinaison;

		line += '<li style="transform: rotate(' + angle + 'deg);">';
		//removeAccents(arrayGallery[index].toLowerCase().replace(" ",""))

		line += '<input id="' + (index + 1) + '" name="' + arrayGallery[index] + '" type="checkbox" title="' + arrayGallery[index] + '" onchange="clickItemMenu(this)">';
		line += '<label for="' + (index + 1) + '" style="transform: rotate(-' + angle + 'deg);">' + arrayGallery[index] + '</label>';
		line += '</li>';
	}
	
	try {
		document.getElementById("items").innerHTML = line;
	} catch (err) {
		try {
			window.parent.document.getElementById("items").innerHTML = line;
		} catch (err) {
			window.parent.parent.document.getElementById("items").innerHTML = line;
		}
	}
	

}

function resetMenuGalleries(currentGalleries){
	
	menuGalleries[currentGalleries] =  window.sessionStorage.getItem("menuGalleries-"+currentGalleries);
	centerImage[currentGalleries] =  window.sessionStorage.getItem("centerimage-"+currentGalleries);
	setMenuGallery(currentGalleries,false);
	
}



/******************************************************************************** */

function selectBackground(title) {

	document.body.style.backgroundImage = "url(" + backgroundImage[currentGalleries] + ")";


	/* 	if (currentGalleries == "welcome") {
			document.body.style.backgroundImage = "url(./images/" + title + ".jpg)";
		} else {
			document.body.style.backgroundImage = "url(" + backgroundImage[currentGalleries] + ")";
		}
	 */
}



/******************************************************************************** */

function getNextGalleries() {
	if (currentGalleriesNumber < titleGalleries.length - 1) {
		currentGalleriesNumber++;
	} else {
		currentGalleriesNumber = 0;
	}

	currentGalleries = titleGalleries[currentGalleriesNumber];
	//console.log(titleGalleries[currentGalleriesNumber]);
	document.getElementById("gallery_name").innerHTML = jsUcfirst(currentGalleries);

	setMenuGallery(currentGalleries,false)

	getDBGalleries(currentGalleries, galleriesIds[currentGalleries]);
	window.sessionStorage.setItem("currentGalleries", currentGalleries);


	$("#button-sim").click();
	$("#button-sim").click();

}


/****************************************************************************** */
function getPreviousGalleries() {
	if (currentGalleriesNumber > 0) {
		currentGalleriesNumber--;
	} else {
		currentGalleriesNumber = titleGalleries.length - 1;
	}
	currentGalleries = titleGalleries[currentGalleriesNumber];
	//console.log(titleGalleries[currentGalleriesNumber]);
	document.getElementById("gallery_name").innerHTML = jsUcfirst(currentGalleries);

	setMenuGallery(currentGalleries,false)

	getDBGalleries(currentGalleries, galleriesIds[currentGalleries]);
	window.sessionStorage.setItem("currentGalleries", currentGalleries);


	$("#button-sim").click();
	$("#button-sim").click();
}

/****************************************************************************** */
function editGalleries() {

	$("#button-sim").click();
	$("#button-sim").click();

	wait(100);

	$("#menu_items").hide();
	
    $("#btn-prev").hide();
    $("#btn-edit").hide();
    $("#btn-next").hide();


	$(".wmBox_overlay").hide();
	
	var width = $(document).width();
	var height = $(document).height()-100;

	document.getElementById('galleries-editor').setAttribute("src", "./manage/manager.html?g=" + document.getElementById("gallery_name").innerHTML);
 	document.getElementById('galleries-editor').setAttribute("width", width);
	document.getElementById('galleries-editor').setAttribute("height", height);
	document.getElementById("galleries-editor").click();

}

/****************************************************************************** */
function reloadGalleries() {

    $("#galleries-editor", window.parent.document).setAttribute("src", "./manage/manager.html?g=" + $("#gallery_name", window.parent.document).innerHTML);
	$("#galleries-editor", window.parent.document).click();

}

