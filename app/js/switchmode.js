var switchModeCatcher = (function () {
	var init = _listener;

	var submit = $('#submitBtn', '.watermark-right');
	var single = 'php/toserver.php';
	var tile = 'php/tiletest.php';

	function _listener() {
		$('.form__view-link').on('click', _setServerData);

		console.log('SWICTH MODE CATCHER');
	}

	function _setServerData() {
		var serve = $(this).val();
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