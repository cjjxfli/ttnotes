<?php
/**
 * Created by PhpStorm.
 * User: xf.li
 * Date: 2017/4/17
 * Time: 16:20
 */
namespace Common\Model;

use Think\Model;

class CategorysModel extends Model{
    protected $tableName = "notes_categorys";

    /**
     * 添加分类，父分类为-1，则表示为根目录
     * @param $ancestor_id
     * @param $datas
     * @return mixed
     */
    public function addCategory($cid,$datas){
        $id = $this->max("id");
        $id++;
        $datas["id"] = $id;
        if(empty($datas["category_type"])){
            $datas["category_type"] = 1;
        }
        $name = $datas["name_category"];
        for($i = 0; $i < 1000; $i++){
            $list = $this->findCategoryByCidAndName($cid,$name,$datas["category_type"]);
            if(is_array($list) && count($list) > 0){
                $name = $name . $i;
            }else{
                $datas["name_category"] = $name;
                break;
            }
        }
        $check = $this->data($datas)->add();
        return $check ? $id : $check;
    }

    public function addMultiCategory($datas,$type=1){
        $id = $this->max("id");
        foreach($datas as $k => $v){
            $id++;
            $data_category = array();
            $data_category["name_category"] = $v["name_category"];
            if(empty($v["category_type"])){
                $data_category["category_type"] = $type;
            }else{
                $data_category["category_type"] = $v["category_type"];
            }
            $data_category["user_id"] = $v["user_id"];

            $data_category["sub_categorys_count"] = 0;
            $data_category["files_include"] = 0;
            $now_time = time();
            $data_category["create_category_time"] = $now_time;
            $data_category["last_update_time"] = $now_time;
            $data_category["last_visit_time"] = $now_time;
            $data_category["status"] = 1;
            if(-1 == $v["cid"]){
                $data_category["is_root"] = 1;
            }
            $data_category["id"] = $id;
            $id = $this->addCategory($v["cid"],$data_category);
            $check = $this->addDescentdantCategory($v["cid"],$id);
        }

        return $check ? $id : $check;
    }

    /**
     * 添加目录树父子关系
     * @param $ancestor_id
     * @param $descentdant_id
     * @return mixed
     */
    public function addDescentdantCategory($ancestor_id,$descentdant_id){
        $tree_model = M("notes_files_tree");
        $id = $tree_model->max("descendant_id");
        $id++;
        $sql = 'INSERT INTO notes_files_tree(ancestor_id,descendant_id,depth) SELECT t.ancestor_id,'.$id.',t.depth+1 FROM notes_files_tree AS t WHERE t.descendant_id = '.$ancestor_id .' UNION ALL SELECT '.$id.','.$id.',0';
        $check = $tree_model->execute($sql);
        return $check;
    }

    /**
     * 根据分类id，获取目录信息
     * @param $category_id
     * @return mixed
     */
    public function getCategoryById($category_id){
        $map["id"] = $category_id;
        $list = $this->field("*")
            ->where($map)
            ->select();
        return $list;
    }

    /**
     * 获取分类id的所有祖先节点
     * @param $category_id
     * @param int $type
     * @return mixed
     */
    public function getAncestorCategory($category_id,$type=1){
        $sql = "1=1 AND F.descendant_id=".$category_id." AND F.ancestor_id!=F.descendant_id AND C.status=1 AND C.category_type=".$type;
        $list = $this->table("notes_categorys AS C")
            ->join("INNER JOIN notes_files_tree AS F ON C.id=F.ancestor_id")
            ->field("C.*")
            ->where($sql)
            ->select();
        return $list;
    }

    /**
     * 获取指定用户分类id的所有祖先节点
     * @param $category_id
     * @param $user_id
     * @param int $type
     * @return mixed
     */
    public function getAncestorCategoryByUserID($category_id,$user_id,$type=1){
        $sql = "1=1 AND F.descendant_id=".$category_id." AND F.ancestor_id!=F.descendant_id AND C.status=1 AND C.category_type=".$type." AND C.user_id=".$user_id;
        $list = $this->table("notes_categorys AS C")
            ->join("INNER JOIN notes_files_tree AS F ON C.id=F.ancestor_id")
            ->field("C.*")
            ->where($sql)
            ->select();
        return $list;
    }

    /**
     * 获取分类id的所有子节点
     * @param $category_id
     * @param int $type
     * @return mixed
     */
    public function getDescentdantCategory($category_id,$type=1){
        $sql = "1=1 AND F.ancestor_id=".$category_id." AND F.ancestor_id!=F.descendant_id AND C.status=1 AND C.category_type=".$type;
        if($category_id == -1){
            $sql = "F.descendant_id!=F.ancestor_id AND C.is_root=1 AND C.status=1 AND C.category_type=".$type;
        }
        $list = $this->table("notes_categorys AS C")
            ->join("INNER JOIN notes_files_tree AS F ON C.id=F.descendant_id")
            ->field("C.*,F.*")
            ->where($sql)
            ->select();
        $last_sql = $this->getLastSql();
        return $list;
    }

    /**
     * 获取直接子节点
     * @param $category_id
     * @param int $type
     * @return mixed
     */
    public function getSonsCategory($category_id,$type=1){
        $sql = "1=1 AND F.ancestor_id=".$category_id." AND F.ancestor_id!=F.descendant_id AND F.depth=1 AND C.status=1 AND C.category_type=".$type;
        if($category_id == -1){
            $sql = "1=1 AND C.is_root=1 AND F.depth=0 AND C.status=1 AND C.category_type=".$type;
        }
        $list = $this->table("notes_categorys AS C")
            ->join("INNER JOIN notes_files_tree AS F ON C.id=F.descendant_id")
            ->field("C.*")
            ->where($sql)
            ->select();
        $last_sql = $this->getLastSql();
        return $list;
    }

    /**
     * 更新目录信息
     * @param $category_id
     * @param $datas
     * @return bool
     */
    public function updateCategory($category_id,$datas){
        $map["id"] = $category_id;
        $check = $this->data($datas)->where($map)->save();
        return $check;
    }

    /**
     * 从$src_category_id拷贝目录信息到$dst_category_id
     * @param $src_category_id
     * @param $dst_category_id
     */
    public function copyCategory($src_category_id,$dst_category_id){}

    /**
     * 从$src_category_id移动目录信息到$dst_category_id
     * @param $src_category_id
     * @param $dst_category_id
     */
    public function moveCategory($src_category_id,$dst_category_id){}

    public function findCategoryByCidAndName($cid,$name,$type=1){
        $sql = "1=1 AND F.ancestor_id=".$cid." AND F.ancestor_id!=F.descendant_id AND F.depth=1 AND C.status=1 AND C.name_category=".$name." AND C.category_type=".$type;
        if($cid == -1){
            $sql = "1=1 AND C.is_root=1 AND F.depth=0 AND C.status=1 AND C.name_category=".$name;
        }
        $list = $this->table("notes_categorys AS C")
            ->join("INNER JOIN notes_files_tree AS F ON C.id=F.descendant_id")
            ->field("C.*")
            ->where($sql)
            ->select();
        return $list;
    }

    /**
     * 获取指定用户的分类目录
     * @param $user_id
     * @param $type
     * @param bool|true $is_root
     * @return mixed
     */
    public function getCategoryByUserID($user_id,$type,$is_root=true){
        $map["user_id"] = $user_id;
        if($is_root){
            $map["is_root"] = 1;
        }else{
            $map["is_leaf"] = 1;
        }
        $map["category_type"] = $type;
        $list = $this->field("*")->where($map)->select();
        return $list;
    }

    /**
     * 获取直接子节点
     * @param $category_id
     * @param int $type
     * @return mixed
     */
    public function getSonsCategoryByUserID($category_id,$user_id,$type=1){
        $sql = "1=1 AND F.ancestor_id=".$category_id." AND F.ancestor_id!=F.descendant_id AND F.depth=1 AND C.status=1 AND C.category_type=".$type." AND C.user_id=".$user_id;
        if($category_id == -1){
            $sql = "1=1 AND C.is_root=1 AND F.depth=0 AND C.status=1 AND C.category_type=".$type." AND C.user_id=".$user_id;
        }
        $list = $this->table("notes_categorys AS C")
            ->join("INNER JOIN notes_files_tree AS F ON C.id=F.descendant_id")
            ->field("C.*")
            ->where($sql)
            ->select();
        $last_sql = $this->getLastSql();
        return $list;
    }
}