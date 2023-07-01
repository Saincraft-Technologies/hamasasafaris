(function ($) {

	"use strict";

	var fullHeight = function () {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function () {
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	$('#sidebarCollapse').on('click', function () {
		$('#sidebar').toggleClass('active');
	});
	var loadPage = (route) => {
		console.log(route);
		$.ajax({
			method: 'GET',
			url: route,
			success: (response) => {
				$('.mainContent').html('');
				$('.mainContent').html(response);
			}
		})
	}
})(jQuery);
