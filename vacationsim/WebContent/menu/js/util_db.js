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

/** ************************************************************************ */
function updateDB(currentGalleries) {

	let objJSON = createRequest(currentGalleries);
	
	let id = window.sessionStorage.getItem("galleriesIds-" + currentGalleries);


	$.ajax({
		url : xxx(abc)+"/"+id + iii,
		data : objJSON,
		type : "PUT",
		contentType: "application/json;charset=utf-8",
		cache : true
	}).done(function(server_data) {
		console.log(server_data)
	}).fail(function() {
		console.log("failed")
	});	
}

function createRequest(currentGalleries){
	let index = 0;
	let json = ""; 
	let jsonRequest = "";
	while (json != null) {

		json = window.sessionStorage.getItem(currentGalleries + "|"+ (index));

		jsonRequest += json+","

		
		index++;
	}
	jsonRequest = jsonRequest.replace(",null,","");
	
	//jsonRequest = '{ "_id" : ObjectId("5bd8edd87cd59908e04f5f04"),'+
	jsonRequest = '{'+
	    '"background" : "./images/background.jpg",'+
	    '"centerimage" : "./images/earth.gif",'+
		'"'+currentGalleries+'" : [\n'+jsonRequest+'\n]}';

	//console.log(jsonRequest);

	return jsonRequest;
}
