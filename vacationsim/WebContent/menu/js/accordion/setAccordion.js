
let firstIndex = 0;
let objJSON = null;
let mapJSON = [];
let currentGalleriesName = null;

function setAccordionFromSession(galleriesName, currentGallery){
	currentGalleriesName = galleriesName;

	let line = "";

	let key = galleriesName+"|0";
	let obj = (window.sessionStorage.getItem(key));

	objJSON = JSON.parse(new Object(obj));
	
	 firstIndex = 0;

	//document.getElementById("accordion").innerHTML = "";

	let isFinish = false;
	let index= 0;
	while (obj != null) {
		key = galleriesName+"|"+index;
		obj = (window.sessionStorage.getItem(key));
		if (obj != null){
			objJSON = JSON.parse(new Object(obj));
			
			if (objJSON.gallery == currentGallery){
				console.log(galleriesName+"|"+index+" "+JSON.stringify(objJSON) );
				
				if (firstIndex == 0){
					firstIndex = index;
				}

				line += "<div class='group'>" +
						"<h3>"+objJSON.description.split("|")[0]+"</h3>" +
								"<div>";
			
				
				let desclink = objJSON.description.split("|");
				// caractere alt+255 comme séparateur
				if (objJSON.media == "image"){
					line += " title: "+desclink[0]+" <br>";
					line += " media: "+objJSON.media+" <br>";
					line += " <span style='white-space: nowrap;'>src: "+objJSON.src+" </span><br>";
					line += " <span style='white-space: nowrap;'>description: "+desclink[0]+" </span><br>";
					line += " <span style='white-space: nowrap;'>link: "+desclink[1]+" </span><br>";
				} else {
					line += " title: "+desclink[0]+" <br>";
					line += " media: "+objJSON.media+" <br>";
					line += " videoid: "+objJSON.videoid+" <br>";
					line += " <span style='white-space: nowrap;'>description: "+desclink[0]+" </span><br>";
					line += " <span style='white-space: nowrap;'>link: "+desclink[1]+" </span><br>";
				}
				
				line += "</div></div>";
				mapJSON[key] = objJSON;
				//console.log(">>>>>>>>>>>>>>>>>>"+JSON.stringify(mapJSON[key]));
				
			}
			index++;

			
		}	

	}
	document.getElementById("accordion").innerHTML = line;
	var singleQuoted = $.map($( this ).text().split("<br>"), function(substr, i) {
		   return (i % 2) ? substr : null;
		});


    $( '#accordion' ).accordion( "refresh" );

}

function setNewSession(currentGalleries, currentGallery){
    $( ".group" ).each(function( index ) {
    	 // console.log( index + ": " + $( this ).html());
    	  key = currentGalleries+"|"+(index+firstIndex);
      	  
    	let obj = new Object();
		obj.gallery = currentGallery;
  		var singleQuoted = $.map($( this ).text().split(" "), function(substr, i) {
  			//console.log(substr)
  			if (substr.indexOf(": ") != -1){
  				let line = substr.split(": ");
  	  			eval("obj."+line[0]+"='"+line[1]+"'" );
  			}
  		   return (i % 2) ? substr : null;
  		});
  		
		obj.gallery = currentGallery;
		if (obj.link != "undefined"){
			obj.description = obj.description+"|"+obj.link
		}
		
		delete obj.title;
		delete obj.link;
//
  		objJSON = JSON.stringify(obj);
  		console.log(objJSON);
  		
  		
         window.sessionStorage.setItem(key,objJSON);

    });	
}


