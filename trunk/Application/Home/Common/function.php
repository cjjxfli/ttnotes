<?php
/**
 * Created by PhpStorm.
 * User: lixiongfeng
 * Date: 16/7/30
 * Time: 上午11:24
 */

function should_login($action_name){
    //$name = C('ALLOW_VISIT_ON_LOGIN');
    if(in_array($action_name,C('ALLOW_VISIT_ON_LOGIN'))){
        return true;
    }
    return false;
}

function which_page($action_name){
    if(in_array($action_name,C('SECOND_HEADER'))){
        return $action_name;
    }
    return false;
}

function check_verify($code, $id = ''){
    $verify = new \Think\Verify();
    return $verify->check($code, $id);
}

/**
 * 用户未登录时，返回默认用户id
 * @param bool|false $should_login
 * @return mixed|void
 */
function get_user_id($should_login = true){
    $user_id = session("user_id");
    if($should_login && empty($user_id)){
        $user_id = 2;
    }
    return $user_id;
}

function check_login(){
    $user_id = session("user_id");
    if(empty($user_id)){
        return false;
    }
    return true;
}