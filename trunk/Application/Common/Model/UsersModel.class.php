<?php
/**
 * Created by PhpStorm.
 * User: xfli
 * Date: 2017/5/5
 * Time: 7:46
 */
namespace Common\Model;

use Think\Model;

class UsersModel extends Model{
    protected $tableName = "notes_users";

    public function add_user_by_array($data){
        $id = $this->max("id");
        $id++;
        $data["id"] = $id;
        $this->data($data)->add();
        return true;
    }

    public function get_user_info($user_email){
        if(empty($user_email)){
            return null;
        }
        $map = array();
        $map["user_email"] = $user_email;
        $map["status"] = array(NEQ,"0,2");
        $list = $this->field("*")->where($map)->find();
        if(is_array($list) && count($list) > 0){
            return $list;
        }
        return null;
    }

    public function get_user_info_by_id($user_id){
        $map["id"] = $user_id;
        $list = $this->field("*")
            ->where($map)
            ->select();
        if(!is_array($list) || count($list) <= 0){
            return null;
        }
        return $list;
    }

    public function get_user_info_by_token($token){
        $map["email_token"] = $token;
        $map["status"] = 0;
        $list = $this->field("*")->where($map)->find();
        if(is_array($list) && count($list) > 0){
            return $list;
        }
        return null;
    }

    public function update_user_info($user_id,$data){
        $map["id"] = $user_id;
        $this->data($data)->where($map)->save();
        return true;
    }

    public function check_user($user_email,$register = true){
        $map = array();
        if(empty($user_email)){
            return  $register ? true : false;
        }
        $map["user_email"] = $user_email;
        $list = $this->field("*")->where($map)->find();
        if(is_array($list) && count($list) > 0){
            return true;
        }
        return false;
    }
}