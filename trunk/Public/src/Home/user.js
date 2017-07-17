/**
 * Created by lixiongfeng on 16/8/10.
 */
$(document).ready(function(){
    $("#img-verify-email").click(function(){
        var verifyimg = $("#img-verify-email").attr("src");
        if( verifyimg.indexOf('?')>0){
            $(this).attr("src", verifyimg+'&random='+Math.random());
        }else{
            $(this).attr("src", verifyimg.replace(/\?.*$/,'')+'?'+Math.random());
        }
    });

    // --- 隐藏所有
    function HideAll() {
        var items = $(".submenu");
        for (var j=0; j<items.length; j++) {
            //items[j].style.display = "none";
            $(items[j]).parent().removeClass("open");
            $(items[j]).css("display","none");
        }
    }

    // --- 设置cookie
    function setCookie(sName,sValue,expireHours) {
        var cookieString = sName + "=" + encodeURI(sValue);
        //;判断是否设置过期时间
        if (expireHours>0) {
            var date = new Date();
            date.setTime(date.getTime() + expireHours * 3600 * 1000);
            cookieString = cookieString + ";expire=" + date.toGMTString();
        }
        cookieString += ";path=/";
        //console.log("cookie="+cookieString);
        //var allCookie = document.cookie;
        //console.log("before setCookie,all cookie="+allCookie);
        document.cookie = cookieString;
    }

    //--- 获取cookie
    function getCookie(sName) {
        //var aCookie = document.cookie.split(";");
        var allCookie = document.cookie;
        var aCookie = $.trim(allCookie);
        //为什么需要一个空格？
        aCookie = aCookie.split("; ");
        //console.log("getCookie all cookie="+allCookie+",aCookie length="+ aCookie.length);
        //console.log("getCookie="+aCookie);
        for (var j=0; j < aCookie.length; j++){
            var aCrumb = aCookie[j].split("=");
            if (sName == aCrumb[0])
                return decodeURI(aCrumb[1]);
        }
        return null;
    }

    function delCookie(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval=getCookie(name);
        if(cval!=null)
            document.cookie= name + "="+cval+";expires="+exp.toGMTString()+";path=/";
    }


    var Accordion = function(el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;

        // Variables privadas
        var links = this.el.find('.link');
        // Evento
        links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown);
   };

    Accordion.prototype.dropdown = function(e) {
        var $el = e.data.el;
        $this = $(this),
            $next = $this.next();

        $next.slideToggle();
        $this.parent().toggleClass('open');

        if (!e.data.multiple) {
            $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
        }else{
            var url = $el.find("a").first().attr("href");
            console.log("url="+url);
        }
    };

    //var accordion = new Accordion($('#accordion'), false);

    function setActiveItem(){
        var all_a_obj = $(".submenu a");
        var active_a_index = getCookie("active_item");
        for(var i = 0;i < all_a_obj.length; i++){
            if($(all_a_obj[active_a_index]).html() == $(all_a_obj[i]).html()){
                $(all_a_obj[active_a_index]).addClass("active");
                break;
            }
        }
    }
    //订单详情
    $(".order-details").on("click",function(){
        var url = $(this).attr("data-jump");
        window.location = url;
    });

    //重新绑定手机或邮箱
    $("#to-rebinding-mobile,#to-rebinding-email").on("click",function(event){
        event.preventDefault();
        //var active_obj = $(".submenu a.active");
        var all_a_obj = $(".submenu a");
        var active_a_index = 0;
        for(var i = 0;i < all_a_obj.length; i++){
            if($(".submenu .active").html() == $(all_a_obj[i]).html()){
                active_a_index = i+1;
                break;
            }
        }
        console.log("active index="+active_a_index);
        setCookie("active_item",active_a_index,24);
        //$(this).addClass("active");
        var url = $(this).attr("data-jump");
        window.location = url;
    });

    //获取手机验证码
    $("#binding-mobile").on("click",function(event){
        var this_obj = "#binding-mobile";
        event.preventDefault();
        var mobile_number = $("#"+$(this).attr("name")).val();
        if(mobile_number == "" || mobile_number == undefined){
            alert("手机号不能为空");
            return;
        }
        $.ajax({
            url:$(this).attr("data-href"),
            method:"post",
            dataType:"json",
            data:{
                mobile:$("#"+$(this).attr("name")).val()
            },
            success:function(jsonData){
                if(jsonData.flag == 1){
                    alert(jsonData.msg);
                }else{
                    alert(jsonData.msg);
                }
            },
            error:function(jsonData){
                console.log(jsonData);
            }
        });
        //var max_time = 60 * 1000;
        var cur_time = 180;

        $(this_obj).addClass("disabled");
        var timer = window.setInterval(function(){
            if(cur_time <= 1){
                $(this_obj).html("获取手机验证码");
                $(this_obj).removeClass("disabled");
                clearInterval(timer);
                return;
            }
            console.log("time now="+cur_time);
            cur_time--;
            var html = cur_time + "秒";
            $(this_obj).html(html);
        },1000);
    });

    //click event
    $(".submenu a").on("click",function(){
        var all_a_obj = $(".submenu a");
        var active_a_index = 0;
        for(var i = 0;i < all_a_obj.length; i++){
            if($(this).html() == $(all_a_obj[i]).html()){
                active_a_index = i;
                break;
            }
        }
        console.log("active index="+active_a_index);
        setCookie("active_item",active_a_index,24);
        //设置活动URL
        setCookie("last_url",$(all_a_obj[active_a_index]).attr("href"),24);
        $(this).addClass("active");
    });

    var last_url = getCookie("last_url");
    var SELF = $("#accordion").attr("data-self");
    console.log("last_url="+last_url+",SELF="+SELF);
    //if(last_url != SELF && last_url != undefined){
    //    window.location = last_url;
    //    //delCookie("last_url");
    //    return;
    //}

    var show_item = "opt_1";
    var opt_cookie = getCookie("show_item");
    console.log("opt_cookie="+opt_cookie);
    if (opt_cookie != null || opt_cookie != undefined) {
        show_item= "opt_" + opt_cookie;
    }
    //console.log("show_item="+show_item);
    $("#"+show_item).parent().addClass("open");
    $("#"+show_item).css("display","block");

    setActiveItem();

    //document.getElementById(show_item).style.display = "block";
    var items = $(".link"); //document.getElementsByClassName("title");
    for (var j=0; j<items.length; j++) {
        items[j].onclick = function() {
            var o = $("#opt_"+$(this).attr("name")); //document.getElementById("opt_" + this.name);
            if(!$(o).parent().hasClass("open")){
                HideAll();
                $(o).parent().addClass("open");
                $(o).css("display","block");
                //delCookie("show_item");
                setCookie("show_item",$(this).attr("name"),24);
                console.log("children="+$(o).children("li").html());
                $(o).children("li").first().addClass("active");
                var url = $(o).find("a").first().attr("href");
                var all_a_obj = $(".submenu a");
                var active_a_index = 0;
                for(var i = 0;i < all_a_obj.length; i++){
                    if($(o).find("a").first().html() == $(all_a_obj[i]).html()){
                        active_a_index = i;
                        break;
                    }
                }
                setCookie("active_item",active_a_index,24);
                window.location = url;
            }else{
                $(o).parent().removeClass("open");
                $(o).css("display","none");
                $(o).children("li").removeClass("active");
            }
            //if (o.style.display != "block") {
            //    HideAll();
            //    o.style.display = "block";
            //    setCookie("show_item",this.name);
            //}
            //else {
            //    o.style.display = "none";
            //}
        }
    }
});