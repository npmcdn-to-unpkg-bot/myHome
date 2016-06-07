/**
 * Created by jack on 16/5/31.
 */

document.write("<script language='javascript' src='static/script/admin.js'></script>");
document.write("<script language='javascript' src='static/script/user.js'></script>");

document.write("<script language='javascript' src='static/script/rsa/Barrett.js'></script>");
document.write("<script language='javascript' src='static/script/rsa/BigInt.js'></script>");
document.write("<script language='javascript' src='static/script/rsa/RSA.js'></script>");
// document.write("<script language='javascript' src='static/script/jsencrypt/jsencrypt.min.js'></script>");
function validate_required(field, checkInfo)
{
    if(checkInfo){
        with (field)
        {
            alert(checkInfo);
            field.focus();
            return true;
        }
    }
    return false;
}

function validate_form(thisform)
{
    with (thisform)
    {
        if(validate_required(username, check_name(username.value))){
            return false;
        }

        if(validate_required(password, check_psw(password.value))){
            return false;
        }

        if(repassword.value != password.value) {
            alert("两次输入的密码不一致,请重新输入");
            repassword.focus();
            return false;
        }

        if(validate_required(idCard, check_idCard(idCard.value))){
            return false;
        }

        if(validate_required(phone, check_phone(phone.value))){
            return false;
        }

        if(validate_required(email, check_email(email.value))){
            return false;
        }

        // if(validate_required(verCode, check_verCode(verCode.value))){
        //     return false;
        // }

        // alert("注册成功");
        registEvent(thisform);

        return false;
    }
}

function registEvent(thisform){
    with(thisform){
        vee.User.ID = idCard.value;
        vee.User.phone = phone.value;
        vee.User.coin = 0;
        vee.User.email = email.value;
        vee.User.psw = password.value;
        Flow.do(vee.User.FlowUpdate).onResult(
            registResult
        ).go();
    }
    return true;
}

function registResult(isSuccess) {
    if(isSuccess){
        alert("注册成功");
        var registform = document.getElementById("divRegist");
        registform.style.display="none";
        registform.style.visibility="hidden";
        // registform.hidePopup();
    }
    else{
        alert("注册失败,请联系客服");
    }
}


function login(thisform) {
    with(thisform){

        if(validate_required(username, check_phone(username.value))){
            return false;
        }

        if(validate_required(password, check_psw(password.value))){
            return false;
        }

        vee.User.phone = username.value;
        vee.User.psw = password.value;

        Flow.do(vee.User.FlowLogin).onResult(
            function (result) {
                if(result){
                    alert(result);
                }
                else{
                    loginEvent();
                }
            }.bind(this)
        ).go();
    }
    return false;
}



function showRegistDiv(){
    $(document.getElementById("divRegist")).removeClass('hidden');
}

function closeRegistDiv(){
    $(document.getElementById("divRegist")).addClass('hidden');
}

function showPayDiv(){
    // openPay()
    if(null != vee.User.phone){
        $(document.getElementById("divPay")).removeClass('hidden');
    }
    else{
        alert("请先登录");
    }
}

function closePayDiv(){
    $(document.getElementById("divPay")).addClass('hidden');
}

function showInfoDiv(){
    var userInfoDiv = document.getElementById("userInfo");
    var loginDiv = document.getElementById("loginInfo");
    loginDiv.style.display="none";
    userInfoDiv.style.display="block";

    // refreshUserInfoDiv();
}

function showLoginDiv(){
    var userInfoDiv = document.getElementById("userInfo");
    var loginDiv = document.getElementById("loginInfo");
    loginDiv.style.display="block";
    userInfoDiv.style.display="none";
}

function refreshUserInfoDiv(){
    // var userInfoDiv = document.getElementById("userInfo");
    var username = document.getElementById("div_username");
    var money = document.getElementById("div_money");
    if(username && money){
        username.innerHTML="账号："+vee.User.phone;
        money.innerHTML="v币：" + vee.User.coin;
    }

}

function loginEvent(){
    // alert("登录成功,刷新用户信息");
    showInfoDiv();
}

function logout(){
    vee.User.logout();
    showLoginDiv();
    // alert("登出成功");
}

function authorize() {
    var md5="ww22nyxkt91ytk0j9qd0kx59nxeokz3y";
    var http = "https://openauth.alipay.com/oauth2/appToAppAuth.htm?";
    http += "app_id=" + "123456";
    http += "redirect_uri=" + "";
}

function getSign(curTime, subject, total, showurl, body) {
    // var sign =
    // callPage('php/alipayapi.php?curTime='+curTime + "&subject=" + subject + "&total=" + total + "&showurl=" + showurl + "&body=" + body);
    var http = "php/alipayapi.php?curTime="+curTime + "&subject=" + subject + "&total=" + total + "&showurl=" + showurl + "&body=" + body;
    window.location.href = http;
}

function openPay(value){
    // alert(value);
    var head = "https://openapi.alipay.com/gateway.do?";
    //time
    var cDate = new Date();
    var time = cDate.getFullYear() + "-" + (cDate.getMonth()+1) + "-" + cDate.getDate() + " " + cDate.getHours() + ":" + cDate.getMinutes() + ":" + cDate.getSeconds();
/*
    var params = "";
    params += "app_id=" + "2016060201471580";                    //设置appid
    var content = {
        "body" : "test",
        "subject" : "test",
        "out_trade_no" : "123456789",
        "timeout_express" : "90m",
        "total_amount" : "0.01",
        "seller_id" : "",
    }
    params += "&biz_content=" + content;
    params += "&charset=" + "utf-8";
    params += "&format=JSON";
    params += "&method=" + "alipay.trade.wap.pay";                  //设置接口名称
    params += "&notify_url=" + "http://veewogames.cn/home.html";
    params += "&return_url=" + "http://veewogames.cn/home.html";    //http/https开头字符串
    params += "&sign_type=" + "RSA";
    params += "timestamp=" + time;                                  //设置时间
    params += "&version=" + "1.0";

    // alert(params);

    //params += "&sign=" + getSign(params);

    //head += params;
    // head += "&app_auth_token=" + "";


    // window.location.href = head;
    */
    getSign(time, "test", "0.01", "http://veewogames.cn/index.html", "test");

}



/*
function getSign(content){
    var key = "MIICXQIBAAKBgQC/E/Z70NE81TvazraTTjnwVrAisBgqCG1Fz7oDGnGjfqZCAv03" +
        "WKvhulySzWkP/0RDvhNMfVnVw8G6/5S/h+/iSdTOdYyOiRuefrkmWjdTg8o8Hv2U" +
        "iNpcsvrn2+oFmoV6oCF4crbspitTcEirIgjCQzbmj4UDTGLg77wvLCpQ2wIDAQAB" +
        "AoGAGzDODISEofF+GP79gCzLleXgHq+MYL7ePeb3g2WJ8kgdhJtESVH286I/diyA" +
        "3OPoZPNxb5sO45p9wQyJsE+51OzWZ8rqJjnc79Uj3oVvldvtK9MT6itTq3FZlLXk" +
        "K2vFM7FnKT5Liy8NbDjpLG8JGX12JRyRsuphUQf2DvCaYxECQQDdsl6K3CO4b9vE" +
        "v2LrVc23GnaVmnH5rR0tJ3vuAK8NImjKVOhjgV6l4uIbwWw6yJMstAzYgUF0djXF" +
        "dl2hWgR/AkEA3KTAzbQQcuybMjcmtj+WED2V/HcjrZiOmydq2If2wMGtdfmCITHk" +
        "A3NW+Am07uUI+MPkPHR7S1+XT6FB9bkVpQJAI0FYU5DKhWwUcOdWncIZYsLslMHo" +
        "2iGzgBjFVoX5UIdmTrbN9fT+zjaUaoGJ6pc3AGbpnAyCEjkyN+Ko5R3hlQJBALtx" +
        "y8n1ezPnBkG20NBrXJUXfOAqZskHnb750a96cop2/2IGQiLpO4gi6HN365o4QVL1" +
        "OGSToFr8LpObr2mNf3ECQQCIrgJIs8GnsYib/ec4L3UgpnoLUmGZEL0iLPCOtx8t" +
        "Te/ZBNsZYq7KdfRvcTia4tLVwCHddCns4JwFuaIdQc0j";

    var maxDigits = key.length/2 + 3;
    setMaxDigits(maxDigits);

    var key = new RSAKeyPair("10001", '', key);
    var sign = encryptedString(key, content);
    alert(sign);
    return sign;
}*/

function checkParame() {
    var urlInfo = window.location.href;
    var len = urlInfo.length;
    var offset = urlInfo.indexOf("?");
    var paramInfo = urlInfo.substr(offset+1, len);
    var paramList = paramInfo.split("=");

    if("phoneAction" == paramList[0]){
        if("regist" == paramList[1]){
            showRegistDiv();
        }
        else if("pay" == paramList[1]){
            showPayDiv();
        }
    }
}


function AjaxCaller(){
    var xmlhttp = false;
    try{
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    }catch (e){
        try{
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }catch (E){
            xmlhttp = false;
        }
    }

    if(!xmlhttp && typeof XMLHttpRequest != 'undefined'){
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}

function callPage(url){
    ajax = AjaxCaller();
    ajax.open("GET", url, true);
    ajax.onreadystatechange = function () {
        if(ajax.readyState == 4){
            if(ajax.status == 200){
                // div.innerHTML = ajax.responseText;
                // alert(ajax.responseText);
            }
        }
    }
    ajax.send(null);
}


