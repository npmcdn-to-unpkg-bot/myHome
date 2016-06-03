/**
 * Created with WebStorm.
 * User: Yop Chan
 * Date: 15/12/30
 * Time: 下午1:51
 * To change this template use File | Settings | File Templates.
 */
var vee = vee = vee || {};

timer = function() {
	var ts = (new Date(2016, 0, 18, 0, 0, 0)) - (new Date());//计算剩余的毫秒数
	var dd = parseInt(ts / 1000 / 60 / 60 / 24, 10);//计算剩余的天数
	var hh = parseInt(ts / 1000 / 60 / 60 % 24, 10);//计算剩余的小时数
	var mm = parseInt(ts / 1000 / 60 % 60, 10);//计算剩余的分钟数
	var ss = parseInt(ts / 1000 % 60, 10);//计算剩余的秒数
	dd = vee.CheckTime(dd);
	hh = vee.CheckTime(hh);
	mm = vee.CheckTime(mm);
	ss = vee.CheckTime(ss);
	document.getElementById("txtCountdown").innerHTML = dd + " : " + hh + " : " + mm + " : " + ss;
}

vee.CheckTime = function(i) {
	if (i < 0) return "00";
	if (i < 10) {
		i = "0" + i;
	}
	return i;
}

setInterval("timer()",1000);

vee.Submit = function () {
	var email = document.getElementById("txtEmail").value;
	var intro = document.getElementById("txtIntro").value;
	document.getElementById("formSheet").style.display="none";
	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
	if (!reg.test(email)){
		document.getElementById("formResultError").style.display = "block";
		return;
	}

	try {
		var dateString = (new Date()).toISOString().substring(0, 10);
		var fb = new Firebase("https://yop-dev.firebaseio.com/PhantomCat/" + dateString + "/");
		fb.push({
			email: email,
			intro: intro
		}, function (error) {
			if (!error) {
				document.getElementById("formResultSuccess").style.display = "block";
			} else {
				document.getElementById("formResultError").style.display = "block";
			}
		});
	} catch (e) {
		document.getElementById("formResultError").style.display = "block";
	}
}