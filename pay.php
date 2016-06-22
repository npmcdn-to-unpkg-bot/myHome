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

if(!isset($_GET["uid"])){
    echo "页面出错";
}

$tmpUid = $_GET["uid"];
$firebase = new \Firebase\FirebaseLib(DEFAULT_URL, DEFAULT_TOKEN);
$oldCoin = $firebase->get("/users/" . $tmpUid . "/coin");

$firebase->set("/users/15377935280/coin", $oldCoin+1);

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
    <title>支付 | Veewo</title>

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="static/css/bootstrap.min.css" rel="stylesheet"/>
    <link href="static/css/bootstrap-responsive.min.css" rel="stylesheet"/>
    <link rel="stylesheet" type="text/css" href="static/css/style.css">
    <script type="text/javascript" src="static/script/flow.js"></script>
    <script type="text/javascript" src="static/script/jquery-latest.min.js"></script>
    <script type="text/javascript" src="static/script/pay.js"></script>

    <script type="text/javascript">
        function showTime(){
            <?php
//                $firebase->set("users/".$tmpUid."/coin", 200);  //debug
                $newCoin = $firebase->get("/users/" . $tmpUid . "/coin");
                if($newCoin > $oldCoin){
//                    echo "alert('充值成功')";
                    echo "showDiv('paySuccess')";
                }
                else{
//                    echo "alert('充值未成功')";
                }
            ?>
        }
        function reloadFunc() {
            window.setInterval("showTime()", 3000);
        }
        window.onload = reloadFunc();
    </script>

</head>
<body>

    <div class="payView">
        <div>
            <img alt="扫码支付" src="php/wechatpay/example/qrcode.php?data=<?php echo urlencode(getCodeUrl("1"));?>" style="width:240px;height:240px;"/>
            <br><br><br>
            <img src="static/image/home/btn_charge_5.png"">
        </div>

    </div>

    <div id="paySuccess" class="modal hidden popView">
        <div class="modal_top" style="background-color: #ddffbb; height : 40px;"><p style="color : #00b20d; font-size : 150%; margin-top: 10px;">支付成功</p></div>

        <div class="payView">
            <div>
                <img src="static/image/home/image_pay_success.png"/><br>
                <p>当前余额:&nbsp<?php $newCoin?></p>
            </div>
            <br>
            <div>
                <img src="static/image/home/btn_pay_ok.png" onclick="return gohome()"/>
            </div>

        </div>
    </div>

    <div id="payFail" class="modal hidden popView">
        <div class="modal_top" style="background-color: #ffdbd8; height : 40px;"><p style="background-color: #e14141; font-size : 150%; margin-top: 10px;">支付失败</p></div>

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

</body>
</html>