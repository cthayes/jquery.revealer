/* Author: Christopher Hayes

*/

(function( $ ) {
	var methods = {
		slide : function(x) {
			if (x == null) {
				return;
			}
			
			if (x.css('display') != 'none') {
				x.slideUp('fast');
			}
			else {
				x.slideDown('fast');
			}
		},
		none : function(x) { 
			if (x == null) {
				return;
			}
			
			if (x.css('display') != 'none') {
				x.hide();
			}
			else {
				x.show();
			}
		},
		fade : function(x) { 
			if (x == null) {
				return;
			}
			
			if (x.css('display') != 'none') {
				x.fadeOut('fast');
			}
			else {
				x.fadeIn('fast');
			}
		}
	};
	
	$.fn.revealer = function(options) {

		var settings = $.extend( {
			'clickable' : 'h3',
			'content' 	: 'div',
			'transition': 'slide'
		}, options);
		 
		return this.each(function(){
			var div = $(this);
			div.find(settings.clickable).click(function() {
				div.find(settings.content).each(function() {
					switch(settings.transition) {
						case 'slide':
							methods.slide($(this));
							break;
						case 'fade':
							methods.fade($(this));
							break;
						case 'none':
							methods.none($(this));
							break;
						default:
							throw settings.transition + ' is not a supported transition. Use slide, fade or none';
					}
				});
			});
		});
	};
})( jQuery );