
function setAccordionFromSession(galleriesName, CurrentGallery){

	let arrayData = [];
	let line = "";

	let key = galleriesName+"|0";
	let obj = (window.sessionStorage.getItem(key));

	let objJSON = JSON.parse(new Object(obj));

	//document.getElementById("accordion").innerHTML = "";

	let isFinish = false;
	let index= 0;
	while (obj != null) {
		key = galleriesName+"|"+index;
		obj = (window.sessionStorage.getItem(key));
		if (obj != null){
			objJSON = JSON.parse(new Object(obj));
			
			if (objJSON.gallery == CurrentGallery){
				console.log(galleriesName+"|"+index+objJSON.gallery );
				line += "<div class='group'>" +
						"<h3>"+objJSON.description.split("|")[0]+"</h3>" +
								"<div>";
			
				if (objJSON.media == "image"){
					data = new Object();
					line += "title: "+objJSON.description+"<br/>";
					line += "media: "+objJSON.media+"<br/>";
					line += "source: "+objJSON.src+"<br/>";
					line += "description: "+objJSON.description+"<br/>";
				} else {
					line += "title: "+objJSON.description+"<br/>";
					line += "media: "+objJSON.media+"<br/>";
					line += "videoid: "+objJSON.videoid+"<br/>";
					line += "description: "+objJSON.description+"<br/>";
				}
				
				line += "</div></div>";
			}
			index++;

			
		}	

	}
	document.getElementById("accordion").innerHTML = line;

    $( '#accordion' ).accordion( "refresh" );

}
