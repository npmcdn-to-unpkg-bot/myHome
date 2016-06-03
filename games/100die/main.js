cc.game.onStart = function(){
	var wsize = cc.director.getWinSize();
	var isVerticle = (wsize.width < wsize.height);

	var width = wsize.width;
	var height = wsize.height;

	var resWidth = (isVerticle ? 640 : 960);
	var resHeight = (isVerticle ? 960 :  640);

	var rW = width/resWidth;
	var rH = height/resHeight;
	var wDes, hDes, pDes;
	if (rW >= rH) {
		pDes = cc.ResolutionPolicy.FIXED_HEIGHT;
		wDes = Math.min(width, (isVerticle ? 768 : 1136));
		hDes = resHeight;
	} else {
		pDes = cc.ResolutionPolicy.FIXED_WIDTH;
		wDes = resWidth;
		hDes = Math.min(height, (isVerticle ? 1136 : 768));
	}
	cc.view.setDesignResolutionSize(wDes, hDes, pDes) ;
	cc.view.resizeWithBrowserSize(false);
//	cc.view.resizeWithBrowserSize(true);
//	cc.view.setResizeCallback(function(){
//		if (cc && cc.gameInited) {
//			main();
//		}
//	});

    cc.LoaderScene.preload(g_resources, function () {
		main();
	    cc.gameInited = true;
    }, this);
};

cc.game.run();