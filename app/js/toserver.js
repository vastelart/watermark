(function () {

	var form = document.getElementById('theForm');
	var submit = document.getElementById('submitBtn');
	var toserver = submit.getAttribute('data-server');

	var formData = new FormData(form);
	
	submit.addEventListener('click', _reliz, true);

	function _reliz(event) {
		event.preventDefault();
		//console.log(formData);
		var reliz = new XMLHttpRequest();
		
		reliz.open('POST', toserver, true);
		reliz.send(formData);

		reliz.onreadystatechange = function () {
			if(reliz.readyState === 4 && reliz.status === 200) {
				console.log(reliz.responseText);
			}
		}
	}

})();