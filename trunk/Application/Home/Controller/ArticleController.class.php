<?php
/**
 * Created by PhpStorm.
 * User: xf.li
 * Date: 2017/4/18
 * Time: 17:57
 */
namespace Home\Controller;

class ArticleController extends HomeController{
    public function index(){
        $this->display();
    }

    public function addArticle(){
        if(IS_POST){
            $article_title = I("post.article_title");
            $article_key_words = I("post.article_key_words");
            $article_from_where = I("post.article_from_where");
            $article_abstract = I("post.article_abstract");
            $extra_editor = I("post.extra_editor");
            $category_id = I("post.category_id");
            //var_dump($extra_editor);
            if(empty($category_id)){
                $category_id = session("article_cat_id");
            }
            if(empty($category_id) || empty($article_title) || empty($extra_editor)){
                $dataJson = array("flag" => 0,"msg" => "参数不能为空");
                $this->ajaxReturn($dataJson);
            }
            $data_article = array();
            $data_article["category_id"] = $category_id;
            if(!empty($article_from_where)){
                $data_article["ref_article_url"] = $article_from_where;
            }
            $file_path = $this->saveProductArticle($extra_editor);
            if(!empty($file_path)){
                $data_article["path_article"] = $file_path;
            }
            $extra_decode_content = htmlspecialchars_decode($extra_editor);
            $data_article["encode_contents"] = $extra_decode_content;
            $data_article["title_article"] = $article_title;
            if(!empty($article_key_words)){
                $data_article["key_words_article"] = $article_key_words;
            }
            if(!empty($article_abstract)){
                $data_article["abstract_article"] = $article_abstract;
            }
            $data_article["status"] = 1;
            $now_time = time();
            $data_article["create_category_time"] = $now_time;
            $data_article["last_update_time"] = $now_time;
            $data_article["last_visit_time"] = $now_time;
            $data_article["user_id"] = session("user_id");

            $model_article = D("Articles");
            $model_article->addArticle($data_article);
            session("article_cat_id","");
            $dataJson = array("flag" => 1,"msg" => "ok");
            $this->ajaxReturn($dataJson);
        }else{
            $category_id = I("get.cid");
            if(empty($category_id)){
                $category_id = -1;
            }
            session("article_cat_id",$category_id);
            $this->assign("category_id",$category_id);
            $this->display("new_file");
        }
    }

    public function deleteArticle(){
        if(IS_POST){
            $src_category = I("post.src_category");

            if(empty($src_category)){
                $dataJson = array("flag" => 0,"msg" => "error");
                $this->ajaxReturn($dataJson);
            }
            $article_model = D("Articles");
            $data_article = array();
            $data_article["status"] = 2;
            $data_article["last_update_time"] = time();
            $article_model->updateArticle($src_category,$data_article);
            $dataJson = array("flag" => 1,"msg" => "ok");
            $this->ajaxReturn($dataJson);
        }
    }

    public function updateArticle(){
        if(IS_POST){
            $dataJson = array("flag" => 1,"msg" => "ok");
            $this->ajaxReturn($dataJson);
        }
    }

    public function renameArticle(){
        if(IS_POST){
            $name = I("post.category_name");
            $src_category = I("post.cid");
            //$dst_category = I("post.dst_category");

            if(empty($src_category) || empty($name)){
                $dataJson = array("flag" => 0,"msg" => "error");
                $this->ajaxReturn($dataJson);
            }
            $article_model = D("Articles");
            $data_article = array();
            $data_article["title_article"] = $name;
            $data_article["last_update_time"] = time();
            $article_model->updateArticle($src_category,$data_article);

            $dataJson = array("flag" => 1,"msg" => "ok");
            $this->ajaxReturn($dataJson);
        }
    }

    public function openArticle(){
        if(IS_POST){
            $dataJson = array("flag" => 1,"msg" => "ok");
            $this->ajaxReturn($dataJson);
        }else{
            $id = I("get.aid");
            if($id < 1){
                $this->error("文章不存在",U('Home/Index/index'));
            }
            $model_article = D("Articles");
            $list = $model_article->getArticle($id);
            if(is_array($list) && count($list) > 0){
                $article_info = array();
                $article_info["id"] = $id;
                $article_info["title"] = $list[0]["title_article"];
                //从文件读取数据
                $file_contents = file_get_contents($list[0]["path_article"]);
                if(!empty($file_contents)){
                    $article_info["content"] = htmlspecialchars_decode($file_contents);
                }else{
                    $article_info["content"] = $list[0]["encode_contents"];
                }
                $this->assign("article_info",$article_info);
            }
            $this->display("details");
        }
    }

    public function moveArticle(){
        if(IS_POST){
            $src_cid = I("post.src_cid");
            $dst_cid = I("post.dst_cid");

            if($src_cid == $dst_cid){
                $dataJson = array("flag" => 0,"msg" => "不能复制自己节点");
                $this->ajaxReturn($dataJson);
            }
            $article_model = D("Articles");
            $list = $article_model->getArticle($src_cid);
            if(is_array($list) && count($list) > 0){
                $data = $list[0];
                $data["category_id"] = $dst_cid;
                $article_model->addArticle($data);
                //将原文章标记为删除
                $update_article_data = array();
                $update_article_data["status"] = 2;
                $update_article_data["last_update_time"] = time();
                $article_model->updateArticle($list[0]["id"],$update_article_data);
            }
            $dataJson = array("flag" => 1,"msg" => "ok");
            $this->ajaxReturn($dataJson);
        }
    }

    public function downloadArticle(){
        if(IS_POST){
            $dataJson = array("flag" => 1,"msg" => "ok");
            $this->ajaxReturn($dataJson);
        }
    }

    public function copyArticle(){
        if(IS_POST){
            $src_cid = I("post.src_cid");
            $dst_cid = I("post.dst_cid");

            if($src_cid == $dst_cid){
                $dataJson = array("flag" => 0,"msg" => "不能复制自己节点");
                $this->ajaxReturn($dataJson);
            }
            $article_model = D("Articles");
            $list = $article_model->getArticle($src_cid);
            if(is_array($list) && count($list) > 0){
                $data = $list[0];
                $data["category_id"] = $dst_cid;
                $article_model->addArticle($data);
            }
            $dataJson = array("flag" => 1,"msg" => "ok");
            $this->ajaxReturn($dataJson);
        }
    }

    private function getFullName(){
        //替换日期事件
        $format = date("YymdHis");
        return $format . ".html";
    }

    private function saveProductArticle($content,$file_path = ""){
        $root_path = C('UPLOAD_FILE_PATH') . '/product/' . date("Y-m-d");
        if (!file_exists($root_path) && !mkdir($root_path, 0777, true)){
            return null;
        }else if (!is_writeable($root_path)){
            return null;
        }
        $file_name = $root_path . '/' . $this->getFullName();
        if(!empty($file_path)){
            $file_name = $root_path . '/' . $file_path;
        }
        if (!(file_put_contents($file_name, $content) && file_exists($file_name))){
            return null;
        }
        return $file_name;
    }
}