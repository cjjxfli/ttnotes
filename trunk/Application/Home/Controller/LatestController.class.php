<?php
/**
 * Created by PhpStorm.
 * User: xfli
 * Date: 2018/5/27
 * Time: 8:33
 */
namespace Home\Controller;
use Think\Controller;

class LatestController extends HomeController{
    public function index(){
        if ($this->is_mobile()) {
            //设置默认默认主题为 Mobile
            $this->redirect("Home/Index/index");
        }
        $cid = I("cid");
        if(!isset($cid)){
            $cid = 2;
        }
        if(2 == $cid){
            $this->recentCategory();
        }else{
            $this->recentFavorites();
        }
        $this->display();
    }

    /**
     * 通过map数组形式返回最近笔记
     * map的key为笔记标题
     * map的value为笔记摘要
     * 默认返回5篇笔记，可以通过传入的参数设置
     */
    public function recentCategory(){
        $latestModel = D("Latest");
        $count  = $latestModel->articlesCount();// 查询满足要求的总记录数
        $page   = new \Think\Page($count,10);// 实例化分页类 传入总记录数和每页显示的记录数(25)
        $page->setConfig('first','首页');
        $page->setConfig('prev','上一页');
        $page->setConfig('next','下一页');
        $page->setConfig('last','末页');

        $show   = $page->show();// 分页显示输出

        $lists = $latestModel->getArticles($page);
        $category_data = array();
        foreach($lists as $k => $v){
            $temp = array();
            $temp["id"] = $v["id"];
            $temp["name"] = $v["name_category"];
            $temp["path_article"] = $v["path_article"];
            $temp["title_article"] = $v["title_article"];
            $temp["create_category_time"] = date("Y-m-d H:m:s",$v["create_category_time"]);
            $temp["user_login"] = $v["user_login"];
            $temp["encode_contents"] = substr($v["encode_contents"],0,strlen($v["encode_contents"]) > 20 ? 20 : strlen($v["encode_contents"]));
            $category_data[] = $temp;
        }
        $this->assign("category_info_a",$category_data);
        $this->assign('page',$show);// 赋值分页输出
    }

    /**
     * 通过map数组形式返回最近收藏
     * map的key为收藏标题
     * map的value为收藏的链接
     * 默认返回5篇收藏，可以通过传入的参数设置
     */
    public function recentFavorites(){
        $latestModel = D("Latest");
        // 查询满足要求的总记录数
        $count = $latestModel->favoritesCount();
        $page   = new \Think\Page($count,10);// 实例化分页类 传入总记录数和每页显示的记录数(25)
        $page->setConfig('first','首页');
        $page->setConfig('prev','上一页');
        $page->setConfig('next','下一页');
        $page->setConfig('last','末页');

        $show   = $page->show();// 分页显示输出

        $lists = $latestModel->getFavorites($page);
        $category_data = array();
        foreach($lists as $k => $v){
            $temp = array();
            $temp["id"] = $v["id"];
            $temp["name"] = $v["name_category"];
            $temp["fav_title"] = $v["fav_title"];
            $temp["fav_url"] = $v["fav_url"];
            $temp["create_category_time"] = date("Y-m-d H:m:s",$v["create_category_time"]);
            $temp["user_login"] = $v["user_login"];
            $category_data[] = $temp;
        }
        $this->assign("article_info_a",$category_data);
        $this->assign('page',$show);// 赋值分页输出
    }

    /**
     * 检测是否是手机访问
     */
    private function is_mobile(){
        $useragent=isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '';
        $useragent_commentsblock=preg_match('|\(.*?\)|',$useragent,$matches)>0?$matches[0]:'';
        function _is_mobile($substrs,$text){
            foreach($substrs as $substr)
                if(false!==strpos($text,$substr)){
                    return true;
                }
            return false;
        }
        $mobile_os_list=array('Google Wireless Transcoder','Windows CE','WindowsCE','Symbian','Android','armv6l','armv5','Mobile','CentOS','mowser','AvantGo','Opera Mobi','J2ME/MIDP','Smartphone','Go.Web','Palm','iPAQ');
        $mobile_token_list=array('Profile/MIDP','Configuration/CLDC-','160×160','176×220','240×240','240×320','320×240','UP.Browser','UP.Link','SymbianOS','PalmOS','PocketPC','SonyEricsson','Nokia','BlackBerry','Vodafone','BenQ','Novarra-Vision','Iris','NetFront','HTC_','Xda_','SAMSUNG-SGH','Wapaka','DoCoMo','iPhone','iPod');

        $found_mobile=_is_mobile($mobile_os_list,$useragent_commentsblock) ||
            _is_mobile($mobile_token_list,$useragent);
        if ($found_mobile){
            return true;
        }else{
            return false;
        }
    }
}