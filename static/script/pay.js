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

    getSign(time, "test", "0.01", "http://veewogames.cn/index.html", "test");

}