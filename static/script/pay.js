/**
 * Created by jack on 16/6/8.
 */


function getSign(curTime, subject, total, showurl, body) {
    // var sign =
    // callPage('php/alipayapi.php?curTime='+curTime + "&subject=" + subject + "&total=" + total + "&showurl=" + showurl + "&body=" + body);
    var http = "php/alipayapi.php?curTime="+curTime + "&subject=" + subject + "&total=" + total + "&showurl=" + showurl + "&body=" + body;
    window.location.href = http;
}

function openPay(value){
    //time
    var cDate = new Date();
    var time = cDate.getFullYear() + "-" + (cDate.getMonth()+1) + "-" + cDate.getDate() + " " + cDate.getHours() + ":" + cDate.getMinutes() + ":" + cDate.getSeconds();

    var alipay = false;
    if(alipay){
        getSign(time, "test", "0.01", "http://veewogames.cn/index.html", "test");
    }

    var wechatpay = true;
    if(wechatpay){
        window.location.href= "php/wechatpay/example/native.php?user=" + vee.User.phone;
    }
}

function setOrder(uid, tradeNo, total, timeEnd){
    // alert("uid=="+uid+"   trade=="+tradeNo+"  total=="+total+ "   timeend=="+timeEnd);
    // alert("fuck");
    Flow.do(vee.Order.setOrder, uid, tradeNo, total, timeEnd).onResult().go();
}