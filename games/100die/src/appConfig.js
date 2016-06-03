/**
 * Created with AppCode.
 * User: Yop Chan
 * Date: 14-3-19
 * Time: 下午4:11
 * To change this template use File | Settings | File Templates.
 */

var app = app = app || {};

app.Config = {
	AppID : null,
	AppName : "Template",
	AppAlias : "template",
	AppURL : null,

	// If there is removeAd IAP, it MUST be at the first place
	IAPs : [],
	LeaderboardIDs : [],

	// use for utils.rate()
	RateURL : null,
	// use for moregame button
	PromoURL : "http://www.veewo.com",
	// use for combine promo config download URL
	PromoChannel : "promo",
	PromoBannerEnable : true,
	PromoFullScreenEnable : true,

	//plugin
	AnalyticsPluginName : "AnalyticsUmeng",
	AnalysticsConfig : null,

	IAPPluginName : "IAPManager",
	IAPConfig : null,

	VideoAdPluginName : null,
	VideoAdConfig : null,

	AdBannerPluginName : "AdsMongo",
	AdBannerPluginConfig : null,

	AdInterstialPluginName : "AdsMongo",
	AdInterstialPluginCoinfig : null,

	IsBannerEnabled : true,
	IsInterestialEnabled : true
};

app.Config.iOS = {
	AnalysticsConfig : "531422a356240be1542137d5"
}

app.Config.android = {
	AppDefaultClass : "com/veewo/template/defaultAct",
	AnalysticsConfig : "5307500a56240bbbb001a21a"
}

app.init = function(isFirstPlay){

	var config = vee.Utils.getObjByPlatform(app.Config.iOS, app.Config.android, {});
	for (var i in config){
		app.Config[i] = config[i];
	}

	if (isFirstPlay) {
		vee.saveData();
	}

	// add your app launch code here
}

app.leave = function (argument) {
	//will resign focus , save data here
}

app.resume = function (argument) {
	//activated from background
}