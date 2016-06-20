function check_email(string) {
    if(!(string && /[a-zA-Z0-9_+.-]+\@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,4}$/.test(string))){
        return "不是有效的邮件地址。";
    }
    return null;
}

function check_psw(string) {
    if(!(string && /[a-zA-Z0-9_@]{6,16}$/.test(string))){
        return "密码只能包含数字字母和下划线，长度为6~16字符。";
    }
    return null;
}

function check_name(string) {
    if(!(string && /[a-zA-Z0-9]{3,20}$/.test(string))){
        return "显示名只能包含数字和字母，长度为3~20字符。";
    }
    return null;
}

function check_idCard(string){
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if(!(string && reg.test(string))){
        return "身份证号填写有误";
    }
    return null;
}


function check_reallName(string){
    var regName =/^[\u4e00-\u9fa5]{2,4}$/;
    if(!(string && regName.test(string))){
        return "真实姓名填写有误";
    }
    return null;
}

function check_phone(string){
    var reg = /(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
    if(!(string && reg.test(string))){
        return "不是有效的电话号码";
    }
    return null;
}

function trim(str){ //删除左右两端的空格
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

function ltrim(str){ //删除左边的空格
    return str.replace(/(^\s*)/g,"");
}

function rtrim(str){ //删除右边的空格
    return str.replace(/(\s*$)/g,"");
}

function check_string_lenth(string, min, max) {
    string = trim(string);
    if(!string || string.lengt==0){
        return "字符串不能为空";
    }    
    if(string.length < min){
        return "字符串长度不能少于" + min + "字符";
    }
    else if(string.length > max){
        return "字符串长度不能超过" + max + "字符";
    }
    else if(! /[^"”“‘’']$/.test(string) && string.length > 0){
        return "字符串不能包含引号"
    }
    return null;
}

function show_info(alert_id, msg, type, auto_hide)
{
    type = (type == null ? '' : ' alert-' + type);
    var a = $('#' + alert_id);
    a.clearQueue();
    a.removeClass();
    a.addClass('alert' + type);
    $('#' + alert_id + '>p').html(msg);
    a.fadeIn();
    if(auto_hide)
    {
        a.delay(2000);
        a.fadeOut();
    }
    return a;
}

/*
 * BEGIN
 * pagination control
 * 需要在页面上实现 request_data(page) 方法
 * 参数 page 为请求的页码 
 */

function pagi_update(direction, auto_loadd){
    var total_page = $('#total_page').html();
    var base_page = parseInt($('#base_page').html());
    if(total_page == 1)
    {
        $('.pagination').addClass('invisible');
    }
    else
    {
        $('.pagination').removeClass('invisible');        
        var pending_base = base_page + direction*5;
        if(pending_base < 0 || pending_base >= total_page) return;
        
        base_page = pending_base;    
        $('#base_page').html(base_page);
        
        $(".pagination [href*='pagi_update']").remove();
        $(".pagination [href*='page_selected']").remove();
        
        var prev_pagi = $('.prev_pagi');
        
        if(base_page+5 < total_page)
        {
            prev_pagi.after('<li><a href="javascript:pagi_update(1,true);">...</a></li>');
        }
        
        var count = (base_page+5 > total_page ? total_page : base_page+5);
        for(var i = count; i > base_page; i--)
        {
            prev_pagi.after('<li><a href="javascript:page_selected('+ i +');">' + i + '</a></li>');
        }
        
        if(base_page > 0)
        {
            prev_pagi.after('<li><a href="javascript:pagi_update(-1,true);">...</a></li>');
        }
    }
    if(auto_loadd)
    {
        page_selected( direction < 0 ? count : base_page+1 );
    }
}

function page_move(direction){
    var current_page = $('#current_page').html();
    var page = parseInt(current_page) + direction;
    var total_page = $('#total_page').html();
    var base_page = $('#base_page').html();
    
    //update pagi
    if(page <= base_page) pagi_update(-1,true);
    else if(page > base_page + 5) pagi_update(1,true);
    else if(page > 0 && page <= total_page) page_selected(page);    
}

function page_selected(page){    
    var total_page = $('#total_page').html();
    if(page > total_page || page <= 0) return;
    
    var pagi_a = $(".pagination [href*='page_selected(" + page + ")']");
    var active_a = $('.pagination .active a');        
    if(page == active_a.html()) return;        
    if(/[0-9]$/.test(page))
    {
        active_a.parent().removeClass('active');
        pagi_a.parent().addClass('active');
        request_data(page);
        $('#current_page').html(page);
    }
    
    var prev_pagi = $('.prev_pagi');
    prev_pagi.removeClass('disabled');
    
    var next_pagi = $('.next_pagi');
    next_pagi.removeClass('disabled');
    
    //update prev_pagi state 
    if(page == 1)
    {
        prev_pagi.addClass('disabled');
    }
    //update next_pagi state
    else if(page == total_page)
    {
        next_pagi.addClass('disabled');
    }
}

function getParamListByUrl(url){
    var len = url.length;
    var offset = url.indexOf("?");
    var paramInfo = url.substr(offset+1, len);
    var paramList = paramInfo.split("&");
    return paramList;
}

function getParamValueByParamList(paramList, index){
    if(index >= paramList.length || index < 0) return null;

    var param = paramList[index];
    var k = "", v = "";
    if(param){
        var offset = param.indexOf("=");
        var len = param.length;
        k = param.substr(0, offset);
        v = param.substr(offset + 1, len);
    }
    return {key : k, value : v};
}

/*
 * pagination control
 * END
 */


$(document).ready(function(){
});