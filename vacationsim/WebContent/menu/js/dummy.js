let arrayGallery = [];

	/************************************************************************************* */
	arrayData = [{
			data: {
				alt: "Youtube Video Paris",
				type: "youtube",
				videoid: "yERalriZLFM",
				description: "Ville de Paris"
			}
		},
		{
			data: {
				alt: "Google Maps",
				src: "https://www.parisinfo.com/var/otcp/sites/images/node_43/node_51/node_77884/node_77889/a%C3%A9roport-de-paris-charles-de-gaulle-terminal-1-vue-a%C3%A9rienne-%7C-630x405-%7C-%C2%A9-jouanneaux,-jean-marc-pour-a%C3%A9roports-de-paris/11527099-1-fre-FR/A%C3%A9roport-de-Paris-Charles-de-Gaulle-terminal-1-vue-a%C3%A9rienne-%7C-630X405-%7C-%C2%A9-JOUANNEAUX,-Jean-Marc-pour-A%C3%A9roports-de-Paris.jpg",
				image: "https://www.parisinfo.com/var/otcp/sites/images/node_43/node_51/node_77884/node_77889/a%C3%A9roport-de-paris-charles-de-gaulle-terminal-1-vue-a%C3%A9rienne-%7C-630x405-%7C-%C2%A9-jouanneaux,-jean-marc-pour-a%C3%A9roports-de-paris/11527099-1-fre-FR/A%C3%A9roport-de-Paris-Charles-de-Gaulle-terminal-1-vue-a%C3%A9rienne-%7C-630X405-%7C-%C2%A9-JOUANNEAUX,-Jean-Marc-pour-A%C3%A9roports-de-Paris.jpg",
				description: "Charles de Gaulle sur Google Maps|https://www.google.ca/maps/place/Paris-Charles+De+Gaulle/@49.0082069,2.5425443,1286m/data=!3m1!1e3!4m5!3m4!1s0x47e63e038e4ccf5b:0x42be0982f5ba62c!8m2!3d49.0096906!4d2.5479245"
			}
		}
	]
	arrayGallery["paris"] = arrayData;


for ( gallery in arrayGallery) {
	//console.log(gallery + " " + Object.keys(arrayGallery[gallery]).length);
	let line = '<div id="' + gallery + '" style="display:none; z-index:1;" >';

	for (index = 0; index < Object.keys(arrayGallery[gallery]).length; index++) {
		//console.log(arrayGallery[gallery][index].data.type);
		line += '<img alt="' + arrayGallery[gallery][index].data.alt + '"';

		if (arrayGallery[gallery][index].data.type != undefined) {
			line += ' data-type="' + arrayGallery[gallery][index].data.type + '"';
		}
		if (arrayGallery[gallery][index].data.videoid != undefined) {
			line += ' data-videoid="' + arrayGallery[gallery][index].data.videoid + '"';
		}

		if (arrayGallery[gallery][index].data.src != undefined) {
			line += ' src="' + arrayGallery[gallery][index].data.src + '"';
		}

		if (arrayGallery[gallery][index].data.image != undefined) {
			line += ' data-image="' + arrayGallery[gallery][index].data.image + '"';
		}

		if (arrayGallery[gallery][index].data.description != undefined) {
			line += ' data-description="' + arrayGallery[gallery][index].data.description + '">';
		}



	}
	line += "</div>";
	//console.log(line)
	document.getElementById("galleries").innerHTML += line;





}