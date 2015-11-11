var switchModeCatcher = (function () {
	var init = _listener;

	var submit = $('#submitBtn', '.watermark-right');
	var single = 'php/toserver.php';
	var tile = 'php/tiletest.php';
	var viewMode = $('.form__view-link');

	function _listener() {
		viewMode.on('click', _setServerData);
		console.log('SWICTH MODE CATCHER');
	}

	function _setServerData() {
		var serve = $(this).find('input[type=radio]').val();
		
		$.each(viewMode, function (index, value) {
			$(value).removeClass('active');
		});

		$(this).addClass('active');

		switch(serve) {
			case 'tile':
				submit.attr('data-server', tile);
				break;
			case 'single':
				submit.attr('data-server', single);
				break;
			default:
				submit.attr('data-server', single);
			}
	}

	return {
		init: init
	}
})();

switchModeCatcher.init();