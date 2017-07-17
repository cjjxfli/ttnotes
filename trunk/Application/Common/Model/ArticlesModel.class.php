<?php
/**
 * Created by PhpStorm.
 * User: xf.li
 * Date: 2017/4/17
 * Time: 16:22
 */

namespace Common\Model;

use Think\Model;

class ArticlesModel extends Model{
    protected $tableName = "notes_articles";

    /**
     * 添加文章
     * @param $datas
     * @return mixed
     */
    public function addArticle($datas){
        $id = $this->max("id");
        $id++;
        $datas["id"] = $id;
        $category_id = $datas["category_id"];
        $name = $datas["title_article"];
        //如果文件已经存在就重命名
        for($i = 0; $i < 1000; $i++){
            $list = $this->findArticlByCidAndName($category_id,$name);
            if(is_array($list) && count($list) > 0){
                $name = $name . $i;
            }else{
                $datas["title_article"] = $name;
                break;
            }
        }
        $check = $this->data($datas)->add();
        return $check;
    }

    /**
     * 根据文章id获取文章内容
     * @param $article_id
     * @return mixed
     */
    public function getArticle($article_id){
        $map["id"] = $article_id;
        $map["status"] = 1;
        $list = $this->field("*")
            ->where($map)
            ->select();
        return $list;
    }

    /**
     * 获取指定cid的文章总数
     * @param $cid
     * @return mixed
     */
    public function getArticlesCountByCid($cid){
        $map["category_id"] = $cid;
        $map["status"] = 1;
        $cnt = $this->field("*")
            ->where($map)
            ->count();
        return $cnt;
    }

    public function getArticlesByCid($cid){
        $map["category_id"] = $cid;
        $map["status"] = 1;
        $list = $this->field("*")
            ->where($map)
            ->select();
        return $list;
    }

    /**
     * 获取指定用户分类的文章
     * @param $cid
     * @param $user_id
     * @return mixed
     */
    public function getArticlesByCidAndUserID($cid,$user_id){
        $map["category_id"] = $cid;
        $map["user_id"] = $user_id;
        $map["status"] = 1;
        $list = $this->field("*")
            ->where($map)
            ->select();
        return $list;
    }

    /**
     * 按照分页，获取指定cid的文章列表
     * @param $cid
     * @param $page
     * @return mixed
     */
    public function getArticleByPage($cid,$page){
        $map["category_id"] = $cid;
        $map["status"] = 1;
        $list = $this->field("*")
            ->where($map)
            ->page($page->firstRow . ',' . $page->listRows)
            ->select();
        return $list;
    }

    /**
     * 根据文章id更新文章
     * @param $article_id
     * @param $datas
     * @return bool
     */
    public function updateArticle($article_id,$datas){
        $map["id"] = $article_id;
        $check = $this->data($datas)
            ->where($map)
            ->save();
        return $check;
    }

    public function findArticlByCidAndName($cid,$name){
        $map["category_id"] = $cid;
        $map["title_article"] = $name;
        $map["status"] = 1;
        $list = $this->field("*")->where($map)->select();
        return $list;
    }
}