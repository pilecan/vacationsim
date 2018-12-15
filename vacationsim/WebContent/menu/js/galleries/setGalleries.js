
function setGalleryFromSession(){

	galleries_name = window.sessionStorage.getItem("currentGalleries");
	let arrayData = [];

	let key = galleries_name+"|0";
	let obj = (window.sessionStorage.getItem(key));

	objJSON = JSON.parse(new Object(obj));
	let lastGalleries = objJSON.gallery;

	let isFinish = false;
	let x= 0;
	while (isFinish == false) {
		key = galleries_name+"|"+x;
		obj = (window.sessionStorage.getItem(key));
		//console.log(obj)
		var data = new Object();
		if (obj == undefined){
			arrayGallery[lastGalleries] = arrayData;
			isFinish = true;
		} else {
			objJSON = JSON.parse(new Object(obj));
			if (lastGalleries != objJSON.gallery){
				arrayGallery[lastGalleries] = arrayData;
				lastGalleries = objJSON.gallery;
				arrayData = [];
			}
			//console.log(objJSON.gallery); 
			if (objJSON.media == "image"){
				data = new Object();
				data.image = objJSON.src;
				data.src = objJSON.src;
				data.description = objJSON.description;
				data.alt = objJSON.description;
				arrayData.push(data);
			} else {
				data = new Object();
				data.type = objJSON.media;
				data.videoid = objJSON.videoid;
				data.description = objJSON.description;
				data.alt = objJSON.description;
				arrayData.push(data);
			}
		}
		x++;
	}

}



function setGalleryDOMbyGroup(isGroup) {
	let line = "";
	if (isGroup == false){
		line = '<div id="All" style="display:none; z-index:1;" >';
	}


	for (gallery in arrayGallery) {
		//console.log(gallery + " " + Object.keys(arrayGallery[gallery]).length);
		if (isGroup){
			line = '<div id="' + gallery.replace(/ /g, '') + '" style="display:none; z-index:1;" >';
		}

		for (index = 0; index < arrayGallery[gallery].length; index++) {
			if (arrayGallery[gallery][index].alt != undefined){
				line += '<img alt="' + arrayGallery[gallery][index].alt + '"';
			}
			if (arrayGallery[gallery][index].type != undefined) {
				line += ' data-type="' + arrayGallery[gallery][index].type + '"';
			}
			if (arrayGallery[gallery][index].videoid != undefined) {
				line += ' data-videoid="' + arrayGallery[gallery][index].videoid + '"';
			}

			if (arrayGallery[gallery][index].src != undefined) {
				line += ' src="' + arrayGallery[gallery][index].src + '"';
			}

			if (arrayGallery[gallery][index].image != undefined) {
				line += ' data-image="' + arrayGallery[gallery][index].image + '"';
			}

			if (arrayGallery[gallery][index].description != undefined) {
				line += ' data-description="' + arrayGallery[gallery][index].description + '">';
			}
		}

		if (isGroup){
			line += "</div>";
			document.getElementById("galleries").innerHTML += line;
		}
	}
	if (isGroup == false){
		line += "</div>";
		document.getElementById("galleries").innerHTML += line;
		//console.log("]");
	}



}
//console.log(">>>>>>>>"+lastGalleries)
	setGalleryFromSession();
	setGalleryDOMbyGroup(true);
	setGalleryDOMbyGroup(false);
