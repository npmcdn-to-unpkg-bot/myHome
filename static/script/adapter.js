/**
 * Created by jack on 16/6/3.
 */

document.write("<script language='javascript' src='static/script/admin.js'></script>");
document.write("<script language='javascript' src='static/script/user.js'></script>");
document.write("<script language='javascript' src='static/script/jsencrypt/jsencrypt.min.js'></script>");
document.write("<script language='javascript' src='static/script/regist.js'></script>");

function loginByUrlParam(username, password) {

    vee.User.phone = username;
    vee.User.psw = password;

    Flow.do(vee.User.FlowLogin).onResult(
        function (result) {
            if(result){
                alert(result);
            }
            else{
                
                window.location.href="../../index.php";
            }
        }.bind(this)
    ).go();
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
            showRegistDiv();
        }
        else if("pay" == firstParam["value"]){
            var userParam = getParamValueByParamList(paramList, 1);
            var pswParam = getParamValueByParamList(paramList, 2);
            var username = "", password = "";
            if("username" == userParam.key){
                username = userParam.value;
            }
            if("password" == pswParam.key){
                password = pswParam.value;
            }
            loginByUrlParam(username, password);
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
