var opacityModule = (function () {
	var init = _listener;

	function _listener() {
		$(window).load(function() {
			$("#slider").slider({
				range: 'max',
				min: 0,
				max: 100,
				slide: function() {
					var value = $("div#slider").slider("value");
	                
	                if(value === 1) {value = 0;}
	                else if(value === 99) {value = 100;}
	                
	                $("#watermarkInsert").css({ opacity: value / 100 });
	                $('#slider').attr('data-value', value);
				}
			}).slider('value', 100);//startup value
		});

		console.log('OPACITY');
	}

	return {
		init: init
	}
})();

opacityModule.init();