<?php

require_once 'firebaseInterface.php';
require_once 'firebaseLib.php';
require_once 'firebaseStub.php';
/*
//订单支付成功处理
$uid = "15377935280";//$data["attach"];				//web端存储的支付用户id
$tradeNo = "tradeno=test";//$data["out_trade_no"];	//支付单号
$total = "1";//$data["total_fee"];		//支付金额
$timeEnd= "11223344";//$data["time_end"];		//支付完成时间
$data = array("uid" => $uid, "tradeNo" => $tradeNo, "total" => $total, "time" => $timeEnd);
*/

const DEFAULT_URL = 'https://yop-dev.firebaseio.com/PhantomCat/';
const DEFAULT_TOKEN = '';
const DEFAULT_PATH = '/orders';
/*
$firebase = new \Firebase\FirebaseLib(DEFAULT_URL, DEFAULT_TOKEN);

$value = $firebase->get("/users/".$uid."/coin/");
//$value = $firebase->set("users/".$uid."/coin/", 50);
print_r($value);

//$test = $firebase->set(DEFAULT_PATH . '/' . $tradeNo, $data);
//$test = $firebase->delete(DEFAULT_PATH);
//print_r($test);
*/


ini_set('date.timezone','Asia/Shanghai');
error_reporting(E_ERROR);

require_once "../lib/WxPay.Api.php";
require_once '../lib/WxPay.Notify.php';
require_once 'log.php';



//初始化日志
$logHandler= new CLogFileHandler("../logs/".date('Y-m-d').'.log');
$log = Log::Init($logHandler, 15);

const DEFAULT_URL = 'https://yop-dev.firebaseio.com/PhantomCat/';
const DEFAULT_TOKEN = '';
const DEFAULT_PATH = '/orders';

//echo print_r($log);

class PayNotifyCallBack extends WxPayNotify
{
	//查询订单
	public function Queryorder($transaction_id)
	{
		$input = new WxPayOrderQuery();
		$input->SetTransaction_id($transaction_id);
		$result = WxPayApi::orderQuery($input);
		Log::DEBUG("query:" . json_encode($result));
		if(array_key_exists("return_code", $result)
			&& array_key_exists("result_code", $result)
			&& $result["return_code"] == "SUCCESS"
			&& $result["result_code"] == "SUCCESS")
		{
			return true;
		}
		return false;
	}
	
	//重写回调处理函数
	public function NotifyProcess($data, &$msg)
	{
		Log::DEBUG("call back:" . json_encode($data));
		$notfiyOutput = array();


//		Log::DEBUG("zqdebug print appid===" . $data['appid']);
		
		if(!array_key_exists("transaction_id", $data)){
			$msg = "输入参数不正确";
			return false;
		}
		//查询订单，判断订单真实性
		if(!$this->Queryorder($data["transaction_id"])){
			$msg = "订单查询失败";
			return false;
		}

		$this->setDataByOrder($data);

		return true;
	}

	public function setDataByOrder($data){
		//订单支付成功处理
		$uid = $data["attach"];				//web端存储的支付用户id
		$tradeNo = $data["out_trade_no"];	//支付单号
		$total = $data["total_fee"];		//支付金额
		$timeEnd= $data["time_end"];		//支付完成时间
		if($total == "500"){
			$vcoin = 50;
		}
		elseif ($total == "1000"){
			$vcoin = 120;
		}
		$data = array("uid" => $uid, "tradeNo" => $tradeNo, "total" => $total, "time" => $timeEnd, "vcoin" => $vcoin);

		$firebase = new \Firebase\FirebaseLib(DEFAULT_URL, DEFAULT_TOKEN);

		$test = $firebase->set(DEFAULT_PATH . '/' . $tradeNo, $data);
		if(null != $test){
			$newCoin = $test["coin"] + $vcoin;
			$test = $firebase->set("users/".$uid."/coin/", $newCoin);
		}
		else{
			//支付失败
		}
	}
}

Log::DEBUG("begin notify server time=" . time());
$notify = new PayNotifyCallBack();
$notify->Handle(false);

