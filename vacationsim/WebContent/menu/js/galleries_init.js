	let menuGalleries = [];
	let titleGalleries = Array();
	let backgroundImage = [];
	let centerImage = [];
	let currentGalleriesNumber = 0;
	let galleriesIds = [];
	
	if (window.sessionStorage.getItem("user") == null){
		window.sessionStorage.setItem("user","sim");
	}

	
	function getDBinfo(onBefore, onAfter) {

		if (onBefore) {
			onBefore();
		}
		//wait(2000);


		if (onAfter) {
			onAfter();
		}
	}
	
	// On appel la fonction
	getDBinfo(
		function () {
			console.log("init ---->"+window.sessionStorage.getItem("currentGalleries"));
			if (window.sessionStorage.getItem("currentGalleries") == null){
				callBD();
				//wait(100);
			}

		},
		function () {
			setData();

		}
	);

	function callBD() {
		let request = new XMLHttpRequest();
		try {
			var rw = "";
			request.open("GET",
				xxx(abc)+window.sessionStorage.getItem("user")+ "collection/"+xxx1(aaa)+iii,false
			);

			request.onload = function () {
				if (request.readyState === request.DONE) {
					if (request.readyState === 4) {

						if (request.status === 200) {
							var jsonResponse = JSON.parse(request.responseText);

							let galArray = [];
							let bgImage = [];
							let ctImage = [];
							let galIds = [];
							let gallery_group = [];
							let error = false;
							let values = [];

							let galleries_name = "";
							rq = eval("jsonResponse");
							//console.log(rq.length);
							for (i = 0; i < jsonResponse.length; i++) {

								var array = JSON.stringify(jsonResponse[i]).split(",");
								galleries_name = array[3].substring(1, array[3].indexOf(":") - 1);

							//	console.log("---------------------------------------------")
							//	console.log("user -->"+window.sessionStorage.getItem("user"));
								
								window.sessionStorage.setItem("currentGalleries",galleries_name);

								rq = eval("jsonResponse[" + i + "].background");
								bgImage[galleries_name] = rq;
								window.sessionStorage.setItem("background-" + galleries_name, rq);

								//console.log(rq)

								rq = eval("jsonResponse[" + i + "].centerimage");
								//console.log(rq)
								//ctImage[galleries_name] = rq;
								window.sessionStorage.setItem("centerimage-" + galleries_name, rq);


								rq = eval("jsonResponse[" + i + "]._id");
								id = JSON.stringify(jsonResponse[i]._id);
								id = id.substring(id.indexOf(":") + 2, id.indexOf("}") - 1);
								//galIds[galleries_name] = id;
								window.sessionStorage.setItem("galleriesIds-" + galleries_name, id);

								//console.log(id)

								rq = eval("jsonResponse[" + i + "]." + galleries_name);

								//console.log(rq.length);
								for (j = 0; j < rq.length; j++) {
									gallery_group[rq[j].gallery] = rq[j].gallery;
								}

								//console.log(Object.keys(gallery_group));
								for (j = 0; j < Object.keys(gallery_group).length; j++) {
									galArray[galleries_name] += jsUcfirst(Object.keys(gallery_group)[j] + "|");
								}

								galArray[galleries_name] += "All";
								galArray[galleries_name] = galArray[galleries_name].replace("undefined", "");
								window.sessionStorage.setItem("menuGalleries-" + galleries_name, galArray[galleries_name]);

								//console.log(galArray[galleries_name]);
								gallery_group = [];
							}
							
							window.sessionStorage.setItem("changed",false);
							//console.log("---------------------------------------------")
						}
					}

				} else {
					error = true;
				}
			};

			request.send(null);

		} catch (err) {
			//console.error(" Error = "+err.message);
		}


	}

	function setData() {
		var arrayOfKeys = Object.keys(sessionStorage);

		//	console.log("=====" + arrayOfKeys);
		let name = "";

		for (i in arrayOfKeys) {
			let key = sessionStorage.key(i);
			//console.log(key)

			if (key.indexOf("menuGalleries") != -1) {
				name = key.split("-");
				menuGalleries[name[1]] = window.sessionStorage.getItem(key);

			} else if (key.indexOf("background") != -1) {
				name = key.split("-");
				backgroundImage[name[1]] = window.sessionStorage.getItem(key);

			} else if (key.indexOf("galleriesIds") != -1) {
				name = key.split("-");
				galleriesIds[name[1]] = window.sessionStorage.getItem(key);
			} else if (key.indexOf("centerimage") != -1) {
				name = key.split("-");
				centerImage[name[1]] = window.sessionStorage.getItem(key);
			}
		}


		titleGalleries = Object.keys(menuGalleries);
	}

	