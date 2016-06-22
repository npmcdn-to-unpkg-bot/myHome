<!DOCTYPE html>
<?php
ini_set('date.timezone','Asia/Shanghai');
//error_reporting(E_ERROR);

require_once "php/wechatpay/lib/WxPay.Api.php";
require_once "php/wechatpay/example/WxPay.NativePay.php";
require_once 'php/wechatpay/example/log.php';

require_once 'php/wechatpay/example/firebaseInterface.php';
require_once 'php/wechatpay/example/firebaseLib.php';
require_once 'php/wechatpay/example/firebaseStub.php';

const DEFAULT_URL = 'https://yop-dev.firebaseio.com/PhantomCat/';
const DEFAULT_TOKEN = '';
const DEFAULT_PATH = '/orders';

$firebase = new \Firebase\FirebaseLib(DEFAULT_URL, DEFAULT_TOKEN);

function getOldCoin(){
    $uid = $_GET["uid"];
    global $firebase;
    $oldCoin = $firebase->get("/users/" . $uid . "/coin");
    return $oldCoin;
}

function getCodeUrl($total){
    $uid = $_GET["uid"];
    if(null == $uid) return;

    $notify = new NativePay();
    $input = new WxPayUnifiedOrder();
    $input->SetBody("veewo V币购买");
    $input->SetAttach($uid);
    $tradeNo = WxPayConfig::MCHID.date("YmdHis");
    $input->SetOut_trade_no($tradeNo);
    $input->SetTotal_fee($total);
    $input->SetTime_start(date("YmdHis"));
    $input->SetTime_expire(date("YmdHis", time() + 600));
    $input->SetGoods_tag("V币");
    $input->SetNotify_url("http://www.veewogames.cn/php/wechatpay/example/notify.php");
    $input->SetTrade_type("NATIVE");
    $input->SetProduct_id(time());
    $result = $notify->GetPayUrl($input);
    $url = $result["code_url"];
    return $url;
}

?>

<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <title>主页 | Veewo</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="static/css/bootstrap.min.css" rel="stylesheet"/>
    <link href="static/css/bootstrap-responsive.min.css" rel="stylesheet"/>
    <link rel="stylesheet" type="text/css" href="static/css/style.css">
    <!--<link rel="stylesheet" type="text/css" href="static/css/home.css">-->

    <!--[if lt IE 9]>
    <script src="static/script/html5.js"></script>
    <![endif]-->
    <!--[if IE 6]>
    <link href="static/css/ie6.min.css" rel="stylesheet">
    <![endif]-->

    <script type="text/javascript" src="static/script/jquery-latest.min.js"></script>

    <script type="text/javascript" src="static/script/flow.js"></script>
    <script type="text/javascript" src="static/script/home.js"></script>

    <script src="https://www.gstatic.com/firebasejs/3.0.2/firebase.js"></script>
    <script type="text/javascript" src="static/script/user.js"></script>
    <script type="text/javascript" src="static/script/regist.js"></script>
    <script type="text/javascript" src="static/script/pay.js"></script>
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



    <script type="text/javascript">

        function showPayDiv(){
            // openPay()
            if(null != vee.User.phone){
                // if(true){
                isshowPayDiv = true;
                oldCoin = vee.User.coin;
                var imgCode = "<?php echo urlencode(getCodeUrl('500'))?>";
                document.getElementById("payImg").src="php/wechatpay/example/qrcode.php?data=" + imgCode;
                $(document.getElementById("divPay")).removeClass('hidden');
            }
            else{
                alert("请先登录");
            }
        }

        $(document).ready(function () {
//        alert("hello world");
//        openPay(5);
//		window.localStorage.

            checkParame();
        });

    </script>

    <style>
        body { padding: 0px; }
    </style>

</head>
<body>
<div class="mainPage">
    <div class="header" style="background-color: #0080ff">
        <img src="static/image/home/top_image.jpg"/>
    </div>


    <div class="promo container-narrow">
        <div class="row-fluid">
            <div class="span4 seperator-small">

                <div class="row-fluid">
                    <img src="static/image/home/btn_signup.png" onclick="return showRegistDiv()">
                </div>
                <div class="row-fluid leftDiv">
                    <div class="box">
                        <div id="loginInfo" class="loginInfo">
                            <form onsubmit="return login(this)">
                                <div>
                                    <p>手机号:</p>
                                    <input class="formInput" type="text" name="username">
                                </div>
                                <div>
                                    <p>密&nbsp;&nbsp;&nbsp;码:</p>
                                    <input class="formInput" type="password" name="password">
                                </div>


                                <div style="padding-top: 10px;">
                                    <input class="" type="image" src="static/image/home/btn_signin.png" alt="submit"/>
                                    <!--<image class="btn_login" src="static/image/home/btn_signin.png" alt="submit" onclick="login(this)"/>-->
                                    <a href="mailto:hi@veewo.com" style="position:relative; left: 10px; top:20px;">忘记密码? </a>
                                </div>

                            </form>
                        </div>

                        <div id="userInfo" class="userinfo">
                            <p style="margin-left: auto; margin-right: auto;" id="div_username">账号：</p>
                            <p id="div_money">v币：</p>
                            <img style="padding-bottom: 30px;padding-top: 30px;" src="static/image/home/btn_logout.png" onclick="logout()">
                        </div>
                    </div>

                </div>
            </div>
            <div class="span8 seperator-small">
                <img src="static/image/home/image_1.png"/>
            </div>
        </div>
        <div class="row-fluid">
            <div class="span4 seperator-small">
                <div class="row-fluid">
                    <img class="openPay" src="static/image/home/btn_charge.png" onclick="return showPayDiv()"/>
                </div>
                <div class="row-fluid leftDiv">
                    <img src="static/image/home/image_client.png"/>
                </div>
            </div>
            <div class="span4 seperator-small">
                <img src="static/image/home/image_2.png"/>
            </div>
            <div class="span4 seperator-small">
                <a href="http://fir.im/supercate"><img src="static/image/home/image_3.png"/></a>
            </div>
            
        </div>
    </div>


    <div id="divRegist" class="modal hidden">

        <div class="modal_top"><h4 >用户注册</h4></div>
        <div class="reg_form ">
            <img class="close" src="static/image/home/btn_signup_close.png" onclick="return closeRegistDiv()"/>
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
    </div>

<!--    <div id="divPay" class="modal hidden payDiv">-->
<!--        <div class="modal_top"><h4 >充值</h4></div>-->
<!--        <img class="close" src="static/image/home/btn_signup_close.png" onclick="return closePayDiv()"/>-->
<!---->
<!--        <div class="payView">-->
<!--            <div>-->
<!--                <img src="static/image/home/btn_charge_5.png" onclick="return openPay(5)">-->
<!--            </div>-->
<!--            <div>-->
<!--                <p>V币用于幻影猫游戏内购买道具</p>-->
<!--            </div>-->
<!---->
<!--            <div style="padding-top: 30px">-->
<!--                <img src="static/image/home/btn_charge_10.png" onclick="return openPay(10)">-->
<!--            </div>-->
<!--            <div>-->
<!--                <p>V币用于幻影猫游戏内购买道具</p>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
    <div id="divPay" class="modal hidden popView" style="height : 420px;">
        <div class="modal_top" style="background-color: #d8f2ff; height : 40px;"><p style="color: #003399; font-size : 150%; margin-top: 10px;">微信扫一扫</p></div>
        <img class="close" src="static/image/home/btn_signup_close.png" onclick="return closePayDiv()"/>
        <div>
            <img id="payImg" alt="扫码支付" src="php/wechatpay/example/qrcode.php?data=<?php echo urlencode(getCodeUrl("500"));?>" style="width:240px;height:240px;"/>
            <br>
            <img src="static/image/home/btn_charge_5.png"">
        </div>

    </div>

    <div id="paySuccess" class="modal hidden popView">
        <div class="modal_top" style="background-color: #ddffbb; height : 40px;"><p style="color : #00b20d; font-size : 150%; margin-top: 10px;">支付成功</p></div>

        <div class="payView">
            <div>
                <img src="static/image/home/image_pay_success.png"/><br>
                <p id="curCoinLab">当前余额:</p>
            </div>
            <br>
            <div>
                <img src="static/image/home/btn_pay_ok.png" onclick="return hideDiv('paySuccess')"/>
            </div>

        </div>
    </div>

    <div id="payFail" class="modal hidden popView">
        <div class="modal_top" style="background-color: #ffdbd8; height : 40px;"><p style="color: #e14141; font-size : 150%; margin-top: 10px;">支付失败</p></div>

        <div class="payView">
            <div>
                <img src="static/image/home/image_pay_fail.png"/><br>
                <p>支付失败, 请再次尝试</p>
            </div>
            <br>
            <div>
                <img src="static/image/home/btn_pay_ok.png" onclick="return hideDiv('payFail')">
            </div>

        </div>
    </div>



    <div class="footer" style="padding-top: 30px">

        <div class="navigator-footer seperator">
            <div><a class="button" href="#">主页</a>&nbsp&nbsp/&nbsp&nbsp</div>
            <div><a class="button" href="games/">游戏</a>&nbsp&nbsp/&nbsp&nbsp</div>
            <div><a class="button" href="about.html">关于</a>&nbsp&nbsp/&nbsp&nbsp</div>
            <div><a class="button" href="jobs.html">工作</a>&nbsp&nbsp/&nbsp&nbsp</div>
            <div><a class="button" href="user.html">用户协议</a>&nbsp&nbsp/&nbsp&nbsp</div>
            <div><a class="button" href="privacy_cn.html">隐私政策</a>&nbsp&nbsp/&nbsp&nbsp</div>
            <div><a class="button" href="jiazhang.html">家长监护</a>&nbsp&nbsp/&nbsp&nbsp</div>
        </div>

        <div>
            <p>抵制不良游戏，拒绝盗版游戏，注意自我保护，谨防受骗上当，适度游戏益脑，沉迷游戏伤身，合理安排时间，享受健康生活。</p>
            <p>厦门微沃时刻有限公司     ©2014 Veewo Game</p>
            <p>地址：厦门市集美区集美大道1302号创业大厦1508室 电话：0592-6103797</p>
        </div>
        <div>
            <a target="_blank" href="http://bcainfo.miitbeian.gov.cn/publish/query/indexFirst.action">闽ICP备16011513号</a>
        </div>
    </div>

    <div class="bottom">
        <img src="static/image/home/icon_veewo.png">
    </div>

</div>




</body>
</html>