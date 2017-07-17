/**
 * Created by xf.li on 2017/4/19.
 */
$(function(){
    //提交表单
    $("#add-article-form").validate({
        rules:{
            user_email:{
                isNeedEmail:true,
            },
            verify_email_code:{
                isNeedEmailCode:true,
            },
            mobile:{
                isNeedMobile:true,
            },
            verify_mobile_code:{
                isNeedMobileCode:true,
            },
        },
        messages:{
        },
        submitHandler:function(form){
            //circle load
            $.showShCircle("shCircle");
            $.ajax({
                url:$("#add-article-form").attr("action"),
                type:"post",
                dataType:"json",
                data:{
                    article_title:$("#article-title").val(),
                    article_key_words:$("#article-key-words").val(),
                    article_from_where:$("#article-from-where").val(),
                    article_abstract:$("#article-abstract").val(),
                    extra_editor:UE.getEditor("extra-editor").getContent(),
                    category_id:$("#add-article-form").attr("data-category-id"),
                },
                success:function(jsonData){
                    //circle load
                    $.closeShCircle("shCircle");
                    if(jsonData.flag == 1){
                        window.location = $("#add-article-form").attr("data-jump");
                    }else{
                        alert(jsonData.msg);
                    }
                },
                error:function(jsonData){
                    alert(jsonData);
                    //circle load
                    $.closeShCircle("shCircle");
                }
            });
        },
        errorContainer: "div.error",
        errorLabelContainer: $("#add-article-form div.error"),
        wrapper: "li",
        errorPlacement: function(error, element) {
            error.appendTo(element.parent());
        }
    });

    //历史返回
    $("#last-history").on("click",function(){
        history.go(-1);
    });
});