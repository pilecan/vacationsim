let currentGalleries = "";
let currentGallery = "";
let currentAccordion = "";
let modeModification = "";

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
				activate : function(event, ui) {
					currentAccordion = ui.newHeader.text();
				}
			})
			.sortable(
					{
						axis : "y",
						handle : "h3",
						stop : function(event, ui) {
							ui.item.children("h3").triggerHandler("focusout");
							setNewSession(currentGalleries, currentGallery);
							window.sessionStorage.setItem("changed", true);
							$(this).accordion("refresh");
						},
						beforeStop : function(event, ui) {
							$(this).data("lastItem", ui.item);
							var activeAccordion = $("#accordion").accordion(
									"option", "active");
							var active = $(".selector").accordion("option",
									"active");
							var text = $("#accordion h3").eq(active).text();
						},
						change : function(event, ui) {
							var activeIndex = $("#accordion").accordion(
									"option", "active");
							var hidId = $("#accordion input[type=hidden][class=HiddenId]")[activeIndex];
						}
					});
});


$(function() {
	$('#help').click(function() {
		$('#overlay').fadeIn(200, function() {
			$('#box').animate({
				'top' : '20px'
			}, 200);
		});
		return false;
	});
	$('#boxclose').click(function() {
		$('#box').animate({
			'top' : '-300px'
		}, 500, function() {
			$('#overlay').fadeOut('fast');
		});
	});

});

$(function() {
	$('#helpform').click(function() {
		$('#overlayform').fadeIn(200, function() {
			$('#boxform').animate({
				'top' : '20px'
			}, 200);
		});
		return false;
	});
	$('#boxformclose').click(function() {
		$('#boxform').animate({
			'top' : '-300px'
		}, 500, function() {
			$('#overlayform').fadeOut('fast');
		});
	});

});

$(function() {
	$('#login').click(function() {
		$('#overlayloginform').fadeIn(200, function() {
			$('#loginform').animate({
				'top' : '20px'
			}, 200);
		});
		return false;
	});
	$('#loginformclose').click(function() {
		$('#loginform').animate({
			'top' : '-480px'
		}, 500, function() {
			$('#overlayloginform').fadeOut('fast');
		});
	});

});

$(function() {
	$('#message').click(function() {
		$('#overlaymessagebox').fadeIn(200, function() {
			$('#messagebox').animate({
				'top' : '20px'
			}, 200);
		});
		return false;
	});
	$('#messageboxclose').click(function() {
		$('#messagebox').animate({
			'top' : '-300px'
		}, 500, function() {
			$('#overlaymessagebox').fadeOut('fast');
		});
	});

});

$(function() {
	$('#message').click(function() {
		$('#overlaymessagebox').fadeIn(200, function() {
			$('#messagebox').animate({
				'top' : '20px'
			}, 200);
		});
		return false;
	});
	$('#messageboxclose').click(function() {
		$('#messagebox').animate({
			'top' : '-300px'
		}, 500, function() {
			$('#overlaymessagebox').fadeOut('fast');
		});
	});

});



$(function() {
	$('#add').click(function() {
		$('#overlayaddform').fadeIn(200, function() {
			$('#addform').animate({
				'top' : '20px'
			}, 200);
		});
		return false;
	});
	$('#addformclose').click(function() {
		$('#addform').animate({
			'top' : '-400px'
		}, 500, function() {
			$('#overlayaddform').fadeOut('fast');
		});
	});

});
