var opacityModule = (function () {
	var init = _listener;

	function _listener() {
		$(window).load(function() {
			$("#slider").slider({
	            animate: true,
	            min: 0,
	            max: 100,
	            step: 0,
	            slide: function (event)
	            {
	                var value = $("div#slider").slider("value");
	                
	                if(value === 1) {value = 0;}
	                else if(value === 99) {value = 100;}
	                
	                $("#babka").css({ opacity: value / 100 });
	                $('#slider').attr('data-value', value);
	            }
        	}).slider("value", 100);//startup value
		});
	}

	return {
		init: init
	}
})();

opacityModule.init();