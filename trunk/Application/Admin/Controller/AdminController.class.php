<?php
/**
 * Created by PhpStorm.
 * User: lixiongfeng
 * Date: 16/7/30
 * Time: 上午11:25
 */
namespace Admin\Controller;
use Think\Controller;

/**
 * 后台管理的基类,主要是做一些全局的设置过滤等
 * Class AdminController
 * @package Admin\Controller
 */
class AdminController extends Controller{
    public function _empty(){
        $this->redirect("Admin/Index/index");
    }

    public function _initialize(){
        if (is_mobile()) {
            //设置默认默认主题为 Mobile
            C('DEFAULT_V_LAYER','Mobile');
        }
        $return_data = session("user_data");
        $user_id = session("user_id");
        if(empty($user_id)){
            $this->redirect('Admin/User/login', 5, '请登录');
        }
        if(IS_POST){
            if(!in_array(ACTION_NAME,C(ALLOW_VISIT_WITHOUT_LOGIN))){
                if(empty($return_data)){
                    $data_json = array("flag" => 0,"msg" => "您无权操作，请先登录！!");
                    $this->ajaxReturn($data_json);
                }
            }
        }else{
            if(!in_array(ACTION_NAME,C(ALLOW_VISIT_WITHOUT_LOGIN))){
                if(empty($return_data)){
                    $this->error("您无权操作，请先登录！",U('Admin/User/login'));
                }
            }
        }
        if(!empty($return_data)){
            $this->assign("user_data",$return_data);
        }
        $this->assign("title","我的笔记本");
    }
}