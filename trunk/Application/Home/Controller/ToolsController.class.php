<?php
/**
 * Created by PhpStorm.
 * User: xfli
 * Date: 2019/7/23
 * Time: 23:54
 */

namespace Home\Controller;
use Org\Util;

class ToolsController extends HomeController{
    public function enctrypt(){
        $pwd = I('get.pwd');
        $key = I('get.key');
        $enc = new \Org\Util\Mcrypt;
        $result = $enc->encByBase64($pwd);
        echo $result;
    }

    public function getKey(){
        $msg = I('get.msg');
        $enc = new \Org\Util\Mcrypt;
        echo $enc->encByUrlEncode(msg);
    }
}