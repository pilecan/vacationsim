let firstIndex = 0;
let objJSON = null;


/**************************************************************************************/	
function setAccordionFromSession(galleriesName, currentGallery) {
	
	let key = galleriesName + "|0";
	let obj = (window.sessionStorage.getItem(key));

	let index = 0;
	while (obj != null && obj != undefined) {
		window.sessionStorage.setItem("temp|"+index,obj);
		index++;
		key = galleriesName + "|" + index;
		obj = (window.sessionStorage.getItem(key));
	}
	
	obj = window.sessionStorage.getItem("menuGalleries-"+galleriesName);
	window.sessionStorage.setItem("temp-"+galleriesName,obj);
	
	if (currentGallery != undefined){
		setAccordionFromSessionCurrentGallery(galleriesName, currentGallery);
	} else {
	   setAccordionFromSessionGalleries(galleriesName); 

	}
	
}
	
/**************************************************************************************/	
function setAccordionFromSessionGalleries(galleriesName ) {
	
	let arrayGalleries = [];

	let key = galleriesName + "|0";
	let obj = (window.sessionStorage.getItem(key));

	let index = 0;
	while (obj != null && obj != undefined) {
		key = galleriesName + "|" + index;
		obj = (window.sessionStorage.getItem(key));
		if (obj != null) {
			objJSON = JSON.parse(new Object(obj));
			
			//console.log(objJSON);
			if (arrayGalleries[objJSON.gallery] != undefined){
			    arrayGalleries[objJSON.gallery] += objJSON.description.split("[[")[0]+"<br>";
				
			} else {
			    arrayGalleries[objJSON.gallery] = objJSON.description.split("[[")[0]+"<br>";

			}

		}
		index++;


	}
	//document.getElementById("accordion").innerHTML = line;

	let line = "";
	for (gallery in arrayGalleries){
		//console.log(gallery+" -> "+arrayGalleries[gallery])
		line += "<div class='group'><h3><span style='margin-left:30px'>" + gallery
			+ "</span></h3><div id='contain' onclick=\"modifyGallery()\">"+arrayGalleries[gallery]+"</div></div>";
	}

	document.getElementById("accordion").innerHTML = line;
		
	$('#accordion').accordion("refresh");
	
}


/**************************************************************************************/	
function setAccordionFromSessionCurrentGallery(galleriesName, currentGallery) {
	let line = "";

	let key = galleriesName + "|0";
	let obj = (window.sessionStorage.getItem(key));

	firstIndex = 0;

	let index = 0;
	while (obj != null) {
		key = galleriesName + "|" + index;
		obj = (window.sessionStorage.getItem(key));
		if (obj != null && obj != "undefined") {
			objJSON = JSON.parse(new Object(obj));

			if (objJSON.gallery == currentGallery) {

				if (firstIndex == 0) {
					firstIndex = index;
				}
				
				line = setLine(line, objJSON) ;

			}
			index++;

		}

	}
	document.getElementById("accordion").innerHTML = line;
	

	$('#accordion').accordion("refresh");

}

/**************************************************************************************/	
function setLine(line, objJSON) {
	line += "<div class='group'><h3><span style='margin-left:30px'>"+objJSON.description.split("[[")[0]
			+ "</span></h3><div>";

	let desclink = objJSON.description.split("[[");
	// caractere alt+255 comme séparateur
	if (objJSON.media == "image") {
		line += " <div id='contain' onclick=\"modifyGallery()\"><span style='white-space: nowrap;'>Description: "+ desclink[0] + " </span><br>";
		line += " Media: " + objJSON.media + " <br>";
		line += " <span style='white-space: nowrap;'>Src: " + objJSON.src
				+ " </span><br>";
		if (desclink[1] != undefined && desclink[1] != "undefined" && desclink[1] != ""){
			line += " <span style='white-space: nowrap;'>Link: " + desclink[1]
			+ " </span><br>";
		} else {
			line += " <span style='white-space: nowrap;'>Link: No link "

		}
		line += "</div>"
	} else {
		line += " <div id='contain' onclick=\"modifyGallery()\"><span style='white-space: nowrap;'>Description: "+ desclink[0] + " </span><br>";		
		line += " Media: " + objJSON.media + " <br>";
		line += " Videoid: " + objJSON.videoid + " <br>";
		if (desclink[1] != undefined && desclink[1] != "undefined" && desclink[1] != ""){
			line += " <span style='white-space: nowrap;'>Link: " + desclink[1]
			+ " </span><br>";
		} else {
			line += " <span style='white-space: nowrap;'>Link: No link "

		}
		line += "</div>"
	}

	line += "</div></div>";
	
	return line;

}

/**************************************************************************************/	
function setNewSession(currentGalleries, currentGallery) {
	if (currentGallery != undefined){
		setNewSessionGallery(currentGalleries, currentGallery);
	} else {
		setNewSessionGalleries(currentGalleries); 
	}	


}

/**************************************************************************************/	
function setNewSessionGallery(currentGalleries, currentGallery) {
	$(".group").each(function(index) {
				// console.log( index + ": " + $( this ).html());
				key = currentGalleries + "|" + (index + firstIndex);

				let obj = new Object();
				obj.gallery = currentGallery;
				//alt 255 for spance
				var singleQuoted = $.map($(this).text().split(" "), function(substr, i) {
					//console.log(substr)
					if (substr.indexOf(": ") != -1) {
						let line = substr.split(": ");
						try {
							eval("obj." + line[0].toLowerCase() + "='" + line[1] + "'");
						} catch (err) {
							//console.log(err);
						}
					}
					return (i % 2) ? substr : null;
				});

				obj.gallery = currentGallery;
				if (obj.link != "undefined" && obj.link != "No link") {
					obj.description = obj.description + "[[" + obj.link
				}

				delete obj.title;
				delete obj.link;
				//
				objJSON = JSON.stringify(obj);
				//console.log(objJSON);

				window.sessionStorage.setItem(key, objJSON);

			});


}


/**************************************************************************************/	
function setNewSessionGalleries(currentGalleries) {
 
	 let elements = document.querySelectorAll('#accordion > div > h3');
	 let arrayGalleries = [];

	  for (let element of elements) {
		//console.log(element.innerText);
	    let index = 0;
	    let value = "";
	    let isFinish = false;
	    while (isFinish == false){
	    	value = window.sessionStorage.getItem(currentGalleries+"|"+index);
	    	if (value != null) {
				objJSON = JSON.parse(new Object(value));

		    	//console.log(">"+objJSON.gallery);
		    	
		    	
		    	if (objJSON.gallery == element.innerText){
		    		if (arrayGalleries[objJSON.gallery] != undefined){
			    		arrayGalleries[objJSON.gallery] += value+"____";
						
					} else {
			    		arrayGalleries[objJSON.gallery] = value+"____";
					}
		    	}

	    	} else {
	    		isFinish = true;
	    	}
	    	index++;
	    	
	    }
	  }
	  
	  window.sessionStorage.setItem("menuGalleries-"+currentGalleries,"");
	  let galleries_line = "";
	  index = 0
	  for (let element of elements) {
		  
		//  console.log(element.innerText);

		  galleries_line += element.innerText+"|";
		  let work = arrayGalleries[element.innerText];
		  if (work != undefined){
		      values = work.split("____");
		      for (let i=0;i<values.length-1;i++){
				    window.sessionStorage.setItem(currentGalleries+"|"+index,values[i]);
				    index++;
		      }
		  }
		
	  }
	  window.sessionStorage.setItem("menuGalleries-"+currentGalleries,galleries_line+"All");
	  
	 // setMenuGallery(currentGalleries);
}

function resetSession(currentGalleries){
	let obj = (window.sessionStorage.getItem("temp|0"));
	let index = 0;
	while (obj != null && obj != undefined) {
		window.sessionStorage.setItem(currentGalleries+"|"+index,obj);
		index++;
		obj = window.sessionStorage.getItem("temp|"+index);
	}	
	

}
