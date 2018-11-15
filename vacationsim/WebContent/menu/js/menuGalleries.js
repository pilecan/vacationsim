function setMenuGallery(currentGalleries) {
	if (galleryArray[currentGalleries] == undefined) {
		console.log("currentGalleries = " + currentGalleries + " not found...");
		currentGalleries = "welcome";
	}

	//console.log("----->"+backgroundImage[currentGalleries]);


	document.body.style.backgroundImage = "url(" + backgroundImage[currentGalleries] + ")";

	currentGalleriesNumber = getIndexOfGalleries(galleryArray, currentGalleries);

	//console.log("currentGalleries = "+currentGalleries);

	document.getElementById("center_image").src = centerImage[currentGalleries];

	let arrayGallery = galleryArray[currentGalleries].split("\|");

	let angle = 0;
	let inclinaison = 360 / Object.keys(arrayGallery).length;

	document.getElementById("items").innerHTML = "";


	for (index = 0; index < Object.keys(arrayGallery).length; index++) {
		angle = index * inclinaison;

		let line = '<li style="transform: rotate(' + angle + 'deg);">';
		//removeAccents(arrayGallery[index].toLowerCase().replace(" ",""))

		line += '<input id="' + (index + 1) + '" name="' + arrayGallery[index] + '" type="checkbox" title="' + arrayGallery[index] + '" onchange="clickItemMenu(this)">';
		line += '<label for="' + (index + 1) + '" style="transform: rotate(-' + angle + 'deg);">' + arrayGallery[index] + '</label>';
		line += '</li>';
		document.getElementById("items").innerHTML += line;
	}

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

	setMenuGallery(currentGalleries)

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

	setMenuGallery(currentGalleries)

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

	$(".wmBox_overlay").hide();

	
	var width = $(document).width();
	var height = $(document).height();

	document.getElementById('galleries-editor').setAttribute("src", "./manage/manager.html?g=" + document.getElementById("gallery_name").innerHTML);
 	document.getElementById('galleries-editor').setAttribute("width", width);
	document.getElementById('galleries-editor').setAttribute("height", height);
	document.getElementById("galleries-editor").click();

}

/****************************************************************************** */
function getDBGalleries(galleries_name, id) {


	if (sessionStorage.getItem(galleries_name + "|0") != undefined) {
		console.log(galleries_name + " loaded!")
		return;
	}

	console.log(galleries_name + " reading...")

	try {
		var request = new XMLHttpRequest();
		request.open("GET",xxx(abc) + "/" + id + iii
		);

		var rq = null;
		request.onload = function () {
			if (request.readyState === request.DONE) {
				if (request.status === 200) {
					var jsonResponse = JSON.parse(request.responseText);

					rq = eval("jsonResponse." + galleries_name);
					//console.log(rq);
					for (i = 0; i < rq.length; i++) {
						window.sessionStorage.setItem(galleries_name + "|" + i, JSON.stringify(rq[i]));

					}
				}
			}
		};

		request.send(null);
	} catch (err) {
		console.error(err);
	}
	var obj = (window.sessionStorage.getItem(galleries_name + "|3"));
	//console.log(JSON.parse(new Object(obj)).gallery);

	//setArrayGallery(galleries_name);

}