var uploadResizer = (function () {
	var init = _setCall;

	function _setCall () {
		_resizeWaterContainer;
	}

	function _resizeWaterContainer () {
		var _container = $('#watermarkInsert');
		var newWidth = _container.find('img').width();
		var newHeight = _container.find('img').height();

		_container.css({
			'width': newWidth,
			'height': newHeight
		});

		console.log('UPLOAD RESIZER');
	}

	return {
		init: init
	}
})();