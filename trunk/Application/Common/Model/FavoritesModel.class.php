<?php
/**
 * Created by PhpStorm.
 * User: xfli
 * Date: 2017/5/5
 * Time: 7:46
 */
namespace Common\Model;

use Think\Model;

class FavoritesModel extends Model{
    protected $tableName = "notes_favorites";

    public function addFavorites($datas){
        $id = $this->max("id");
        $id++;
        $datas["id"] = $id;
        $category_id = $datas["category_id"];
        $name = $datas["fav_title"];
        //如果文件已经存在就返回
        for($i = 0; $i < 1000; $i++){
            $list = $this->findFavoritesByCidAndName($category_id,$name,$datas["user_id"]);
            if(is_array($list) && count($list) > 0){
                $name = $name . $i;
                return $id;
            }else{
                $datas["fav_title"] = $name;
                break;
            }
        }
        $check = $this->data($datas)->add();
        return $check;
    }

    public function findFavoritesByCidAndName($cid,$name,$user_id=1){
        $map["category_id"] = $cid;
        $map["fav_title"] = $name;
        $map["fav_status"] = 1;
        $map["user_id"] = $user_id;
        $list = $this->field("*")->where($map)->select();
        return $list;
    }

    public function getFavoritesByCid($cid){
        $map["category_id"] = $cid;
        $map["fav_status"] = 1;
        $list = $this->field("*")->where($map)->select();
        return $list;
    }

    public function getFavoritesByCidAndUserID($cid,$user_id){
        $map["category_id"] = $cid;
        $map["user_id"] = $user_id;
        $map["fav_status"] = 1;
        $list = $this->field("*")->where($map)->select();
        return $list;
    }

    public function updateFavorites($article_id,$datas){
        $map["id"] = $article_id;
        $check = $this->data($datas)
            ->where($map)
            ->save();
        return $check;
    }

    public function getFavorites($article_id){
        $map["id"] = $article_id;
        $map["fav_status"] = 1;
        $list = $this->field("*")
            ->where($map)
            ->select();
        return $list;
    }
}