<?php
/**
 * Created by PhpStorm.
 * User: xf.li
 * Date: 2017/4/12
 * Time: 18:03
 */
namespace Home\Controller;

class IndexController extends HomeController{
    public function index(){
        $cid = I("get.cid");
        if(empty($cid)){
            $cid = -1;
        }
        $files_count = 0;
        $model_category = D("Categorys");
        $list = $model_category->getSonsCategoryByUserID($cid,get_user_id(),1);
        $category_data = array();
        foreach($list as $k => $v){
            $temp = array();
            $temp["id"] = $v["id"];
            $temp["name"] = $v["name_category"];
            $temp["sub_categorys_count"] = $v["sub_categorys_count"];
            $temp["files_include"] = $v["files_include"];
            $temp["last_update_time"] = date("Y-m-d H:m",$v["last_update_time"]);
            $category_data[] = $temp;
            $files_count++;
        }
        unset($list);
        //获取根节点目录
        $root_category = array();
        $list  = $model_category->getSonsCategoryByUserID(-1,get_user_id(),1);
        foreach($list as $k => $v){
            $temp = array();
            $temp["id"] = $v["id"];
            $temp["name"] = $v["name_category"];
            $temp["sub_categorys_count"] = $v["sub_categorys_count"];
            $temp["files_include"] = $v["files_include"];
            $temp["last_update_time"] = date("Y-m-d H:m",$v["last_update_time"]);
            $root_category[] = $temp;
        }
        unset($list);
        $ancestor_data = array();
        if($cid != -1){
            $list = $model_category->getAncestorCategoryByUserID($cid,get_user_id(),1);
            $title = "/";
            foreach($list as $k => $v){
                $temp = array();
                $temp["id"] = $v["id"];
                $temp["name"] = $v["name_category"];
                $title .= $v["name_category"] . "/";
                $temp["title"] = $title;
                $ancestor_data[] = $temp;
            }
            //加上当前目录
            unset($list);
            $list = $model_category->getCategoryById($cid);
            foreach($list as $k => $v){
                $temp = array();
                $temp["id"] = $v["id"];
                $temp["name"] = $v["name_category"];
                $title .= $v["name_category"] . "/";
                $temp["title"] = $title;
                $ancestor_data[] = $temp;
            }
        }
        //获取文件
        $article_model = D("Articles");
        unset($list);
        $list = $article_model->getArticlesByCidAndUserID($cid,get_user_id());
        $article_data = array();
        foreach($list as $k => $v){
            $temp = array();
            $temp["path_article"] = $v["path_article"];
            $split_array = explode("/",$v["path_article"]);
            $file_name = $split_array[count($split_array) - 1];
            $temp["file_name"] = $file_name;
            $temp["title_article"] = $v["title_article"];
            $temp["id"] = $v["id"];
            $temp["last_update_time"] = date("Y-m-d H:m",$v["last_update_time"]);
            $article_data[] = $temp;
            $files_count++;
        }
        $this->assign("article_info",$article_data);
        $this->assign("category_ancestor_info",$ancestor_data);
        $this->assign("category_cid",$cid);
        $this->assign("category_info",$category_data);
        $this->assign("root_category_info",$root_category);
        $this->assign("files_count",$files_count);
        $this->display();
    }

    public function test(){
        $this->display();
    }
}