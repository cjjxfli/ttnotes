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
        //
    }

    public function _initialize(){
        //parent::_initialize();
//        $auth=new \Think\Auth();
//        $rule_name=MODULE_NAME.'/'.CONTROLLER_NAME.'/'.ACTION_NAME;
//        $result=$auth->check($rule_name,$_SESSION['user']['id']);
//        if(!$result){
//            $this->error('您没有权限访问');
//        }
        if(!check_login_by_tb()){
            if(ACTION_NAME != 'login' && ACTION_NAME != 'register' && ACTION_NAME != 'verify'){
                $this->redirect('Admin/User/login');
            }
        }else{
            $user_id = session('user_id');
            $user_model = D("User");
            $user_info = $user_model->getUserInfo($user_id,true);
            if(is_array($user_info) && count($user_info) > 0){
                $json_data = array();
                $json_data["user_id"] = $user_info["id"];
                if(!empty($user_info["user_name"])){
                    $json_data["user_name"] = $user_info["user_name"];
                }elseif(!empty($user_info["user_email"])){
                    $json_data["user_name"] = $user_info["user_email"];
                }elseif(!empty($user_info["user_mobile"])){
                    $json_data["user_name"] = $user_info["user_mobile"];
                }
                $this->assign("listUser",$json_data);
            }
        }
        $this->assign("title","深圳永琛教育投保管理有限公司");
    }
}