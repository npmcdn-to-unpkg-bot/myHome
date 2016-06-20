/**
 * Created with JetBrains WebStorm.
 * User: Yop Chan
 * Date: 14-11-15
 * Time: 下午3:16
 * To change this template use File | Settings | File Templates.
 */

var vee = vee = vee || {};

Flow.debug();

vee.App = {
	alias : null,
	banner : null,
	desc : [],
	icon : null,
	id : null,
	image : null,
	name : [],
	priority : null
}

vee.Job = {
	icon : null,
	title : null,
	des : null
}

vee.Category = {
	name : null,
	channel : null
}

vee.games = {};

vee.goHome = function(){
	location.href="http://" + location.host;
}

vee.updateHome = function() {
	Flow.do(vee.DownloadObj).then(
			vee.ObjFilter, "home").then(
			vee.ObjFilter, "channel").then(
			vee.GetApps).then(
			vee.FillPromoApp
		).go("config.json");
}

vee.updateGame = function() {
	if (vee.request.name) {
		vee.showSoloGame();
	} else {
		vee.showGameList();
		$(".gameList").show();
		$(".gameDetail").hide();
		$("#divGameTitle").html("");
		$("#divGameDescription").html("");
	}
}

vee.showGameList = function() {
	if (vee.categories) return;
	Flow.do(vee.DownloadObj).then(
			vee.ObjFilter, "game").thenAll([
				Flow.do(vee.ObjFilter, "categories").then(vee.FillCategories),
				Flow.do(vee.ObjFilter, "promo").then(vee.GetApps).then(vee.FillPromoApp, true)
		]).go("../config.json");
}

vee.showSoloGame = function() {
	if (!vee.request.name) {
		return;
	}
	if (!vee.games[vee.request.name]) {
		Flow.do(vee.DownloadObj).then(
				vee.ObjFilter, "game").thenAll([
					Flow.do(vee.ObjFilter, "categories").then(vee.CollectCategoriesApps),
					Flow.do(vee.ObjFilter, "promo").then(vee.GetApps).then(vee.CollectAppData)
				]).then(
				vee.FillGame, vee.request.name
			).go("../config.json");
	} else {
		Flow.do(vee.FillGame, vee.request.name).go();
	}
}

vee.updateAbout = function() {
	Flow.do(vee.DownloadObj).then(
			vee.ObjFilter, "about").then(
			vee.ObjFilter, "des").thenAll([
			Flow.do(vee.ObjFilter, "en").then(vee.FillText, "#divDesEn"),
			Flow.do(vee.ObjFilter, "cn").then(vee.FillText, "#divDesCn")
		]).go("config.json");
}

vee.updateJobs = function() {
	Flow.do(vee.DownloadObj).then(
			vee.ObjFilter, "jobs").thenAll([
				Flow.do(vee.ObjFilter, "des").thenAll([
					Flow.do(vee.ObjFilter, "en").then(vee.FillText, "#divDesEn"),
					Flow.do(vee.ObjFilter, "cn").then(vee.FillText, "#divDesCn")
				]),
				Flow.do(vee.ObjFilter, "positions").then(vee.FillJobs)
	]).go("config.json");
	vee.showJobList();
}

vee.openJob = function(idx) {
	$(".jobList").hide();
	$(".jobDetail").show();
	var job = vee.jobs[idx];
	Flow.do(vee.FillText, "#divJobTitle").go(job.title);
	Flow.do(vee.FillText, "#divJobDescription").go(job.des);

}

vee.showJobList = function() {
	$(".jobList").show();
	$(".jobDetail").hide();
	$("#divJobTitle").html("");
	$("#divJobDescription").html("");
}


/*
input : url {String}
output : obj
 */
vee.DownloadObj = Flow.extend(function(url) {
	this.log("action", url);
	$.ajax({url:url, context:this, success:function(res){
		this.output(res);
	}, error:function(obj, error){
		this.output(JSON.parse(obj.responseText));
	}
 	});
}, "DownloadObj");

vee.ObjFilter = Flow.extend(function(obj){
	var filter = this.data;
	if (filter && obj) this.output(obj[filter]);
}, "ObjFilter");

/*
input : channel
output : latest channel url
 */
vee.DownloadVersion = Flow.extend(function(channel) {
	this.channel = channel;
	var versionURL = "http://" + location.host + "/promo/"+channel+"_latest.json";
	var fDownload = Flow.do(vee.DownloadObj);
	fDownload.onResult(function(res){
		var promoURL = "http://" + location.host + "/promo/"+ this.channel + "_" + res.v + ".json";
		this.output(promoURL);
	}.bind(this));
	fDownload.go(versionURL);
}, "DownloadVersion");

vee.GetApps = Flow.extend(function(channel){
//	var app = JSON.parse('[{"priority":"25","alias":"darkslash2","name":["合到10","Just Get 10"],"index":"0","image":"http://veewo.com/promo/img/Get10_web_ios_image.png","desc":["Just Get 10····","Just Get 10···"],"banner":"http://veewo.com/promo/img/Get10_web_ios_banner.png","id":"","icon":"http://veewo.com/promo/img/Get10_web_ios_icon.png"},{"priority":"25","alias":"Get10_web","name":["合到10","Just Get 10"],"index":"0","image":"http://veewo.com/promo/img/Get10_web_ios_image.png","desc":["Just Get 10····","Just Get 10···"],"banner":"http://veewo.com/promo/img/Get10_web_ios_banner.png","id":"","icon":"http://veewo.com/promo/img/Get10_web_ios_icon.png"}]');
//	this.output(app);
//	return;
	if (!channel) channel = this.data;
	var flow = Flow.do(
			vee.DownloadVersion).then(
			vee.DownloadObj).then(
			vee.ObjFilter, "apps").onResult(
			function(data){
				this.output(data);
			}.bind(this)).go(channel);
}, "GetApps");

vee.FillPromoApp = Flow.extend(function(apps) {
	var isLimited = this.data;
	var len = (isLimited ? Math.min(apps.length, 2) : apps.length);
	var divPromo = $("#divPromo");
	var content = "";
	for (var i = 0; i < len; i++ ){
		vee.games[apps[i].alias] = apps[i];
		if (i%2==0)
			content += '<div  class="row-fluid">';
		content += '<div class="span6 seperator">';
		content += '<a href="http://' + location.host + '/games/?name=' + apps[i].alias + '">';
		content += '<div><img class="appImage" alt="' + apps[i].name[0] + '" src="' + apps[i].banner + '" /></div>';
		content += '</a></div>';
		if (i%2!=0)
			content += '</div>';
	}
	if (len%2!=0) content += '</div>';
	divPromo.html(content);
}, "FillPromoApp");

vee.FillCategories = Flow.extend(function(cats){
	vee.category = cats;
	var flow = Flow.do(Flow.NONE);
	for (var i in cats) {
		flow = flow.then(vee.FillCategory, cats[i]);
	}
	flow.onResult(function(content){
		$("#divGameList").html(content);
	});
	flow.go("");
}, "FillCategories");

vee.CollectCategoriesApps = Flow.extend(function(categories){
	var len = categories.length;
	console.log("hello");
	console.log(categories);
	if (len <= 0)
		this.done();
	else {
		var flowArr = [];
		for (var i = 0; i < len; i++){
			flowArr.push(Flow.do(vee.GetApps, categories[i].channel).then(vee.CollectAppData));
		}
		Flow.doAll(flowArr).onResult(function(){
			this.done();
		}.bind(this)).go();
	}
}, "CollectCategoriesApps");

vee.CollectAppData = Flow.extend(function(apps){
	var len = apps.length;
	for (var i = 0; i < len; i++) {
		vee.games[apps[i].alias] = apps[i];
	}
	this.done();
}, "CollectAppData");

vee.FillCategory = Flow.extend(function(content){
	/** @type {vee.Category} */
	var category = this.data;
	this.content = content;
	Flow.do(vee.GetApps).onResult(function(apps){
		/** @type {vee.Category} */
		var category = this.data;
		apps.sort(function(app1, app2){
			return (app1.priority < app2.priority ? 1 : -1);
		});
		var len = apps.length;
		for (var i in apps) {
			if (apps[i].priority <= 0) {
				len = i;
				break;
			}
		}
		var content = this.content;
		len = Math.min(len, 4);
		content += '<div class="white-bg seperator title"><p>' + category.name + '</p></div>';
		content += '<div class="container-narrow categories ' + (len > 2 ? ' line-2 ' : '') + '">';
		var index = 0;
		for (var i = 0; i < len; i++){
			/** @type {vee.App} */
			var app = apps[index];
			vee.games[app.alias] = app;
			content += '<a href="?name=' + app.alias + '"><div class="gameIcon seperator">';
			content += '<div><img class="icon" src="' + app.icon + '" /></img></div>';
			content += '<p>' + app.name[0] + '</p>';
			content += '</div></a>'
			index++;
		}
		content += '</div>';
		this.output(content);
	}.bind(this)).go(category.channel);
});

vee.FillGame = Flow.extend(function(){
	var game = vee.games[this.data];
	if (game) {
		$(".gameList").hide();
		$(".gameDetail").show();
		Flow.do(vee.FillText, "#divGameTitle").go(game.name[0]);
		Flow.do(vee.FillText, "#divGameDescription").go(game.desc[0] + (game.desc[1] ? "\n" + game.desc[1] : ""));
		$("#imgGameBanner").attr("src", game.banner);
		var ids = game.id.split('|');
		vee.current.appID = ids[0];
		if (!vee.current.appID || vee.current.appID.length <= 0) {
			$("#imgAppStore").attr("src", "../static/image/btn_download_apple_dis.png");
		}
		vee.current.googleID = ids[1];
		if (!vee.current.googleID || vee.current.googleID.length <= 0) {
			$("#imgGooglePlay").attr("src", "../static/image/btn_download_google_dis.png");
		}
	}
	this.done();
}, "FillGame");

vee.FillText = Flow.extend(function(text){
	var tag = this.data;
	var arrText = text.split('\n');
	var content = "";
	for (var i in arrText) {
		content += '<p>' + arrText[i] + '</p>'
	}
	$(tag).append(content);
}, "FillText");

vee.FillJobs = Flow.extend(function(jobs){
	content = "";
	vee.jobs = jobs;
	for (var i in jobs) {
		var job = jobs[i];
		content += '<div class="green-bg inline onclick=vee.openJob('+ i +')">';
		content += '<a href="Javascript:vee.openJob(' + i + ')">';
		content += '<img class="hidden-phone" src="' + job.icon + '" />';
		content += '<p>' + job.title + '</p>';
		content += '</a></div>';
	}
	$('#divPositions').append(content);
}, "FillJobs");

vee.current = {
	appID : null,
	googleID : null
}

vee.openAppStore = function() {
	var id = vee.current.appID;
	if (id && id.length) {
		window.open("https://itunes.apple.com/app/id" + id);
	}
}

vee.openGooglePlay = function() {
	var id = vee.current.googleID;
	if (id && id.length) {
		window.open("https://play.google.com/store/apps/details?id=" + id);
	}
}


