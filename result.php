<?php
/**
 * Created by PhpStorm.
 * User: jack
 * Date: 16/6/22
 * Time: 下午8:05
 */
//echo "fuck";

//return false;
//return "fuck";
require_once "php/wechatpay/lib/WxPay.Api.php";
require_once "php/wechatpay/example/WxPay.NativePay.php";
require_once 'php/wechatpay/example/log.php';

require_once 'php/wechatpay/example/firebaseInterface.php';
require_once 'php/wechatpay/example/firebaseLib.php';
require_once 'php/wechatpay/example/firebaseStub.php';

const DEFAULT_URL = 'https://yop-dev.firebaseio.com/PhantomCat/';
const DEFAULT_TOKEN = '';
const DEFAULT_PATH = '/orders';

$action = $_GET["action"];

if($action == "checkpay"){
    $uid = $_GET["uid"];
    $orderId = $_GET["oid"];
    $firebase = new \Firebase\FirebaseLib(DEFAULT_URL, DEFAULT_TOKEN);
//    $newCoin = $firebase->get("/users/" . $uid . "/coin");
    $result = $firebase->get(DEFAULT_PATH . "/" . $orderId);

    if(isset($_GET["paytest"])){
        $data = array("time"=>"20160623185748", "total"=>"1", "tradeNo"=>$orderId, "uid"=>$uid, "vcoin"=>50);
        $test = $firebase->set(DEFAULT_PATH . '/' . $orderId, $data);
        echo $test;
    }
    else if($result && $result != "null"){
        $newCoin = $firebase->get("/users/" . $uid . "/coin");
        echo $newCoin;
    }
    else{
        echo "fail";
    }
//    else{
//        echo $newCoin;
//    }
}


//$firebase->set("/users/" . $tmpUid . "/coin", $newCoin + 1);


