/****************************************************************************** */
function getDBGalleries(galleries_name, id) {

	if (sessionStorage.getItem(galleries_name + "|0") != undefined) {
		console.log(galleries_name + " loaded!")
		return;
	}

	console.log(galleries_name + " reading...")

	try {
		var request = new XMLHttpRequest();
		request.open("GET",xxx(abc) + "/" + id + xxx1(aaa)+iii,false
		);

		var rq = null;
		request.onload = function () {
			if (request.readyState === request.DONE) {
				if (request.status === 200) {
					var jsonResponse = JSON.parse(request.responseText);

					rq = eval("jsonResponse." + galleries_name);
					for (i = 0; i < rq.length; i++) {
						//console.log(rq[i].description);
						if (rq[i].description != undefined){
							window.sessionStorage.setItem(galleries_name + "|" + i, JSON.stringify(rq[i]));
						}
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
		url : xxx(abc)+"/"+id + xxx1(aaa)+iii,
		data : objJSON,
		type : "PUT",
		contentType: "application/json;charset=utf-8",
		cache : true
	}).done(function(server_data) {
		//console.log(server_data)
		console.log("done :)")
	}).fail(function() {
		console.log("failed :(")
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
	
	jsonRequest = '{'+
	    '"background" : "'+window.sessionStorage.getItem("background-"+currentGalleries)+'",'+
	    '"centerimage" : "'+window.sessionStorage.getItem("centerimage-"+currentGalleries)+'",'+
		'"'+currentGalleries+'" : [\n'+jsonRequest+'\n]}';

	//console.log(jsonRequest);

	return jsonRequest;
}


async function checkUserValid(user,psw,callback){
	let url = xxx(def)+xxx1(aaa)+iii+"&q={\'username\':\'"+user+"\'}";
	 $.ajax({
	    url : url,
	    method : "GET",
		contentType: "application/json;charset=utf-8"
	}).done(function(server_data) {
		callback(server_data)
		//console.log("done :)")
	}).fail(function() {
		callback("failed :(")
	});	
}

function getUser(user,psw){
	  return new Promise(async function(resolve, reject) {
        console.log("User = "+user+" - "+psw);
        var request = new XMLHttpRequest();
        request.open("GET",
        	  xxx(def)+xxx1(aaa)+iii+"&q={\'username\':\'"+user+"\'}",false
        );
        var rq = null;
        request.onload = function () {
        	//let isValid = false;

            if (request.readyState === request.DONE) {
                if (request.status === 200) {
                    let jsonResponse = JSON.parse(request.responseText);

                    let obj = new Object(jsonResponse);
                    console.log("User = "+request.responseText);
                    console.log("password = "+obj[0].password+" = "+md5(psw)+" "+(obj[0].password == md5(psw)));
                    resolve(obj[0].password == md5(psw));
              }
                
            }
        }

        request.send(null);
   

	  });	
}

function getUserQ(user,psw){
	 var response = Q.defer();
	    var request = new XMLHttpRequest();
	    request.open("GET", xxx(def)+xxx1(aaa)+iii+"&q={\'username\':\'"+user+"\'}", false);
	    request.onreadystatechange = function () {
	        if (request.readyState === 4) {
	            if (request.status === 200) {
	                response.resolve(request.responseText);
                   // console.log("User = "+request.responseText);
	            } else {
	                response.reject("HTTP " + request.status + " for url");
	            }   
	        }
	    };
	   setTimeout(response.reject, 2000);
	    request.send('');
	    return response.promise;	
}

