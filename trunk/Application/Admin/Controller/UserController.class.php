<?php
/**
 * Created by PhpStorm.
 * User: xf.li
 * Date: 2017/4/13
 * Time: 11:07
 */
namespace Admin\Controller;
use Think\Controller;

class UserController extends Controller{
    public function index(){
        $this->redirect('Home/Index/index');
    }

    /**
     * 用户登录接口
     */
    public function login(){
        if(IS_POST){
            $user_name = I("post.user_name");
            $password = I("post.user_password");
            $user_verify = I("post.user_verify");

            if(empty($user_name) || empty($password)){
                $data_json = array("flag" => 0,"msg" => "数据输入不合法!");
                $this->ajaxReturn($data_json);
            }
            //验证验证码
            if(C(WEB_SITE_VERIFY)){
                if(!check_verify($user_verify,1)){
                    $data = array("flag" => 0,"msg" => "验证码错误");
                    $this->ajaxReturn($data);
                }
            }
            $user_model = D("Users");
            $info = $user_model->get_user_info($user_name);
            if(!is_array($info)){
                $data_json = array("flag" => 0,"msg" => "用户不存在或者未激活!");
                $this->ajaxReturn($data_json);
            }
            if(md5($password) != $info["user_pass"]){
                $data_json = array("flag" => 0,"msg" => "用户密码不对!");
                $this->ajaxReturn($data_json);
            }
            //更新用户登录信息

            session("user_id",$info["id"]);
            unset($user_name);
            $user_name = $info["user_email"];
            $return_data = array(
                "user_email" => $info["user_email"],"user_id" => $info["id"],
                "user_name" => $user_name);
            session("user_data",$return_data);

            $data_json = array("flag" => 1,"msg" => "登录成功!","list" => $return_data);
            $this->ajaxReturn($data_json);
        }elseif(check_member_login()){
            $this->redirect('Admin/Index/index');
        }
        $this->assign("sms_timeout",C("SMS_TIMEOUT"));
        $this->display();
    }

    /**
     * 用户退出接口
     */
    public function logout(){
        session_destroy();
        $this->redirect('Home/Index/index');
    }

    /**
     * 验证码
     */
    public function verify(){
        $verify = new \Think\Verify();
        $verify->useNoise = false;
        $verify->length = 4;
        $verify->fontSize = 42;
        $verify->useCurve = false;
        $verify->entry(1);
    }

    private function send_email($to,$subject = '', $body = '', $attachment = null){
        $msg = toubao_send_mail($to,$to,$subject,$body,$attachment);
        return $msg;
    }

    private function is_email_legal($code,$datas){
        $now_time = time();
        $str_snd_time = $datas["email_snd_time"];
        $year = (int)substr($str_snd_time,0,4);
        $month = (int)substr($str_snd_time,5,2);
        $day = (int)substr($str_snd_time,8,2);
        $hour = (int)substr($str_snd_time,11,2);
        $minutes = (int)substr($str_snd_time,14,2);
        $seconds = (int)substr($str_snd_time,17,2);
        $snd_stamp = mktime($hour,$minutes,$seconds,$month,$day,$year);
        $time_out = C("EMAIL_TIMEOUT");
        if(($snd_stamp + ($time_out * 1000)) < $now_time){
            return -1;
        }
        if($code != $datas["email_verify"]){
            return -2;
        }
        return 0;
    }

    public function active(){
        if(IS_GET){
            $token = I("get.token");
            $user_model = D("Users");
            $assign_data = array();
            $user_info = $user_model->get_user_info_by_token($token);
            if($user_info != null){
                if(!$this->is_expired($user_info)){
                    $user_data = array();
                    $user_data["status"] = 1;
                    $user_model->update_user_info($user_info["id"],$user_data);
                    $assign_data["msg"] = "邮箱激活成功,请登录!";
                    $assign_data["flag"] = 1;
                    //从用户id为1的用户导入缺省分类
                    $category_model = D("Categorys");
                    //获取目录分类
                    $list = $category_model->getCategoryByUserID(1,1);
                    $cid_array = array();
                    foreach($list as $k => $v){
                        $cid_array[] =$v["id"];
                    }
                    $this->copyCategory($cid_array,-1,$user_info["id"],1);
                    unset($list);

                    //获取收藏夹分类
                    $list = $category_model->getCategoryByUserID(1,2);
                    $cid_array = array();
                    foreach($list as $k => $v){
                        $cid_array[] =$v["id"];
                    }
                    $this->copyCategory($cid_array,-1,$user_info["id"],2);
                    unset($list);

                    //获取软件分类
                    $list = $category_model->getCategoryByUserID(1,3);
                    $cid_array = array();
                    foreach($list as $k => $v){
                        $cid_array[] =$v["id"];
                    }
                    $this->copyCategory($cid_array,-1,$user_info["id"],3);
                    unset($list);
                    $this->assign("active_info",$assign_data);
                    $this->success("邮箱激活成功,请登录!",U('Home/User/login'));
                }else{
                    $assign_data["msg"] = "日期过期,请重新注册!";
                    $assign_data["flag"] = 0;
                    $this->assign("active_info",$assign_data);
                    $this->error("日期过期,请重新注册!",U('Home/User/register'));
                }
            }else{
                $assign_data["msg"] = "用户不存在,请重新注册!";
                $assign_data["flag"] = 0;
                $this->error("用户不存在,请重新注册!!",U('Home/User/register'));
            }
            $this->assign("active_info",$assign_data);
            $this->success("邮箱激活成功,请登录!",U('Home/User/login'));
        }else{
            $this->success("邮箱激活成功,请登录!",U('Home/User/login'));
        }
        //$this->display();
    }

    private function is_expired($data,$type = 1){
        if(1 == $type){
            $now_time = time();
            $expired_time = $data["email_expired_time"];
            if($now_time > $expired_time){
                return true;
            }
            return false;
        }
        return false;
    }

    private function copyCategory($src_cid,$dst_cid_t,$user_id,$type){
            $src_data = array();
            $category_model = D("Categorys");

            $dst_array = array();
            for($i = 0;$i < count($src_cid);$i++){
                $list = $category_model->getCategoryById($src_cid[$i]);
                foreach($list as $k => $v){
                    $temp = array();
                    $temp["name_category"] = $v["name_category"];
                    //$temp["id"] = $v["id"];
//                    $temp["ancestor_id"] = $v["ancestor_id"];
//                    $temp["descendant_id"] = $v["descendant_id"];
                    $temp["cid"] = $dst_cid_t;
                    $temp["user_id"] = $user_id;
                    $src_data[0] = $temp;
                }
                $dst_cid = $category_model->addMultiCategory($src_data,$type);
                if(empty($dst_cid)){
//                    $dataJson = array("flag" => 0,"msg" => "error");
//                    $this->ajaxReturn($dataJson);
                    return;
                }
                $dst_array[] = $dst_cid;
                unset($list);
                if(2 == $type){
                    //获取当前收藏分类的收藏夹列表
                    $favorites_model = D("Favorites");
                    $article_list = $favorites_model->getFavoritesByCidAndUserID($src_cid[$i],1);
                    if(is_array($article_list) && count($article_list) > 0){
                        foreach($article_list as $k => $v){
                            $v["category_id"] = $dst_cid;
                            $now_time = time();
                            $v["create_category_time"] = $now_time;
                            $v["last_update_time"] = $now_time;
                            $v["last_visit_time"] = $now_time;
                            $v["user_id"] = $user_id;
                            $v["fav_status"] = 1;
                            $favorites_model->addFavorites($v);
                        }
                    }
                }
            }


            //递归拷贝直接子节点
            for($i = 0;$i < count($dst_array);$i++){
                $this->copyCategoryRecursive($src_cid[$i],$dst_array[$i],$user_id,$type);
            }

//            $dataJson = array("flag" => 1,"msg" => "ok");
//            $this->ajaxReturn($dataJson);
    }

    private function copyCategoryRecursive($src_cid,$dst_cid,$user_id,$type){
        $src_data = array();
        $category_model = D("Categorys");
        $list = $category_model->getSonsCategoryByUserID($src_cid,1,$type);
        if(2 == $type){
            //获取当前收藏分类的收藏夹列表
            $favorites_model = D("Favorites");
            $article_list = $favorites_model->getFavoritesByCidAndUserID($src_cid,1);
            if(is_array($article_list) && count($article_list) > 0){
                foreach($article_list as $k => $v){
                    $v["category_id"] = $dst_cid;
                    $now_time = time();
                    $v["create_category_time"] = $now_time;
                    $v["last_update_time"] = $now_time;
                    $v["last_visit_time"] = $now_time;
                    $v["user_id"] = $user_id;
                    $v["fav_status"] = 1;
                    $favorites_model->addFavorites($v);
                }
            }
        }
        if(is_array($list) && count($list) > 0){
            foreach($list as $k => $v){
                $temp = array();
                $temp["name_category"] = $v["name_category"];
                $temp["id"] = $v["id"];
                $temp["ancestor_id"] = $v["ancestor_id"];
                $temp["descendant_id"] = $v["descendant_id"];
                $temp["user_id"] = $user_id;
                $temp["cid"] = $dst_cid;
                $src_data[0] = $temp;
                $cur_dst_id = $category_model->addMultiCategory($src_data,$type);
                $this->copyCategoryRecursive($v["id"],$cur_dst_id,$user_id,$type);
            }
        }
    }
}