(function ($) {

	var body = $('body');
	$('.toggle-menu').on("click", function (e) {
		body.toggleClass('open-menu');
		e.preventDefault();
	});

})(jQuery);
