<?php
/**
 * Created by PhpStorm.
 * User: xfli
 * Date: 2018/5/27
 * Time: 11:57
 */
namespace Common\Model;

use Think\Model;

class LatestModel extends Model{
    protected $tableName = "notes_articles";

    /**
     * 按照时间降序获取笔记
     * @param $page
     * @return mixed
     */
    public function getArticles($page){
        $model = M("notes_articles a");
        $lists = $model->join("LEFT JOIN notes_categorys c ON a.category_id=c.id")
            ->join("LEFT JOIN notes_users u ON u.id=a.user_id")
            ->field("a.id,a.path_article,a.title_article,a.create_category_time,a.encode_contents,c.name_category,u.user_login")
            ->where("a.status=1")
            ->order("a.create_category_time desc")
            ->limit($page->firstRow.','.$page->listRows)
            ->select();
        $sql = $model->getLastSql();
        return $lists;
    }

    /**
     * 按时间降序获取收藏网址
     * @param $page
     * @return mixed
     */
    public function getFavorites($page){
        $model = M("notes_favorites a");
        $lists = $model->join("LEFT JOIN notes_categorys c ON a.category_id=c.id")
            ->join("LEFT JOIN notes_users u ON u.id=a.user_id")
            ->field("a.id,a.fav_title,a.fav_url,a.create_category_time,c.name_category,u.user_login")
            ->where("a.fav_status=1")
            ->order("a.create_category_time desc")
            ->limit($page->firstRow.','.$page->listRows)
            ->select();
        $sql = $model->getLastSql();
        return $lists;
    }

    /**
     * 获取笔记总数
     * @return mixed
     */
    public function articlesCount(){
        $map["status"] = 1;
        $model = M("notes_articles a");
        $cnt = $model->where($map)->count();
        return $cnt;
    }

    public function favoritesCount(){
        $map["fav_status"] = 1;
        $model = M("notes_favorites");
        $cnt = $model->where($map)->count();
        return $cnt;
    }
}