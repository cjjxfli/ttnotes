<?php
/**
 * Created by PhpStorm.
 * User: xfli
 * Date: 2017/5/21
 * Time: 15:15
 */

namespace Common\Model;

use Think\Model;

class SoftwareModel extends Model{
    protected $tableName = "notes_software";

    public function addSoftware($datas){
        $id = $this->max("id");
        $id++;
        $datas["id"] = $id;
        $category_id = $datas["category_id"];
        $name = $datas["title_software"];
        //如果文件已经存在就重命名
        for($i = 0; $i < 1000; $i++){
            $list = $this->findFavoritesByCidAndName($category_id,$name);
            if(is_array($list) && count($list) > 0){
                $name = $name . $i;
            }else{
                $datas["title_software"] = $name;
                break;
            }
        }
        $check = $this->data($datas)->add();
        return $check;
    }

    public function findFavoritesByCidAndName($cid,$name){
        $map["category_id"] = $cid;
        $map["title_software"] = $name;
        $map["status"] = 1;
        $list = $this->field("*")->where($map)->select();
        return $list;
    }

    public function getSoftwareByCid($cid){
        $map["category_id"] = $cid;
        $map["status"] = 1;
        $list = $this->field("*")->where($map)->select();
        return $list;
    }

    public function getSoftwareByCidAndUserID($cid,$user_id){
        $map["category_id"] = $cid;
        $map["user_id"] = $user_id;
        $map["status"] = 1;
        $list = $this->field("*")->where($map)->select();
        return $list;
    }

    public function getSoftware($software_id){
        $map["id"] = $software_id;
        $map["status"] = 1;
        $list = $this->field("*")
            ->where($map)
            ->select();
        return $list;
    }

    public function getSoftwareByUserID($software_id,$user_id){
        $map["id"] = $software_id;
        $map["user_id"] = $user_id;
        $map["status"] = 1;
        $list = $this->field("*")
            ->where($map)
            ->select();
        return $list;
    }

    public function updateSoftware($software_id,$datas){
        $map["id"] = $software_id;
        $check = $this->data($datas)
            ->where($map)
            ->save();
        return $check;
    }
}