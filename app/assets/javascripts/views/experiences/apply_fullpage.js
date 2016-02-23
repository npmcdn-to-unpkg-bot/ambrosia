var applyFullpage = function() {
	removePanelNavigation()
	var fakeNavs = new Array
	for (var i = 1; i < 150; i++) { fakeNavs.push("x") }
  $('html').removeClass('fp-enabled').promise().done(function(){
    $('#fullpage').fullpage({
    	scrollOverflow: true,
    	loopBottom: true,
    	anchors: fakeNavs,
		navigation: true,
		navigationPosition: 'right',
		navigationTooltips: fakeNavs,
    });
  })
};

var removePanelNavigation = function(){
	if ($("#fp-nav")) {
		$("#fp-nav").remove()
	};
};