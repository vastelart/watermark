var ViewStateChange = function() {
	var _previousClass = '';

	var _changeState = function($this){
		var 
			item = $this.closest('.form__view-item'),
			view = item.data('view'),
			listOfItems = $('#form-position'),
			modificationPrefix = 'form-position_',
			classOfViewState = modificationPrefix + view;

			if (_previousClass == '') {
				_previousClass == listOfItems.attr('class');
			}

			_changeActiveClass($this);
			listOfItems.attr('class', _previousClass + ' ' + classOfViewState);
	};

			var _changeActiveClass = function($this) {
				$this
					.closest('.form__view-item').addClass('active')
					.siblings().removeClass('active');
			}

			return {
				init: function(){
					$('.form__view-link').on('click', function(e){
						e.preventDefault();
						_changeState
					});
				}
			}
}());