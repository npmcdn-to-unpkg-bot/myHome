<!DOCTYPE html>
<html lang="zh-cn">
<head>
	<meta charset="utf8">
	<title>注册 | Veewo</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link href="static/css/bootstrap.min.css" rel="stylesheet"/>
	<link href="static/css/bootstrap-responsive.min.css" rel="stylesheet"/>
	<link rel="stylesheet" type="text/css" href="static/css/style.css">

	<!--[if lt IE 9]>
	<script src="static/script/html5.js"></script>
	<![endif]-->
	<!--[if IE 6]>
	<link href="static/css/ie6.min.css" rel="stylesheet">
	<![endif]-->

	<script type="text/javascript" src="static/script/jquery-latest.min.js"></script>

	<!--<script type="text/javascript" src="static/script/admin.js"></script>-->



	<style>
		body { padding: 0px; }
	</style>
</head>

<body>
<div class="mainPage">
	<!--<div class="header">-->
		<!--<div class="logo hidden-phone" onclick=vee.goHome()></div>-->
		<!--<div class="logo-small visible-phone" onclick=vee.goHome()>-->
			<!--<img src="static/image/logo_small.png"/>-->
		<!--</div>-->
		<!--<div class="navigator">-->
			<!--<div><a class="button" href="index.php">主页</a></div>-->
			<!--<div><a class="button" href="games/">游戏</a></div>-->
			<!--<div class="selected"><a class="button" href="#">关于</a></div>-->
			<!--<div><a class="button" href="jobs.html">工作</a></div>-->
		<!--</div>-->
	<!--</div>-->

	<!--<div class="modal_top"><h4 >用户注册</h4></div>-->
	<div class="reg_form ">
		<!--<img class="close" src="static/image/home/btn_signup_close.png" onclick="return closeRegistDiv()"/>-->
		<form style="..." onsubmit="return validate_form(this)">
			<div><p>姓名:</p> <input class="userInput" type="text"  name="username"/></div>
			<div><p>邮箱:</p> <input class="userInput" type="text" name="email"/></div>
			<div><p>手机号:</p> <input class="userInput" type="text" name="phone"/></div>
			<div><p>身份证:</p> <input class="userInput" type="text" name="idCard"/></div>
			<div><p>密码:</p> <input class="userInput" type="password" name="password"/></div>
			<div><p>重复密码:</p> <input class="userInput" type="password" name="repassword"/></div>
			<input class="btn_reg" type="image" src="static/image/home/btn_signup_ok.png" alt="submit"/>
		</form>
	</div>

	<!--<div class="reg_form">-->
		<!--<form style="float:left;" onsubmit="return validate_form(this)">-->
			<!--<p>用户名:</p> <input type="text"  name="username"/>-->
			<!--<p>密码:</p> <input type="password" name="password"/>-->
			<!--<p>确认密码:</p> <input type="password" name="repassword"/>-->
			<!--<p>身份证:</p> <input type="text" name="idCard"/>-->
			<!--<p>手机号:</p> <input type="text" name="phone"/>-->
			<!--<p>电子邮箱:</p> <input type="text" name="email"/>-->
			<!--<p>验证码:</p> <input type="text" name="verCode"/>-->
			<!--<input id="btn_reg" type="submit" value="立  即  注  册"/>-->
		<!--</form>-->
	<!--</div>-->

	<!--<div class="login_form">-->
		<!--<form style="..." onsubmit="return login(this)">-->
			<!--<p>账号:</p> <input type="text" name="phone">-->
			<!--<p>密码:</p> <input type="password" name="password">-->
			<!--<input id="btn_login" type="submit" value="登录" />-->
		<!--</form>-->
	<!--</div>-->

	<!--<div class="contact container-narrow">-->
		<!--<div>-->
			<!--<a href="mailto:hi@veewo.com">-->
				<!--<div class="seperator-small">-->
					<!--<img alt="moregame" src="static/image/btn_email_hi.png"/>-->
				<!--</div>-->
			<!--</a>-->
		<!--</div>-->
		<!--<div>-->
			<!--<a href="https://www.facebook.com/veewogames/">-->
				<!--<img alt="moregame" src="static/image/icon_facebook.png"/>-->
			<!--</a>-->
			<!--<a href="https://twitter.com/VeewoGames">-->
				<!--<img alt="moregame" src="static/image/icon_twitter.png"/>-->
			<!--</a>-->
			<!--<a href="mailto:hr@veewo.com">-->
				<!--<img alt="moregame" src="static/image/icon_weibo.png"/>-->
			<!--</a>-->
		<!--</div>-->
	<!--</div>-->







	<!--<div class="footer">-->
		<!--<div class="navigator-footer seperator">-->
			<!--<div><a class="button" href="index.php">主页</a>&nbsp&nbsp/&nbsp&nbsp</div>-->
			<!--<div><a class="button" href="games/">游戏</a>&nbsp&nbsp/&nbsp&nbsp</div>-->
			<!--<div><a class="button" href="about.html">关于</a>&nbsp&nbsp/&nbsp&nbsp</div>-->
			<!--<div><a class="button" href="jobs.html">工作</a>&nbsp&nbsp/&nbsp&nbsp</div>-->
			<!--<div><a class="button" href="user.html">用户协议</a>&nbsp&nbsp/&nbsp&nbsp</div>-->
			<!--<div><a class="button" href="privacy_cn.html">隐私政策</a>&nbsp&nbsp/&nbsp&nbsp</div>-->
			<!--<div><a class="button" href="jiazhang.html">家长监护</a>&nbsp&nbsp/&nbsp&nbsp</div>-->
			<!--<div><a class="button" href="recharge.html">充值</a>&nbsp&nbsp/&nbsp&nbsp</div>-->
			<!--<div><a class="button" href="#">注册</a></div>-->
		<!--</div>		-->
		<!--<div>-->
			<!--<p>抵制不良游戏，拒绝盗版游戏，注意自我保护，谨防受骗上当，适度游戏益脑，沉迷游戏伤身，合理安排时间，享受健康生活。</p>-->
			<!--<p>厦门微沃时刻有限公司     ©2014 Veewo Game</p>-->
			<!--<p>地址：厦门市集美区集美大道1302号创业大厦1508室 电话：0592-6103797</p>-->
		<!--</div>-->
		<!--<div>-->
			<!--<a target="_blank" href="http://bcainfo.miitbeian.gov.cn/publish/query/indexFirst.action">闽ICP备16011513号</a>-->
		<!--</div>-->
	<!--</div>-->



	<script type="text/javascript" src="static/script/flow.js"></script>
	<script type="text/javascript" src="static/script/home.js"></script>

<!--	<script src="https://www.gstatic.com/firebasejs/3.0.2/firebase.js"></script>-->
	<script type="text/javascript" src="static/script/firebase.js"></script>
	<script type="text/javascript" src="static/script/user.js"></script>
	<script type="text/javascript" src="static/script/regist.js"></script>
	<script type = "text/javascript">
		vee.firebase = firebase.initializeApp({
			apiKey: "AIzaSyD34SbBSlAZQ85rcNtbYTGm5w3MHnrK8k4",
			authDomain: "yop-dev.firebaseapp.com",
			databaseURL: "https://yop-dev.firebaseio.com",
			storageBucket: "yop-dev.appspot.com",
		});
	</script>
	<script type="text/javascript" src="static/script/bootstrap.min.js"></script>
	<!--[if IE 6]>
	<script src="static/script/ie6.min.js"></script>
	<![endif]-->
</div>
</body>

</html>
