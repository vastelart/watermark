(function () {

	var form = document.getElementById('theForm');
	var submit = document.getElementById('submitBtn');
	var toserver = submit.getAttribute('data-server');

	var formData = new FormData(form);
	
	submit.addEventListener('click', _reliz, true);

	function _reliz(e) {
		e.preventDefault();

		window.URL = window.URL || window.webkitURL;  // vendor prefixes.

		var xhr = new XMLHttpRequest();
		xhr.open('GET', toserver, true);
		xhr.responseType = 'blob';

		xhr.onload = function(e) {
		  if (this.status == 200) {
		    var blob = this.response;

		    var img = document.createElement('img');
		    img.onload = function(e) {
		      window.URL.revokeObjectURL(img.src); // Clean up after yourself.
		    };
		    img.src = window.URL.createObjectURL(blob);
		    document.body.appendChild(img);
		    window.location = toserver;
		  }
		};

		xhr.send();

		//Кому интересен нативный XMLHttpRequest Level 2, гоу сюда http://www.html5rocks.com/ru/tutorials/file/xhr2/
	}

})();