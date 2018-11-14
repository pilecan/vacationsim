
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
				console.log(galleriesName+"|"+index+objJSON.gallery );
				
				if (firstIndex == 0){
					firstIndex = index;
				}

				line += "<div class='group'>" +
						"<h3>"+objJSON.description.split("|")[0]+"</h3>" +
								"<div>";
			
				if (objJSON.media == "image"){
					line += "->'title: "+objJSON.description+"'<br/>";
					line += "->'media: "+objJSON.media+"'<br/>";
					line += "->'source: "+objJSON.src+"<br/>'";
					line += "->'description: "+objJSON.description+"'<br/>";
				} else {
					line += "->'title: "+objJSON.description+"'<br/>";
					line += "->'media: "+objJSON.media+"<br/>'";
					line += "->'videoid: "+objJSON.videoid+"<br/>'";
					line += "->'description: "+objJSON.description+"'<br/>";
				}
				
				line += "</div></div>";
				mapJSON[key] = objJSON;
				console.log(">>>>>>>>>>>>>>>>>>"+JSON.stringify(mapJSON[key]));
				
			}
			index++;

			
		}	

	}
	document.getElementById("accordion").innerHTML = line;

    $( '#accordion' ).accordion( "refresh" );

}

function setNewSession(){
    $( ".group" ).each(function( index ) {
    	  console.log( index + ": " + $( this ).text()+"-->"+ $( this ).text().length );
    	  key = currentGalleriesName+"|"+(index+firstIndex);
  		  //obj = (window.sessionStorage.getItem(key));
  		  //objJSON = JSON.parse(new Object(obj));
  		  //console.log(objJSON.description.split("|")[0]);
  		  
  		//var str = "the word you need is 'hello' 'hi' 'bonjour'";
  		var singleQuoted = $.map($( this ).text().split("'"), function(substr, i) {
  		   return (i % 2) ? substr : null;
  		});

  		console.log(singleQuoted.join("\n"));
  		  
  		  //window.sessionStorage.setItem(key,));

    });	
}


