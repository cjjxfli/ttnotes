<?php
/**
 * Created by PhpStorm.
 * User: lixiongfeng
 * Date: 16/7/30
 * Time: 上午11:25
 */
namespace Home\Controller;

use Think\Controller;

class HomeController extends Controller
{
    public function _empty()
    {
        $this->redirect("Home/Index/index");
    }

    public function _initialize()
    {
        if (is_mobile()) {
            //设置默认默认主题为 Mobile
            C('DEFAULT_V_LAYER', 'Mobile');
        }
        $return_data = session("user_data");
        $user_id = session("user_id");
        if (empty($user_id)) {
            $user_id = 2;
            session("user_id", 2);
        }
        if (IS_POST) {
            if (!in_array(ACTION_NAME, C(ALLOW_VISIT_WITHOUT_LOGIN))) {
                if (empty($return_data)) {
                    $data_json = array("flag" => 0, "msg" => "您无权操作，请先登录！!");
                    $this->ajaxReturn($data_json);
                }
            }
        } else {
            if (!in_array(ACTION_NAME, C(ALLOW_VISIT_WITHOUT_LOGIN))) {
                if (empty($return_data)) {
                    $this->error("您无权操作，请先登录！", U('Home/Index/index'));
                }
            }
        }
        if (!empty($return_data)) {
            $this->assign("user_data", $return_data);
        }
//        $model_category = D("Categorys");
//        //获取根节点目录
//        $root_category = array();
//        $list  = $model_category->getSonsCategoryByUserID(-1,$user_id,1);
//        foreach($list as $k => $v){
//            $temp = array();
//            $temp["id"] = $v["id"];
//            $temp["name"] = $v["name_category"];
//            $temp["sub_categorys_count"] = $v["sub_categorys_count"];
//            $temp["files_include"] = $v["files_include"];
//            $temp["last_update_time"] = date("Y-m-d H:m",$v["last_update_time"]);
//            $root_category[] = $temp;
//        }
//        unset($list);
//        //获取收藏夹根节点目录
//        $fav_root_category = array();
//        $list  = $model_category->getSonsCategoryByUserID(-1,$user_id,2);
//        foreach($list as $k => $v){
//            $temp = array();
//            $temp["id"] = $v["id"];
//            $temp["name"] = $v["name_category"];
//            $temp["sub_categorys_count"] = $v["sub_categorys_count"];
//            $temp["files_include"] = $v["files_include"];
//            $temp["last_update_time"] = date("Y-m-d H:m",$v["last_update_time"]);
//            $fav_root_category[] = $temp;
//        }
//        unset($list);
//        //软件中心目录
//        $software_root_category = array();
//        $list  = $model_category->getSonsCategoryByUserID(-1,$user_id,3);
//        foreach($list as $k => $v){
//            $temp = array();
//            $temp["id"] = $v["id"];
//            $temp["name"] = $v["name_category"];
//            $temp["sub_categorys_count"] = $v["sub_categorys_count"];
//            $temp["files_include"] = $v["files_include"];
//            $temp["last_update_time"] = date("Y-m-d H:m",$v["last_update_time"]);
//            $software_root_category[] = $temp;
//        }
//        $this->assign("root_software_info",$software_root_category);
//        $this->assign("root_favorites_info",$fav_root_category);
//        $this->assign("root_category_info",$root_category);
        $this->assign("title", "我的笔记本");
    }
}