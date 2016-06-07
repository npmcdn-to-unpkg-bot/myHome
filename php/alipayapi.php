<?php
	 //$param = "hello world";
	 //echo $param;

    	require_once("alipay.config.php");
        require_once("lib/alipay_submit.class.php");

        $out_trade_no = $_GET['curTime'];
        $subject = $_GET['subject'];
        $total_fee = $_GET['total'];
        $show_url = $_GET['showurl'];
        $body = $_GET['body'];

	//function getSigin(){

		$parameter = array(
		"service"       => $alipay_config['service'],
		"partner"       => $alipay_config['partner'],
		"seller_id"  => $alipay_config['seller_id'],
		"payment_type"	=> $alipay_config['payment_type'],
		"notify_url"	=> $alipay_config['notify_url'],
		"return_url"	=> $alipay_config['return_url'],
		"_input_charset"	=> trim(strtolower($alipay_config['input_charset'])),
		"out_trade_no"	=> $out_trade_no,
		"subject"	=> $subject,
		"total_fee"	=> $total_fee,
		"show_url"	=> $show_url,
		"body"	=> $body,
		//其他业务参数根据在线开发文档，添加参数.文档地址:https://doc.open.alipay.com/doc2/detail.htm?spm=a219a.7629140.0.0.2Z6TSk&treeId=60&articleId=103693&docType=1
        //如"参数名"	=> "参数值"   注：上一个参数末尾需要“,”逗号。
		
		);
		$alipaySubmit = new AlipaySubmit($alipay_config);
		//return $alipaySubmit->buildRequestForm($parameter, "get", "确认");
	//}
	$sigin = $alipaySubmit->buildRequestForm($parameter, "get", "确认");
	echo $sigin;

?>