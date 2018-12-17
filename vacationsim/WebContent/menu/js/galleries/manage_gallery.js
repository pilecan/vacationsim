
function saveFormGallery() {
	console.log("submit......")

	let isValid = validForm();
	if (isValid) {
		console.log("modeModification = "+modeModification)
		if (modeModification == "addGalleries"){
			addFormGalleries(currentGalleries,galleryForm);
//			console(galleriesName, currentGallery);

		} else if (modeModification == "update"){
			modifyFormGallery(currentGalleries, currentGallery, document.galleryForm, currentAccordion);
		} else if (modeModification == "add"){
			addFormGallery(currentGalleries, currentGallery, document.galleryForm);
		}
		
		setAccordionFromSession(currentGalleries, currentGallery);
		//setAccordionFromSessionCurrentGallery(currentGalleries, currentGallery);
		document.getElementById("accordion").style.display = "block";
		document.getElementById("galleryform").style.display = "none";
		document.getElementById("groupButton1").style.display = "block";
		document.getElementById("groupButton2").style.display = "none";

	}
	
	return isValid;

}

function resetFormGallery() {
	console.log("submit......")
	document.galleryForm.reset();
}

function saveGallery() {

	if (window.sessionStorage.getItem("user") == null) {
		document.getElementById("message_content").innerHTML = "Your change will not save you are not logged in!";
		$('#message').click();
	} else {
		window.parent.$("#dialog").dialog('close');

	}

}

function closeQuit() {
	window.parent.$("#dialog").dialog('close');
}

function addGallery() {
	if (window.sessionStorage.getItem("user") == null) {
		document.getElementById("message_content").innerHTML = "You cannot Add gallery you are not logged in!";
		$('#message').click();
	} else if (currentGallery == undefined){ //add galleries or topic
		document.getElementById("add").click();
	} else {
		console.log(currentAccordion + " - " + currentAccordion.length);
		document.galleryForm.reset();
		
		document.getElementById("image").style.display = "none";
		document.getElementById("youtube").style.display = "none";

		document.getElementById("groupButton1").style.display = "none";
		document.getElementById("groupButton2").style.display = "block";
		document.getElementById("accordion").style.display = "none";
		document.getElementById("galleryform").style.display = "block";
		modeModification = "add"

	}
}

function modifyGallery() {
	console.log(currentGalleries + "-" + currentGallery + " = "
			+ currentAccordion + " = " + currentAccordion.length);
	

	if (window.sessionStorage.getItem("user") == null) {
		document.getElementById("message_content").innerHTML = "You cannot Modify a gallery you are not logged in!";
		$('#message').click();
	} else {
		if (currentAccordion.length == 0) {
			document.getElementById("message_content").innerHTML = "Select and Open a Gallery to modify it!";
			$('#message').click();
		} else if (currentGallery == undefined){
			currentGalleries = jsUcfirst(currentGalleries) + "-" + currentAccordion.replace(" ","");
			window.parent.parent.document.getElementById("gallery_name").innerHTML  = currentGalleries;
		    window.parent.document.getElementById('accordionIframe').setAttribute("src", "./galleries_editor.html?g=" + currentGalleries + "-" + currentGalleries);
		    window.parent.document.getElementById("accordionIframe").click();
			window.parent.$("#dialog").dialog('option', 'title', currentGalleries);
		} else {
			modeModification = "update";
			obj = getGallery(currentGalleries, currentGallery, currentAccordion);
			document.galleryForm.description.value = obj.description.split("|")[0];
			document.galleryForm.media.value = obj.media;
			if (obj.media == "image") {
				document.galleryForm.image_url.value = obj.src;
			} else if (obj.media == "youtube") {
				document.galleryForm.youtube_id.value = obj.videoid;
			}

			showMediaTextField();
			
			if (obj.description.indexOf("\\|") != -1){
				document.galleryForm.link.value = obj.description.split("|")[1];
			}

			document.getElementById("groupButton1").style.display = "none";
			document.getElementById("groupButton2").style.display = "block";
			document.getElementById("accordion").style.display = "none";
			document.getElementById("galleryform").style.display = "block";

		}

	}

}

function cancelGallery() {
	console.log(currentAccordion + " - " + currentAccordion.length);
	modeModification = "";
	document.getElementById("groupButton1").style.display = "block";
	document.getElementById("groupButton2").style.display = "none";
	document.getElementById("accordion").style.display = "block";
	document.getElementById("galleryform").style.display = "none";
}

function deleteGallery() {
	console.log(currentAccordion + " - " + currentAccordion.length);
	if (window.sessionStorage.getItem("user") == null) {
		document.getElementById("message_content").innerHTML = "You cannot Delete a gallery you are not logged in!";
		$('#message').click();
	} else if (currentAccordion.length == 0) {
		document.getElementById("message_content").innerHTML = "Select and Open a Gallery to delete it!";
		$('#message').click();
	} else if (confirm("Do you want to delete ("+currentAccordion+")?")){
		if (currentGallery != undefined){
			modeModification = "delete";
			deleteCurrentGallery(currentGalleries, currentGallery, currentAccordion);
		} else {
			deleteCurrentGalleries(currentGalleries, currentGallery, currentAccordion)		
		}
		setAccordionFromSession(currentGalleries, currentGallery);
		document.getElementById("accordion").style.display = "block";
		document.getElementById("galleryform").style.display = "none";
		document.getElementById("groupButton1").style.display = "block";
		document.getElementById("groupButton2").style.display = "none";
	}
	
}

function resetAccordion() {
	resetSession(currentGalleries)
	let request = currentGalleries + "-" + currentGallery;
	if (currentGallery == undefined) {
		request = currentGalleries;
	}

	window.parent.document.getElementById('accordionIframe').setAttribute("src", "./galleries_editor.html?g=" + request);
	window.parent.document.getElementById("accordionIframe").click();
	modeModification = "";
	window.sessionStorage.setItem("changed", false);
}

function validForm() {

	let message = "";

	if (document.getElementById("youtube_id").value == ""
			&& document.getElementById("image_url").value == ""
			|| document.getElementById("media").value == "Select a Media") {
		message += "Select Media and Enter value in field Media or youtube.\n";
	}

	if (document.getElementById("description").value == "") {
		message += "Enter Description.";
	}

	if (message != "") {
		alert(message);
	}

	return (message == "");
}

function showMediaTextField() {
	var media = document.getElementById("media").value;
	if (media == "image") {
		document.getElementById("image").style.display = "block";
		document.getElementById("youtube").style.display = "none";
	} else if (media == "youtube") {
		document.getElementById("image").style.display = "none";
		document.getElementById("youtube").style.display = "block";
	} else if (media == "Select a Media") {
		document.getElementById("image").style.display = "none";
		document.getElementById("youtube").style.display = "none";
	}

}


function deleteCurrentGallery(currentGalleries, currentGallery, currentSearh) {
	let key = currentGalleries + "|0";
	let obj = (window.sessionStorage.getItem(key));
	let arrayJSON = [];
	let index = 0;
	let newJSON
	let indextoDell = 0;
	let isFound = false;
	while (obj != null) {
		key = currentGalleries + "|" + index;
		obj = (window.sessionStorage.getItem(key));

		if (obj != null) {
			key = currentGalleries + "|" + index;
			obj = (window.sessionStorage.getItem(key));
			objJSON = JSON.parse(new Object(obj));
		    
			let desc = objJSON.description.split("|")[0]
			arrayJSON[index] = window.sessionStorage.getItem(key);
		    window.sessionStorage.removeItem(key);

			if (objJSON.gallery == currentGallery && currentSearh == desc) {
				indextoDell = index;
				isFound = true;
				window.sessionStorage.setItem("changed", true);
			}

		}
		index++;

	}
	
	arrayJSON.splice(indextoDell, 1, );
	
	for (let k in arrayJSON) {
	    let value = arrayJSON[k];
	   // console.log(k+" - "+value)
	    window.sessionStorage.setItem(currentGalleries + "|" +k,value);
	}
	
}

function deleteCurrentGalleries(currentGalleries, currentGallery, currentSearh) {
	let key = currentGalleries + "|0";
	let obj = (window.sessionStorage.getItem(key));
	let arrayJSON = [];
	let index = 0;
	let indextoDell = 0;
	let cptDell = 0;
	
	currentSearh = currentSearh.replace(" ","");
	while (obj != null) {
		key = currentGalleries + "|" + index;
		obj = (window.sessionStorage.getItem(key));

		if (obj != null) {
			key = currentGalleries + "|" + index;
			obj = (window.sessionStorage.getItem(key));
			objJSON = JSON.parse(new Object(obj));
		    
			let desc = objJSON.description.split("|")[0]
			arrayJSON[index] = window.sessionStorage.getItem(key);
		    window.sessionStorage.removeItem(key);
		    
		    console.log("("+objJSON.gallery+")---("+currentSearh+")")
			if (currentSearh.indexOf(objJSON.gallery) != -1) {
				if (indextoDell == 0){
					indextoDell = index;
				}
				cptDell++;
			}

		}
		index++;

	}
	window.sessionStorage.setItem("changed", true);
	
	arrayJSON.splice(indextoDell, cptDell, );
	
	
	
	for (let k in arrayJSON) {
	    let value = arrayJSON[k];
	  // console.log(k+" - "+value)
	    window.sessionStorage.setItem(currentGalleries + "|" +k,value);
	}
	
    let temp = window.sessionStorage.getItem("menuGalleries-" +currentGalleries);
    window.sessionStorage.setItem("menuGalleries-" +currentGalleries,temp.replace(currentSearh+"|",""));
    
}

function modifyFormGallery(currentGalleries, currentGallery, galleryForm, currentSearh) {
	let key = currentGalleries + "|0";
	let obj = (window.sessionStorage.getItem(key));
	let isUpdate = false;
	let index = 0;
	while (obj != null) {
		key = currentGalleries + "|" + index;
		obj = (window.sessionStorage.getItem(key));

		if (obj != null) {
			key = currentGalleries + "|" + index;
			obj = (window.sessionStorage.getItem(key));
			objJSON = JSON.parse(new Object(obj));

			let desc = objJSON.description.split("|")[0]

			if (objJSON.gallery == currentGallery && currentSearh == desc) {
				objJSON = setobjJSON(objJSON, galleryForm);
				
				window.sessionStorage.setItem(key, JSON.stringify(objJSON));
				window.sessionStorage.setItem("changed", true);
				isUpdate = true;
			
			}
			index++;

		}
		

	}
	
		

}

function addFormGallery(currentGalleries, currentGallery, galleryForm) {
	let key = currentGalleries + "|0";
	let obj = (window.sessionStorage.getItem(key));
	let arrayJSON = [];
	let index = 0;
	let newJSON = {};
	let indextoAdd = 0;
	let isAdded = false;
	while (obj != null) {
		key = currentGalleries + "|" + index;
		obj = (window.sessionStorage.getItem(key));

		if (obj != null) {
			key = currentGalleries + "|" + index;
			obj = (window.sessionStorage.getItem(key));
			objJSON = JSON.parse(new Object(obj));

			arrayJSON[index] = window.sessionStorage.getItem(key);
		    window.sessionStorage.removeItem(key);
		    
			if (objJSON.gallery == currentGallery && isAdded == false ) {
				indextoAdd = index;
				newJSON = setobjJSON(objJSON, galleryForm)
				isAdded = true;
				window.sessionStorage.setItem("changed", true);
			}

		}
		index++;

	}
	
	arrayJSON.splice(indextoAdd, 0, JSON.stringify(newJSON));
	
	for (let k in arrayJSON) {
	    let value = arrayJSON[k];
	   // console.log(k+" - "+value)
	    window.sessionStorage.setItem(currentGalleries + "|" +k,value);
	}
	
}

function addFormGalleries(currentGalleries,galleryForm) {

	let key = currentGalleries + "|0";
	let obj = (window.sessionStorage.getItem(key));
	let index = 0;
	while (obj != null) {
		key = currentGalleries + "|" + index;
		obj = (window.sessionStorage.getItem(key));
		index++;
	}
	
	obj = {};
	obj.gallery = jsUcfirst(galleryForm.galleryname.value.toLowerCase()); 
	//console.log('{"gallery":"'+galleryForm.galleryname.value+'"}');

	let objJSON = JSON.parse('{"gallery":"'+obj.gallery+'"}');
	objJSON = setobjJSON(objJSON, galleryForm)
	
    window.sessionStorage.setItem(currentGalleries +"|"+(index-1) ,JSON.stringify(objJSON));
	window.sessionStorage.setItem("changed", true);
	
}

function setobjJSON(objJSON, galleryForm){
	if (galleryForm.media.value == "image") {
		objJSON.media = galleryForm.media.value;
		objJSON.src = galleryForm.image_url.value;
		objJSON.description = galleryForm.description.value;
		if (galleryForm.link.value != "") {
			objJSON.description += "|" + galleryForm.link.value;
		}

	} else if (galleryForm.media.value == "youtube") {
		objJSON.media = galleryForm.media.value;
		objJSON.videoid = galleryForm.youtube_id.value;
		objJSON.description = galleryForm.description.value;
		if (galleryForm.link.value != "") {
			objJSON.description += "|" + galleryForm.link.value;
		}
	}
	
	return objJSON;
	
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
			console.log(objJSON.description + " - " + currentSearh + " = "
					+ currentSearh == objJSON.description)

			let desc = objJSON.description.split("|")[0]

			if (objJSON.gallery == currentGallery
					&& currentSearh == desc) {
				return objJSON;
			}

			index++;

		}

	}

	return null;
}

function validUser(loginform) {
	return getUserQ(loginform.username.value, loginform.password.value).then(
			processUserResponse, errorHandler);
}

function processUserResponse(responseText) {
	let obj = new Object(JSON.parse(responseText));

	if (obj[0] == undefined
			|| md5(document.loginform.password.value) != obj[0].password) {
		console.log("invalid user name or password");
		document.getElementById("message_content").innerHTML = "Invalid username or password";
		// $('#message').click();
		// wait(1000);
		// window.parent.$("#dialog").dialog('close');
		// return true;
	} else if (obj[0].password == md5(document.loginform.password.value)) {
		alert("Welcome Again " + obj[0].username)
		window.sessionStorage.setItem("user", obj[0].username);
		window.parent.document.getElementById("userlog").innerHTML = obj[0].username;

		return true;

		// window.parent.$("#dialog").dialog('close');
	}

}

function errorHandler(statusCode) {
	console.log("failed with status", status);
}

function closeLogin(){
	document.getElementById("overlayloginform").style.display = "none";
	document.getElementById("loginform").style.display = "none";
	 $("#button-sim", window.parent.document).click();
     $("#button-sim", window.parent.document).click();

     $("#menu_items", window.parent.document).show();

     $("#btn-prev", window.parent.document).show();
     $("#btn-edit", window.parent.document).show();
     $("#btn-next", window.parent.document).show();
     
	window.parent.document.getElementById("gallery_name").innerHTML=jsUcfirst(window.sessionStorage.getItem("currentGalleries"));

}
function closeAdd(){
	document.getElementById("overlayaddform").style.display = "none";
	document.getElementById("addform").style.display = "none";
}

function selectAdd(){
	//$('#message').click();


	//alert(document.getElementById("topic").checked)

/*    if (document.getElementById("gallery").checked == true){
    	alert("document.getElementById("top").checked")
    	//addGallery();
    };
*/	
}
