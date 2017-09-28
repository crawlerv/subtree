jQuery(document).ready(function($) {
	var ww = $(window).width();
	if (ww > 1024) { 
		//десктоп
	}else if( ww > 768){ 
		//планшет 
	}else if(ww > 576){ 
		//телефон горизонтально

	}else{
		//телефон вертикально
	};

	$(window).on("orientationchange, resize",function(){
	   ww = $(window).width();
	   if (ww > 1024) { 
			//десктоп
		}else if( ww > 768){ 
			//планшет 
		}else if(ww > 576){ 
			//телефон горизонтально
		}else{
			//телефон вертикально
		};
	});

	// выравнивание высоты названия товара
	(function() {
		$('.popular-item__name').matchHeight();
		$('.recommendation__text').matchHeight();
	})();

});