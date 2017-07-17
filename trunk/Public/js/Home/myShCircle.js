/**
 * Created by xfli on 2017/5/31.
 */
(function($){
    $.extend({
        showShCircle:function(obj_id){
            var id = "#";
            if(obj_id != null && obj_id != undefined){
                id += obj_id;
            }else {
                id = "#shCircle";
            }
            $("#shCircle").modal('show');
            $(id).shCircleLoader();
        },
        closeShCircle:function(obj_id){
            var id = "#";
            if(obj_id != null && obj_id != undefined){
                id += obj_id;
            }else {
                id = "#shCircle";
            }
            $(id).shCircleLoader("destroy");
            $("#shCircle").modal('hide');
        },
    });
    //$.fn.showShCircle = function(obj_id){
    //    var id = "#";
    //    if(obj_id != null && obj_id != undefined){
    //        id += obj_id;
    //    }else {
    //        id = "#shCircle";
    //    }
    //    $("#shCircle").modal('show');
    //    $(id).shCircleLoader();
    //};
    //$.fn.closeShCircle = function(obj_id){
    //    var id = "#";
    //    if(obj_id != null && obj_id != undefined){
    //        id += obj_id;
    //    }else {
    //        id = "#shCircle";
    //    }
    //    $(id).shCircleLoader("destroy");
    //    $("#shCircle").modal('hide');
    //}
})(jQuery);
