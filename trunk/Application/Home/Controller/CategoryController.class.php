<?php
/**
 * Created by PhpStorm.
 * User: xf.li
 * Date: 2017/4/18
 * Time: 17:58
 */
namespace Home\Controller;

class CategoryController extends HomeController{
    public function index(){
        $this->display();
    }

    public function addCategory(){
        if(IS_POST){
            $category_name = I("post.category_name");
            $cid = I("post.cid");
            if(empty($category_name) || empty($cid)){
                $dataJson = array("flag" => 0,"msg" => "参数不能为空");
                $this->ajaxReturn($dataJson);
            }
            $model_category = D("Categorys");
            $data_category = array();
            $data_category["name_category"] = $category_name;
            $data_category["sub_categorys_count"] = 0;
            $data_category["files_include"] = 0;
            $now_time = time();
            $data_category["create_category_time"] = $now_time;
            $data_category["last_update_time"] = $now_time;
            $data_category["last_visit_time"] = $now_time;
            $data_category["status"] = 1;
            $data_category["category_type"] = 1;
            if(-1 == $cid){
                $data_category["is_root"] = 1;
            }
            $data_category["user_id"] = get_user_id();
            $check_id = $model_category->addCategory($cid,$data_category);
            if(!empty($check_id)){
                //根节点的父节点指向节点本身
                if($cid == -1){
                    $cid = $check_id;
                }
                $model_category->addDescentdantCategory($cid,$check_id);
            }
            $category_info["cid"] = $check_id;
            $category_info["name"] = $category_name;
            $dataJson = array("flag" => 1,"msg" => "ok","list" => $category_info);
            $this->ajaxReturn($dataJson);
        }
    }

    public function renameCategory(){
        if(IS_POST){
            $name = I("post.category_name");
            $src_category = I("post.cid");

            if(empty($src_category) || empty($name)){
                $dataJson = array("flag" => 0,"msg" => "error");
                $this->ajaxReturn($dataJson);
            }

            $category_model = D("Categorys");
            $data_category = array();
            $data_category["name_category"] = $name;
            $data_category["last_update_time"] = time();
            $category_model->updateCategory($src_category,$data_category);

            $dataJson = array("flag" => 1,"msg" => "ok");
            $this->ajaxReturn($dataJson);
        }
    }

    public function moveCategory(){
        if(IS_POST){
            $src_cid = I("post.src_cid");
            $dst_cid = I("post.dst_cid");

            if($src_cid == $dst_cid){
                $dataJson = array("flag" => 0,"msg" => "不能移动自己节点");
                $this->ajaxReturn($dataJson);
            }
            $category_model = D("Categorys");

            $dst_array = array();
            for($i = 0;$i < count($src_cid);$i++){
                $list = $category_model->getCategoryById($src_cid[$i]);
                $src_data = array();
                foreach($list as $k => $v){
                    $temp = array();
                    $temp["name_category"] = $v["name_category"];
                    $temp["id"] = $v["id"];
                    $temp["ancestor_id"] = $v["ancestor_id"];
                    $temp["descendant_id"] = $v["descendant_id"];
                    $temp["cid"] = $dst_cid;
                    $temp["user_id"] = session("user_id");
                    $src_data[0] = $temp;
                }
                $cur_dst_id = $category_model->addMultiCategory($src_data,1);
                if(empty($cur_dst_id)){
                    $dataJson = array("flag" => 0,"msg" => "error");
                    $this->ajaxReturn($dataJson);
                }
                $dst_array[] = $cur_dst_id;
                //将原先分类标记为删除
                $update_category_data = array();
                $update_category_data["status"] = 2;
                $update_category_data["last_update_time"] = time();
                $category_model->updateCategory($src_cid[$i],$update_category_data);
            }

            for($i = 0;$i < count($dst_array);$i++){
                $this->moveCategoryRecursive($src_cid[$i],$dst_array[$i]);
            }

            $dataJson = array("flag" => 1,"msg" => "ok");
            $this->ajaxReturn($dataJson);
        }
    }

    public function deleteCategory(){
        if(IS_POST){
            $src_category = I("post.src_category");

            if(empty($src_category)){
                $dataJson = array("flag" => 0,"msg" => "error");
                $this->ajaxReturn($dataJson);
            }
            $category_model = D("Categorys");
            $data_category = array();
            $data_category["status"] = 2;
            $category_model->updateCategory($src_category,$data_category);

            $dataJson = array("flag" => 1,"msg" => "ok");
            $this->ajaxReturn($dataJson);
        }
    }

    public function openCategory(){
        if(IS_POST){
            $cid = I("post.cid");
            $category_model = D("Categorys");
            $list = $category_model->getSonsCategoryByUserID($cid,get_user_id(),1);
            $category_data = array();
            foreach($list as $k => $v){
                $temp = array();
                $temp["id"] = $v["id"];
                $temp["name"] = $v["name_category"];
                $temp["sub_categorys_count"] = $v["sub_categorys_count"];
                $temp["files_include"] = $v["files_include"];
                $temp["last_update_time"] = date("Y-m-d H:m",$v["last_update_time"]);
                $category_data[] = $temp;
            }
            $dataJson = array("flag" => 1,"msg" => "ok","list" => $category_data);
            $this->ajaxReturn($dataJson);
        }else{
            $cid = I("get.cid");
            $this->redirect('Home/Index/index/cid/'.$cid);
        }
    }

    public function downloadCategory(){
        if(IS_POST){
            $dataJson = array("flag" => 1,"msg" => "ok");
            $this->ajaxReturn($dataJson);
        }
    }

    public function copyCategory(){
        if(IS_POST){
            $src_cid = I("post.src_cid");
            $dst_cid = I("post.dst_cid");

            if($src_cid == $dst_cid){
                $dataJson = array("flag" => 0,"msg" => "不能复制自己节点");
                $this->ajaxReturn($dataJson);
            }

            $src_data = array();
            $category_model = D("Categorys");

            $dst_array = array();
            for($i = 0;$i < count($src_cid);$i++){
                $list = $category_model->getCategoryById($src_cid[$i]);
                foreach($list as $k => $v){
                    $temp = array();
                    $temp["name_category"] = $v["name_category"];
                    $temp["id"] = $v["id"];
                    $temp["ancestor_id"] = $v["ancestor_id"];
                    $temp["descendant_id"] = $v["descendant_id"];
                    $temp["cid"] = $dst_cid;
                    $temp["user_id"] = session("user_id");
                    $src_data[0] = $temp;
                }
                $dst_cid = $category_model->addMultiCategory($src_data,1);
                if(empty($dst_cid)){
                    $dataJson = array("flag" => 0,"msg" => "error");
                    $this->ajaxReturn($dataJson);
                }
                $dst_array[] = $dst_cid;
                unset($list);
            }

            //递归拷贝直接子节点
            for($i = 0;$i < count($dst_array);$i++){
                $this->copyCategoryRecursive($src_cid[$i],$dst_array[$i]);
            }

            $dataJson = array("flag" => 1,"msg" => "ok");
            $this->ajaxReturn($dataJson);
        }else{
            $cid = I("get.cid");
        }
    }

    private function moveCategoryRecursive($src_cid,$dst_cid){
        $src_data = array();
        $category_model = D("Categorys");
        $list = $category_model->getSonsCategoryByUserID($src_cid,get_user_id(),1);
        //$self_list = $category_model->getCategoryById($src_cid);
        //获取当前分类的文章列表
        $article_model = D("Articles");
        $article_list = $article_model->getArticlesByCidAndUserID($src_cid,get_user_id());
        if(is_array($article_list) && count($article_list) > 0){
            foreach($article_list as $k => $v){
                $v["category_id"] = $dst_cid;
                $now_time = time();
                $v["create_category_time"] = $now_time;
                $v["last_update_time"] = $now_time;
                $v["last_visit_time"] = $now_time;
                $v["user_id"] = get_user_id();
                $article_model->addArticle($v);
                //将原先文章标记为删除
                $update_article_data = array();
                $update_article_data["status"] = 2;
                $update_article_data["last_update_time"] = time();
                $article_model->updateArticle($v["id"],$update_article_data);
            }
        }
        if(is_array($list) && count($list) > 0){
            foreach($list as $k => $v){
                $temp = array();
                $temp["name_category"] = $v["name_category"];
                $temp["id"] = $v["id"];
                $temp["ancestor_id"] = $v["ancestor_id"];
                $temp["descendant_id"] = $v["descendant_id"];
                $temp["cid"] = $dst_cid;
                $temp["user_id"] = session("user_id");
                $src_data[0] = $temp;
                $cur_dst_id = $category_model->addMultiCategory($src_data,1);
                //将原先分类标记为删除
                $update_category_data = array();
                $update_category_data["status"] = 2;
                $update_category_data["last_update_time"] = time();
                $category_model->updateCategory($v["id"],$update_category_data);
                $this->moveCategoryRecursive($v["id"],$cur_dst_id);
            }
        }
    }

    private function copyCategoryRecursive($src_cid,$dst_cid){
        $src_data = array();
        $category_model = D("Categorys");
        $list = $category_model->getSonsCategory($src_cid);
        //获取当前分类的文章列表
        $article_model = D("Articles");
        $article_list = $article_model->getArticlesByCidAndUserID($src_cid,get_user_id());
        if(is_array($article_list) && count($article_list) > 0){
            foreach($article_list as $k => $v){
                $v["category_id"] = $dst_cid;
                $now_time = time();
                $v["create_category_time"] = $now_time;
                $v["last_update_time"] = $now_time;
                $v["last_visit_time"] = $now_time;
                $v["user_id"] = session("user_id");
                $article_model->addArticle($v);
            }
        }
        if(is_array($list) && count($list) > 0){
            foreach($list as $k => $v){
                $temp = array();
                $temp["name_category"] = $v["name_category"];
                $temp["id"] = $v["id"];
                $temp["ancestor_id"] = $v["ancestor_id"];
                $temp["descendant_id"] = $v["descendant_id"];
                $temp["user_id"] = session("user_id");
                $temp["cid"] = $dst_cid;
                $src_data[0] = $temp;
                $cur_dst_id = $category_model->addMultiCategory($src_data,1);
                $this->copyCategoryRecursive($v["id"],$cur_dst_id);
            }
        }
    }

    public function readCategoryTrees(){
        if(IS_POST){
            $cid = -1;
            $model_category = D("Categorys");
            $list = $model_category->getSonsCategoryByUserID($cid);
            $category_data = array();
            foreach($list as $k => $v){
                $temp = array();
                $temp["id"] = $v["id"];
                $temp["name"] = $v["name_category"];
                $temp["sub_categorys_count"] = $v["sub_categorys_count"];
                $temp["files_include"] = $v["files_include"];
                $temp["last_update_time"] = date("Y-m-d H:m",$v["last_update_time"]);
                $category_data[] = $temp;
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
            }
            $tree_data["categorys"] = $category_data;
            $category_data["articles"] = $article_data;
            $dataJson = array("flag" => 1,"msg" => "ok","list" => $tree_data);
            $this->ajaxReturn($dataJson);
        }
    }
}