(function($){
	$.wmBox = function(){
		$('body').prepend('<div class="wmBox_overlay"><div class="wmBox_centerWrap"><div class="wmBox_centerer"><div class="formBox_contentWrap"><div class="wmBox_scaleWrap"><div class="wmBox_closeBtn"><p>x</p></div>');
	};
	$('[data-form]').click(function(e){
		e.preventDefault();
		$('.wmBox_overlay').fadeIn(750);
		var mySrc = $(this).attr('data-form');
		$('.wmBox_overlay .wmBox_scaleWrap').append('<iframe src="'+mySrc+'">');
		//$("#button-sim").hide();

		console.log("------->"+mySrc);

		
		$('.wmBox_overlay iframe').click(function(e){
			e.stopPropagation();

		});
		$('.wmBox_overlay').click(function(e){
			e.preventDefault();
			$('.wmBox_overlay').fadeOut(750, function(){
				$("#button-sim").click();

				wait(500);

				$(this).find('iframe').remove();
				$("#menu_items").show();
				$("#button-sim").show();

				$("#button-sim").click();
			});
		});

	});
}(jQuery));