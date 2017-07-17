<?php
/**
 * Created by PhpStorm.
 * User: xfli
 * Date: 2017/5/4
 * Time: 8:04
 */

namespace Home\Controller;

class FavoritesController extends HomeController{
    public function index(){
        $cid = I("get.cid");
        if(empty($cid)){
            $cid = -1;
        }
        $files_count = 0;
        $type = 2;
        $model_category = D("Categorys");
        $list = $model_category->getSonsCategoryByUserID($cid,get_user_id(),$type);
        $fav_category_data = array();
        foreach($list as $k => $v){
            $temp = array();
            $temp["id"] = $v["id"];
            $temp["name"] = $v["name_category"];
            $temp["sub_categorys_count"] = $v["sub_categorys_count"];
            $temp["files_include"] = $v["files_include"];
            $temp["last_update_time"] = date("Y-m-d H:m",$v["last_update_time"]);
            $fav_category_data[] = $temp;
            $files_count++;
        }
        unset($list);
        //获取根节点目录
        $fav_root_category = array();
        $list  = $model_category->getSonsCategoryByUserID(-1,get_user_id(),$type);
        foreach($list as $k => $v){
            $temp = array();
            $temp["id"] = $v["id"];
            $temp["name"] = $v["name_category"];
            $temp["sub_categorys_count"] = $v["sub_categorys_count"];
            $temp["files_include"] = $v["files_include"];
            $temp["last_update_time"] = date("Y-m-d H:m",$v["last_update_time"]);
            $fav_root_category[] = $temp;
        }
        unset($list);
        $ancestor_data = array();
        if($cid != -1){
            $list = $model_category->getAncestorCategoryByUserID($cid,get_user_id(),$type);
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
        //获取收藏夹
        $favorites_model = D("Favorites");
        unset($list);
        $list = $favorites_model->getFavoritesByCidAndUserID($cid,get_user_id());
        $favorites_data = array();
        foreach($list as $k => $v){
            $temp = array();
            $temp["fav_url"] = $v["fav_url"];;
            $temp["fav_title"] = $v["fav_title"];
            $temp["id"] = $v["id"];
            $temp["last_update_time"] = date("Y-m-d H:m",$v["last_update_time"]);
            $favorites_data[] = $temp;
            $files_count++;
        }
        $this->assign("favorites_info",$favorites_data);
        $this->assign("favorites_ancestor_info",$ancestor_data);
        $this->assign("category_cid",$cid);
        $this->assign("favorites_category_info",$fav_category_data);
        $this->assign("root_favorites_info",$fav_root_category);
        $this->assign("files_count",$files_count);
        $this->display();
    }

    public function addFavoritesCategory(){
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
            $data_category["category_type"] = 2;
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

    public function deleteFavoritesCategory(){
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

    public function renameFavoritesCategory(){
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

            $dataJson = array("flag" => 1,"msg" => "OK");
            $this->ajaxReturn($dataJson);
        }
    }

    public function openFavoritesCategory(){
        if(IS_POST){
            $cid = I("post.cid");
            $category_model = D("Categorys");
            $list = $category_model->getSonsCategoryByUserID($cid,get_user_id(),2);
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
            $this->redirect('Home/Favorites/index/cid/'.$cid);
        }
    }

    public function copyFavoritesCategory(){
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

            for($i = 0; $i < count($src_cid); $i++){
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
                $dst_cid = $category_model->addMultiCategory($src_data,2);
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

            $dataJson = array("flag" => 1,"msg" => "OK");
            $this->ajaxReturn($dataJson);
        }
    }

    private function copyCategoryRecursive($src_cid,$dst_cid){
        $src_data = array();
        $category_model = D("Categorys");
        $list = $category_model->getSonsCategoryByUserID($src_cid,get_user_id(),2);
        //获取当前收藏分类的收藏夹列表
        $favorites_model = D("Favorites");
        $article_list = $favorites_model->getFavoritesByCidAndUserID($src_cid,get_user_id());
        if(is_array($article_list) && count($article_list) > 0){
            foreach($article_list as $k => $v){
                $v["category_id"] = $dst_cid;
                $now_time = time();
                $v["create_category_time"] = $now_time;
                $v["last_update_time"] = $now_time;
                $v["last_visit_time"] = $now_time;
                $v["user_id"] = get_user_id();
                $favorites_model->addFavorites($v);
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
                $temp["user_id"] = get_user_id();
                $src_data[0] = $temp;
                $cur_dst_id = $category_model->addMultiCategory($src_data,2);
                $this->copyCategoryRecursive($v["id"],$cur_dst_id);
            }
        }
    }

    public function moveFavoritesCategory(){
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
                    $temp["user_id"] = get_user_id();
                    $src_data[0] = $temp;
                }
                $cur_dst_id = $category_model->addMultiCategory($src_data,2);
                if(empty($cur_dst_id)){
                    $dataJson = array("flag" => 0,"msg" => "error");
                    $this->ajaxReturn($dataJson);
                }
                $dst_array[] = $cur_dst_id;
                //将原先收藏分类标记为删除
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

    private function moveCategoryRecursive($src_cid,$dst_cid){
        $src_data = array();
        $category_model = D("Categorys");
        $list = $category_model->getSonsCategoryByUserID($src_cid,get_user_id(),2);
        //获取当前收藏分类的文章列表
        $favorites_model = D("Favorites");
        $article_list = $favorites_model->getFavoritesByCidAndUserID($src_cid,get_user_id());
        if(is_array($article_list) && count($article_list) > 0){
            foreach($article_list as $k => $v){
                $v["category_id"] = $dst_cid;
                $now_time = time();
                $v["create_category_time"] = $now_time;
                $v["last_update_time"] = $now_time;
                $v["last_visit_time"] = $now_time;
                $v["user_id"] = get_user_id();
                $favorites_model->addFavorites($v);
                //将原先收藏分类标记为删除
                $update_article_data = array();
                $update_article_data["fav_status"] = 2;
                $update_article_data["last_update_time"] = time();
                $favorites_model->updateFavorites($v["id"],$update_article_data);
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
                $temp["user_id"] = get_user_id();
                $src_data[0] = $temp;
                $cur_dst_id = $category_model->addMultiCategory($src_data,2);
                //将原先收藏分类标记为删除
                $update_category_data = array();
                $update_category_data["status"] = 2;
                $update_category_data["last_update_time"] = time();
                $category_model->updateCategory($v["id"],$update_category_data);
                $this->moveCategoryRecursive($v["id"],$cur_dst_id);
            }
        }
    }

    public function addFavorites(){
        if(IS_POST){
            $fav_name = I("post.fav_name");
            $fav_link = I("post.fav_link");
            $src_category = I("post.src_category");
            if(empty($fav_name) || empty($fav_link)){
                $dataJson = array("flag" => 0,"msg" => "参数不能为空");
                $this->ajaxReturn($dataJson);
            }
            if(empty($src_category)){
                $src_category = -1;
            }
            $favorites_model = D("Favorites");
            $data_fav = array();
            $data_fav["category_id"] = $src_category;
            $data_fav["fav_title"] = $fav_name;
            $data_fav["fav_url"] = $fav_link;
            $data_fav["fav_status"] = 1;
            $user_id = get_user_id();
            $data_fav["user_id"] = $user_id;
            $now_time = time();
            $data_fav["create_category_time"] = $now_time;
            $data_fav["last_update_time"] = $now_time;
            $data_fav["last_visit_time"] = $now_time;

            $check_id = $favorites_model->addFavorites($data_fav);
            if(empty($check_id)){
                $dataJson = array("flag" => 0,"msg" => "添加收藏失败");
                $this->ajaxReturn($dataJson);
            }

            $dataJson = array("flag" => 1,"msg" => "OK");
            $this->ajaxReturn($dataJson);
        }
    }

    public function deleteFavorites(){
        if(IS_POST){
            $src_category = I("post.src_category");

            if(empty($src_category)){
                $dataJson = array("flag" => 0,"msg" => "error");
                $this->ajaxReturn($dataJson);
            }
            $favorites_model = D("Favorites");
            $data_article = array();
            $data_article["status"] = 2;
            $data_article["last_update_time"] = time();
            $favorites_model->updateFavorites($src_category,$data_article);
            $dataJson = array("flag" => 1,"msg" => "ok");
            $this->ajaxReturn($dataJson);
        }
    }

    public function renameFavorites(){
        if(IS_POST){
            $name = I("post.category_name");
            $src_category = I("post.cid");
            //$dst_category = I("post.dst_category");

            if(empty($src_category) || empty($name)){
                $dataJson = array("flag" => 0,"msg" => "error");
                $this->ajaxReturn($dataJson);
            }
            $favorites_model = D("Favorites");
            $data_article = array();
            $data_article["title_article"] = $name;
            $data_article["last_update_time"] = time();
            $favorites_model->updateFavorites($src_category,$data_article);

            $dataJson = array("flag" => 1,"msg" => "OK");
            $this->ajaxReturn($dataJson);
        }
    }

    public function openFavorites(){
        if(IS_POST){
            $dataJson = array("flag" => 1,"msg" => "ok");
            $this->ajaxReturn($dataJson);
        }else{
            $id = I("get.aid");
            if($id < 1){
                $this->error("收藏不存在",U('Home/Favorites/index'));
            }
            $favorites_model = D("Favorites");
            $list = $favorites_model->getFavorites($id);
            if(is_array($list) && count($list) > 0){
                $article_info = array();
                $article_info["id"] = $id;
                $article_info["title"] = $list[0]["fav_title"];
                $article_info["content"] = $list[0]["fav_url"];
                $this->assign("article_info",$article_info);
                $this->redirect($list[0]["fav_url"]);
            }

            $this->display("details");
        }
    }

    public function copyFavorites(){
        if(IS_POST){
            $src_cid = I("post.src_cid");
            $dst_cid = I("post.dst_cid");

            if($src_cid == $dst_cid){
                $dataJson = array("flag" => 0,"msg" => "不能复制自己节点");
                $this->ajaxReturn($dataJson);
            }
            $favorites_model = D("Favorites");
            $list = $favorites_model->getFavorites($src_cid);
            if(is_array($list) && count($list) > 0){
                $data = $list[0];
                $data["category_id"] = $dst_cid;
                $favorites_model->addFavorites($data);
            }

            $dataJson = array("flag" => 1,"msg" => "OK");
            $this->ajaxReturn($dataJson);
        }
    }

    public function moveFavorites(){
        if(IS_POST){
            $src_cid = I("post.src_cid");
            $dst_cid = I("post.dst_cid");

            if($src_cid == $dst_cid){
                $dataJson = array("flag" => 0,"msg" => "不能复制自己节点");
                $this->ajaxReturn($dataJson);
            }
            $favorites_model = D("Favorites");
            $list = $favorites_model->getFavorites($src_cid);
            if(is_array($list) && count($list) > 0){
                $data = $list[0];
                $data["category_id"] = $dst_cid;
                $favorites_model->addFavorites($data);
                //将原收藏标记为删除
                $update_article_data = array();
                $update_article_data["status"] = 2;
                $update_article_data["last_update_time"] = time();
                $favorites_model->updateFavorites($list[0]["id"],$update_article_data);
            }

            $dataJson = array("flag" => 1,"msg" => "OK");
            $this->ajaxReturn($dataJson);
        }
    }

    public function downloadFavorites(){
        if(IS_POST){
            $dataJson = array("flag" => 1,"msg" => "OK");
            $this->ajaxReturn($dataJson);
        }
    }

    public function readFavoritesCategoryTrees(){
        if(IS_POST){
            $cid = -1;
            $model_category = D("Categorys");
            $list = $model_category->getSonsCategoryByUserID($cid,get_user_id(),2);
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
            $favorites_model = D("Favorites");
            unset($list);
            $list = $favorites_model->getFavoritesByCidAndUserID($cid,get_user_id());
            $article_data = array();
            foreach($list as $k => $v){
                $temp = array();
                $temp["path_article"] = $v["fav_url"];
                $temp["file_name"] = $v["fav_url"];
                $temp["title_article"] = $v["fav_title"];
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