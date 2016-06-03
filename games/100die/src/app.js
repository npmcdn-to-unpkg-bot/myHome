/** @type {Dragon} */
var dragon;


if (vee.GameModule) {
	vee.GameModule.OverLayer.extend({
		getShareContent : function() {
			return "这才是真正的 分享字符串";
		}
	});
}

var LyGame = vee.Class.extend({

	/**@expose*/
	onGameOver : function() {
		game.oGame.gameOver();
	},

	onCreate : function() {

	},

	onEnter : function() {

	}
});

cc.BuilderReader.registerController(LyGame,"LyGame");

var gameController;
function main(){

	vee.init();
	//vee.GameModule.SceneMgr.openMain();

	vee.PopMgr.popCCB(res.logo_ccbi).controller;

	//vee.Analytics.activate();
    //vee.IAPMgr.activate();
	//vee.Promo.activate();

	//vee.Ad.activate(function(){
	//	vee.Ad.showBannerAd(vee.Ad.Position.Bottom);
	//});
}