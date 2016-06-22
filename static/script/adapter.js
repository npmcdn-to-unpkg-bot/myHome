/**
 * Created by jack on 16/6/3.
 */

// document.write("<script language='javascript' src='static/script/admin.js'></script>");
// document.write("<script language='javascript' src='static/script/user.js'></script>");
// document.write("<script language='javascript' src='static/script/jsencrypt/jsencrypt.min.js'></script>");
// document.write("<script language='javascript' src='static/script/regist.js'></script>");

function refreshUserInfoDiv(){
    // var userInfoDiv = document.getElementById("userInfo");
    var username = document.getElementById("div_username");
    var money = document.getElementById("div_money");
    if(username && money){
        username.innerHTML="账号："+vee.User.phone;
        money.innerHTML="v币：" + vee.User.coin;
    }

    if(isshowPayDiv && oldCoin < vee.User.coin){
        closePayDiv();
        showDiv("paySuccess");
        document.getElementById("curCoinLab").innerHTML = "当前余额: " + vee.User.coin;
    }
}

function loginByUrlParam(username, password) {

    vee.User.phone = username;
    window.location.href="pay.php?uid="+username;
    //
    // Flow.do(vee.User.FlowLogin).onResult(
    //     function (result) {
    //         if(result){
    //             alert(result);
    //         }
    //         else{
    //             // window.location.href="../../index.php?uid="+username+"&psw="+password;
    //             window.location.href="pay.php?uid="+username;
    //         }
    //     }.bind(this)
    // ).go();
}

function gotoRegistUrl(){
    window.location.href = "regist.php";
}

function checkAdapterParame() {
    var urlInfo = window.location.href;
    // var len = urlInfo.length;
    // var offset = urlInfo.indexOf("?");
    // var paramInfo = urlInfo.substr(offset+1, len);
    // var paramList = paramInfo.split("=");
    var paramList = getParamListByUrl(urlInfo);
    var firstParam = getParamValueByParamList(paramList, 0);
    if("phoneAction" == firstParam["key"]){
        if("regist" == firstParam["value"]){
            // showRegistDiv();
            gotoRegistUrl();
        }
        else if("pay" == firstParam["value"]){
            var userParam = getParamValueByParamList(paramList, 1);
            // var pswParam = getParamValueByParamList(paramList, 2);
            var username = "";
            if("username" == userParam.key){
                username = userParam.value;
            }
            loginByUrlParam(username);
        }
        else if("newplayer" == firstParam["value"]){
            var param = getParamValueByParamList(paramList, 1);
            if("uid" == param.key){
                // alert(param.value);
                return "test";
            }
        }
    }
}
