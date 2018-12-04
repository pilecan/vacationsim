function modifyGallery(currentGalleries, currentGallery, currentSearh) {
	let key = currentGalleries + "|0";
	let obj = (window.sessionStorage.getItem(key));

	let index = 0;
	while (obj != null) {
		key = currentGalleries + "|" + index;
		obj = (window.sessionStorage.getItem(key));
		if (obj != null) {
			objJSON = JSON.parse(new Object(obj));

			if (objJSON.gallery == currentGallery) {
				if (galleryObj.media == "image") {
					objJSON.title = galleryObj.title;
					objJSON.media = galleryObj.media;
					objJSON.src = galleryObj.src;
					objJSON.description = galleryObj.description;

				} else if (galleryObj.media == "youtube") {
					objJSON.title = galleryObj.title;
					objJSON.media = galleryObj.media;
					objJSON.videoid = galleryObj.videoid;
					objJSON.description = galleryObj.description;

				}

				window.sessionStorage.setItem(key, JSON.stringify(objJSON));
				index++;

			}

		}

	}
}

function getGallery(currentGalleries, currentGallery, currentSearh) {
	let key = currentGalleries + "|0";
	let obj = (window.sessionStorage.getItem(key));

	let index = 0;
	while (obj != null) {
		key = currentGalleries + "|" + index;
		obj = (window.sessionStorage.getItem(key));
		if (obj != null) {
			objJSON = JSON.parse(new Object(obj));
			console.log(objJSON.description+" - "+currentSearh +" = "+currentSearh == objJSON.description)
			
			let desc = objJSON.description.split("|")[0]

			if (objJSON.gallery == currentGallery && (currentSearh == desc || currentSearh == objJSON.title)) {
				console.log("trouvé!")
				return objJSON;
			}

			index++;

		}

	}

	return null;
}