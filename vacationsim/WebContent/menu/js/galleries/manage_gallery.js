let currentGalleries = "";
let currentGallery = "";
let currentAccorion = "";

	
	$(function() {
		$("#accordion")

		.accordion({
			header : "> div > h3",
			collapsible : true,
			active : false,
			autoHeight : true,
			heightStyle : "content",

		})
		.accordion({ 
			activate: function(event, ui) {
				currentAccorion = ui.newHeader.text();
			}
		}).sortable({
			axis : "y",
			handle : "h3",
			stop : function(event, ui) {
				ui.item.children("h3").triggerHandler("focusout");
				setNewSession(currentGalleries, currentGallery);
				window.sessionStorage.setItem("changed",true);
				$(this).accordion("refresh");
			},
			beforeStop : function(event, ui) {
				 $(this).data("lastItem", ui.item);
				    var activeAccordion=$( "#accordion" ).accordion( "option", "active" );
				    var active = $( ".selector" ).accordion( "option", "active" );
				    var text= $("#accordion h3").eq(active).text();
			},
			change: function (event, ui) {
	             var activeIndex = $("#accordion").accordion("option", "active");
	                var hidId = $("#accordion input[type=hidden][class=HiddenId]")[activeIndex];
	       }
		});
	});
	
	$(function() {
	    $('#help').click(function(){
	        $('#overlay').fadeIn(200,function(){
	            $('#box').animate({'top':'20px'},200);
	        });
	        return false;
	    });
	    $('#boxclose').click(function(){
	        $('#box').animate({'top':'-300px'},500,function(){
	            $('#overlay').fadeOut('fast');
	        });
	    });
	 
	});

	$(function() {
	    $('#helpform').click(function(){
	        $('#overlayform').fadeIn(200,function(){
	            $('#boxform').animate({'top':'20px'},200);
	        });
	        return false;
	    });
	    $('#boxformclose').click(function(){
	        $('#boxform').animate({'top':'-300px'},500,function(){
	            $('#overlayform').fadeOut('fast');
	        });
	    });
	 
	});

	
	
	function saveFormGallery(){
		console.log("submit......")
		console.log("title ->"+document.galleryForm.title.value)

		let isValid = validForm();
 		if (isValid){
	  		modifyFormGallery(currentGalleries, currentGallery, document.galleryForm, currentAccorion);
	  		setAccordionFromSessionCurrentGallery(currentGalleries, currentGallery);
			document.getElementById("accordion").style.display = "block";
	  		document.getElementById("galleryPopup").style.display = "none";
	 		document.getElementById("groupButton1").style.display = "block";
	  		document.getElementById("groupButton2").style.display = "none";
		}
		
 
 		return isValid;
		
	}
	
	function resetFormGallery(){
		console.log("submit......")
		document.galleryForm.reset();
	}
	
	function saveGallery(){
		window.parent.$("#dialog").dialog('close');
		
	}

	function closeQuit(){
		window.parent.$("#dialog").dialog('close');
	}

	function addGallery(){
		console.log(currentAccorion+" - "+currentAccorion.length);
		document.galleryForm.reset();

		document.getElementById("groupButton1").style.display = "none";
  		document.getElementById("groupButton2").style.display = "block";
		document.getElementById("accordion").style.display = "none";
  		document.getElementById("galleryPopup").style.display = "block";
	}

	function modifyGallery(){
		console.log(currentGalleries+"-"+currentGallery+" = "+currentAccorion+" = "+currentAccorion.length);
		if (currentAccorion.length != 0){
			obj = getGallery(currentGalleries,currentGallery,currentAccorion);
			console.log(obj);
			document.galleryForm.title.value = obj.description.split("|")[0];
			document.galleryForm.description.value = obj.description.split("|")[0];
			document.galleryForm.media.value = obj.media;
			if (obj.media == "image"){
				document.galleryForm.image_text.value = obj.src;
				
			} else if (obj.media == "youtube"){
				document.galleryForm.youtube_text.value = obj.videoid;
			}
			
			showField();
			document.galleryForm.link.value = obj.description.split("|")[1];
			
			document.getElementById("groupButton1").style.display = "none";
	  		document.getElementById("groupButton2").style.display = "block";
			document.getElementById("accordion").style.display = "none";
	  		document.getElementById("galleryPopup").style.display = "block";
			
		}
		
	}
	
	function cancelGallery(){
		console.log(currentAccorion+" - "+currentAccorion.length);
 		document.getElementById("groupButton1").style.display = "block";
  		document.getElementById("groupButton2").style.display = "none";
		document.getElementById("accordion").style.display = "block";
  		document.getElementById("galleryPopup").style.display = "none";
	}

	
	function deleteGallery(){
		console.log(currentAccorion+" - "+currentAccorion.length);
	}
	
	function resetAccordion(){
		resetSession(currentGalleries)
		let request = currentGalleries+"-"+currentGallery;
		if (currentGallery == undefined ){
			request = currentGalleries;
		} 

		window.parent.document.getElementById('accordionIframe').setAttribute("src", "./galleries_editor.html?g=" + request);
		window.parent.document.getElementById("accordionIframe").click();
		
	    window.sessionStorage.setItem("changed",false);
	}
	
	function validForm(){
		
		let message = "";

		if (document.getElementById("title").value == "" ){
			message += "Enter Title.\n";
		}
		
		if (document.getElementById("youtube_text").value == "" 
		&& document.getElementById("image_text").value == "" 
		|| document.getElementById("media").value == "Select a Media"){
			message += "Select Media and Enter value in field Media or youtube.\n";
		}

		if (document.getElementById("description").value == "" ){
			message += "Enter Description.";
		}
		
		if (message != ""){
			alert(message);
		}
		
		return (message == "");
	}

	function showField(){
	  	var media = document.getElementById("media").value;
	  	if (media == "image"){
	  		document.getElementById("image").style.display = "block";
	  		document.getElementById("youtube").style.display = "none";
		} else if (media == "youtube"){
	  		document.getElementById("image").style.display = "none";
	  		document.getElementById("youtube").style.display = "block";
		} else if (media == "Select a Media"){
	  		document.getElementById("image").style.display = "none";
	  		document.getElementById("youtube").style.display = "none";
	  	}
		
	}

function modifyFormGallery(currentGalleries, currentGallery, galleryForm, currentSearh) {
	let key = currentGalleries + "|0";
	let obj = (window.sessionStorage.getItem(key));

	let index = 0;
	while (obj != null) {
		key = currentGalleries + "|" + index;
		obj = (window.sessionStorage.getItem(key));
		
		if (obj != null) {
			key = currentGalleries + "|" + index;
			obj = (window.sessionStorage.getItem(key));
			objJSON = JSON.parse(new Object(obj));
			
			let desc = objJSON.description.split("|")[0]

			if (objJSON.gallery == currentGallery && (currentSearh == desc || currentSearh == objJSON.title)) {
				if (galleryForm.media.value == "image") {
					objJSON.title = galleryForm.title.value;
					objJSON.media = galleryForm.media.value;
					objJSON.src = galleryForm.image_text.value;
					objJSON.description = galleryForm.description.value;
					if (galleryForm.link.value != ""){
						objJSON.description += "|"+galleryForm.link.value;
					}
					

				} else if (galleryForm.media.value == "youtube") {
					objJSON.title = galleryForm.title.value;
					objJSON.media = galleryForm.media.value;
					objJSON.videoid = galleryForm.youtube_text.value;
					objJSON.description = galleryForm.description.value;
					if (galleryForm.link.value != ""){
						objJSON.description += "|"+galleryForm.link.value;
					}

				}

				window.sessionStorage.setItem(key, JSON.stringify(objJSON));
				window.sessionStorage.setItem("changed",true);


			}
			index++;


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
				return objJSON;
			}

			index++;

		}

	}

	return null;
}

function validUser(loginForm){
	 getUserQ(loginForm.username.value,loginForm.password.value).then(processUserResponse,errorHandler);
}

function processUserResponse(responseText){
	let obj = new Object(JSON.parse(responseText));

  	if (obj[0] == undefined || md5(document.loginForm.password.value) != obj[0].password){
  		alert("invalid user name or password");
 	   window.parent.$("#dialog").dialog('close');
  		

  	} else if (obj[0].password == md5(document.loginForm.password.value)) {
  		alert("Welcome again "+obj[0].username)
        window.sessionStorage.setItem("user",obj[0].username);
  	  window.parent.parent.document.getElementById("userlog").innerHTML = obj[0].username;
  		window.parent.$("#dialog").dialog('close');
  	}
  	
}

function errorHandler(statusCode){
	console.log("failed with status", status);
}
	
