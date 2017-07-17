/**
 * Created by lixiongfeng on 16/8/10.
 */
$(document).ready(function(){
    function openwin(url) {
        var a = document.createElement("a");
        a.setAttribute("href", url);
        a.setAttribute("target", "_blank");
        a.setAttribute("id", "openwin");
        document.body.appendChild(a);
        a.click();
    }

    $("#register-form").validate({
        rules:{
            //邮箱注册
            user_email:{
                required:true,
                email:true,
            },
            email_password:{
                required:true,
            },
            email_repeat_password:{
                required:true,
                equalTo:"#email-password",
            },
            email_verify:{
                required:true,
            },
        },
        messages:{
            user_email:"邮箱格式不对",
            email_password:"密码不能为空,最短为6位",
            email_repeat_password:"两次输入密码不同",
            email_verify:"验证码不对",
        },
        submitHandler:function(form){
            //circle load
            $.showShCircle("shCircle");
            $.ajax({
                url:$("#register-form").attr("action"),
                type:"post",
                dataType:"json",
                data:{
                    user_email:$("#user-email").val(),
                    email_password: $.md5($("#email-password").val()),
                    email_repeat_password: $.md5($("#email-repeat-password").val()),
                    email_verify:$("#email-verify").val()
                },
                success:function(jsonData){
                    //circle load
                    $.closeShCircle("shCircle");
                    if(jsonData.flag == 1){
                        var url = $("#user-email").val();
                        var after_fix = url.split("@")[1];
                        var jump_url = "http://mail." + after_fix;
                        openwin(jump_url);
                        //window.location = $("#register-form").attr("data-jump");
                    }else{
                        alert(jsonData.msg);
                    }
                },
                error:function(jsonData){
                    //circle load
                    $.closeShCircle("shCircle");
                    console.log(jsonData);
                }
            });
        },
        errorContainer: "div.error",
        errorLabelContainer: $("#register-form div.error"),
        wrapper: "li",
        errorPlacement: function(error, element) {
            error.appendTo(element.parent());
        }
    });
});