/* Author: Christopher Hayes

*/

(function( $ ) {
	var methods = {
		slide : function(x, settings) {
			if (x == null) {
				return;
			}
			
			if (x.is(':visible') && settings.perform != 'open') {
				if (settings.willClose) { settings.willClose(); }
				x.stop(true, true).slideUp(settings.duration, settings.easing, settings.onClose);
			}
			else if (settings.perform != 'close') {
				if (settings.willOpen) { settings.willOpen(x); }
				x.stop(true, true).slideDown(settings.duration, settings.easing, settings.onOpen);
			}
		},
		none : function(x, settings) {
			if (x == null) {
				return;
			}
			
			if (x.is(':visible') && settings.perform != 'open') {
				if (settings.willClose) { settings.willClose(); }
				x.hide();
				if (settings.onClose) { settings.onClose(); }
			}
			else if (settings.perform != 'close') {
				if (settings.willOpen) { settings.willOpen(); }
				x.show();
				if (settings.onOpen) { settings.onOpen(); }
			}
		},
		fade : function(x, settings) {
			if (x == null) {
				return;
			}
			
			if (x.is(':visible') && settings.perform != 'open') {
				if (settings.willClose) { settings.willClose(); }
				x.stop(true, true).fadeOut(settings.duration, settings.easing, settings.onClose);
			}
			else if (settings.perform != 'close') {
				if (settings.willOpen) { settings.willOpen(); }
				x.stop(true, true).fadeIn(settings.duration, settings.easing, settings.onOpen);
			}
		}
	};
	
	$.fn.revealer = function(options) {

		var settings = $.extend( {
			'clickable' : 'h3',
			'content' 	: 'div',
			'transition': 'slide',
			'duration'  : 300,
			'onOpen'	: function() {},
			'onClose'	: function() {},
			'willOpen'	: function() {},
			'willClose'	: function() {},
			'action'	: 'click',
			'easing'	: 'swing',
			'perform'	: 'toggle'
		}, options);
		
		return this.each(function(){
			var div = $(this);
			var fun = function(event) {
				div.find(settings.content).each(function() {
					switch(settings.transition) {
						case 'slide':
							event.preventDefault();
							methods.slide($(this), settings);
							break;
						case 'fade':
							event.preventDefault();
							methods.fade($(this), settings);
							break;
						case 'none':
							event.preventDefault();
							methods.none($(this), settings);
							break;
						default:
							throw settings.transition + ' is not a supported transition. Use slide, fade or none';
					}
				});
			}
				
					
			if (settings.clickable == 'self' || settings.clickable == 'this' || div.is(settings.clickable)) {
				div.bind(settings.action, fun);
			}
			else {
				div.find(settings.clickable).bind(settings.action, fun);
			}
		});
	};
})( jQuery );
