/**
 * @module cocos2dx_extension
 */
var vee = vee = vee || {};

vee.ConfigKey = {
	App_Name : 0,
	App_Alias : 1,
	App_Url : 2,
	App_DefaultClass : 3
}

/**
 * @class CCControl
 */
vee.Common = {
	/**
	 *
	 * @param {String} key
	 * @param {Number} value
	 */
	saveInt : function(key, value){},

	/**
	 *
	 * @param {String} key
	 */
	getInt : function(key){},

	/**
	 *
	 * @param {String} str
	 * @param {String} fileName
	 */
	saveToFile : function(str, fileName){},

	/**
	 *
	 * @param {String} fileName
	 * @returns {string}
	 */
	loadFromFile : function(fileName){},

	/**
	 *
	 * @returns {vee.Common}
	 */
	getInstance : function(){ return this; },

	/**
	 *
	 * @param {Number/String} score Or Message 使用 share(12300) 分享一个分数 或者使用 share('分享一句话', 'shareImage.jpg') 来分享一个图文
	 * @param {String} imageName
	 */
	share : function(scoreOrMessage, imageName){},

	/**
	 *
	 * @param {String} url
	 */
	openURL : function(url){},

	/**
	 * 保存一个截图
	 * @param {cc.Layer} layer
	 * @param {String} fileName
	 */
	saveImage : function(layer, fileName){},

	/**
	 * Send score to game center. If you need to send big number use sendBigGameCenter.
	 * @param {Number} score
	 * @param {String} leaderboardID
	 */
	sendGameCenter : function(score, leaderboardID){},

	/**
	 * @returns {Boolean}
	 */
	isGameCenterSignedIn: function(argument) {},

	enterGameCenter: function(){},

	/**
	 *
	 * @param {String} leaderboardID
	 */
	showLeaderBoard : function(leaderboardID){},

	showAchievement: function(){},

	/**
	 * Unlock achievement with ID.
	 * @param achievementID
	 */
	unlockAchievement: function(achievementID){},

	/**
	 *
	 * @param {string} url
	 * @param {int} apiVersion
	 * @param {string} action
	 * @param {string} body
	 * @param {function} callback
	 * @param {bool} skipEncrypt
	 */
	requestServer: function(url, apiVersion, action, body, callback, skipEncrypt){},

	/**
	 * @param {String} url
	 * @param {String} fileName
	 * @param {function} callback
	 * @param {bool} forceDownload
	 */
	downloadImage : function(url, fileName, callback, forceDownload){},

	/**
	 * @return {bool} whether is debug mode.
	 */
	isDebugMode: function(){},

	/**
	 *
	 * @param {vee.ConfigKey} key
	 */
	getConfig : function(k){},
	setSoundEnabled : function(v) {},

	openKitLogin: function(callback){},
	openKitInvite: function(callback){},
	openKitLogout: function(){},
	openKitGetLoginStatus: function(){}
};

vee.Shake = {
	create: function(delay){
		return cc.DelayTime.create(delay);
	},
	initWithDuration: function(){
	},
	startWithTarget: function(){
	},
	update: function(){
	}
};