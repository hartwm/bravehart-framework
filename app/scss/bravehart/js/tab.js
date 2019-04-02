(function ($) {

	var tabList = $('.tab-list a[href*="#"]');
	var tabContent = $('.tab');

	tabContent.removeClass('active');
	tabContent.first().addClass('active');
	tabList.removeClass('active');
	tabList.first().addClass('active');

	tabList.click(function (e) {
		var target = this.hash;
		tabList.removeClass('active');
		$(this).addClass('active');
		tabContent.removeClass('active');
		$(target).addClass('active');
		$('html, body').animate({
			scrollTop: $(target).offset().top - 100
		}, 1000);
		e.preventDefault();
	});


})(jQuery);
