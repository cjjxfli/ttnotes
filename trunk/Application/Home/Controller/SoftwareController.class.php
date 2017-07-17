<?php
/**
 * Created by PhpStorm.
 * User: xfli
 * Date: 2017/5/21
 * Time: 15:08
 */

namespace Home\Controller;

class SoftwareController extends HomeController{
    public function index(){
        $cid = I("get.cid");
        if(empty($cid)){
            $cid = -1;
        }
        $files_count = 0;
        $type = 3;
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
        //获取软件
        $model_software = D("Software");
        unset($list);
        $list = $model_software->getSoftwareByUserID($cid,get_user_id());
        $software_data = array();
        foreach($list as $k => $v){
            $temp = array();
            $full_path_name = $v["path_software"];
            $files_array = explode(".",$full_path_name);
            $zip_array = array("zip","rar","tar","tar.gz","7z");
            $file_ext = $files_array[count($files_array)-1];
            if(in_array($file_ext,$zip_array)){
                $temp["file_type"] = "fileicon-small-zip";
            }else if($file_ext == "exe"){
                $temp["file_type"] = "fileicon-sys-s-exe";
            }else{
                $temp["file_type"] = "fileicon-sys-s-web";
            }
            $temp["fav_url"] = $v["path_software"];
            $temp["fav_title"] = $v["title_software"];
            $temp["id"] = $v["id"];
            $temp["last_update_time"] = date("Y-m-d H:m",$v["last_update_time"]);
            $software_data[] = $temp;
            $files_count++;
        }
        $this->assign("software_info",$software_data);
        $this->assign("software_ancestor_info",$ancestor_data);
        $this->assign("category_cid",$cid);
        $this->assign("software_category_info",$fav_category_data);
        $this->assign("root_software_info",$fav_root_category);
        $this->assign("files_count",$files_count);
        $this->display();
    }

    public function addSoftwareCategory(){
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
            $data_category["category_type"] = 3;
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

    public function addSofware(){
        if(IS_POST){
            $category_info = array();
            $dataJson = array("flag" => 1,"msg" => "ok","list" => $category_info);
            $this->ajaxReturn($dataJson);
        }
    }

    public function copySoftwareCategory(){
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
                $dst_cid = $category_model->addMultiCategory($src_data,3);
                if(empty($dst_cid)){
                    $dataJson = array("flag" => 0,"msg" => "error");
                    $this->ajaxReturn($dataJson);
                }
                $dst_array[] = $dst_cid;
                unset($list);
            }

            //递归拷贝直接子节点
            for($i = 0; $i < count($dst_array);$i++){
                $tmp = $dst_array[$i];
                $this->copyCategoryRecursive($src_cid[$i],$tmp);
            }


            $dataJson = array("flag" => 1,"msg" => "OK");
            $this->ajaxReturn($dataJson);
        }
    }

    private function copyCategoryRecursive($src_cid,$dst_cid){
        $src_data = array();
        $category_model = D("Categorys");
        $list = $category_model->getSonsCategoryByUserID($src_cid,get_user_id(),3);
        //获取当前软件分类的列表
        $software_model = D("Software");
        $software_list = $software_model->getSoftwareByCidAndUserID($src_cid,get_user_id());
        if(is_array($software_list) && count($software_list) > 0){
            foreach($software_list as $k => $v){
                $v["category_id"] = $dst_cid;
                $now_time = time();
                $v["create_category_time"] = $now_time;
                $v["last_update_time"] = $now_time;
                $v["last_visit_time"] = $now_time;
                $v["user_id"] = get_user_id();
                $software_model->addSoftware($v);
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
                $cur_dst_id = $category_model->addMultiCategory($src_data,3);
                $this->copyCategoryRecursive($v["id"],$cur_dst_id);
            }
        }
    }

    public function copySoftware(){
        if(IS_POST){
            $src_cid = I("post.src_cid");
            $dst_cid = I("post.dst_cid");

            if($src_cid == $dst_cid){
                $dataJson = array("flag" => 0,"msg" => "不能复制自己节点");
                $this->ajaxReturn($dataJson);
            }
            $software_model = D("Software");
            $list = $software_model->getSoftwareByUserID($src_cid,get_user_id());
            if(is_array($list) && count($list) > 0){
                $data = $list[0];
                $data["category_id"] = $dst_cid;
                $software_model->addSoftware($data);
            }

            $dataJson = array("flag" => 1,"msg" => "OK");
            $this->ajaxReturn($dataJson);
        }
    }

    public function deleteSoftwareCategory(){
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

    public function deleteSoftware(){
        if(IS_POST){
            $src_category = I("post.src_category");

            if(empty($src_category)){
                $dataJson = array("flag" => 0,"msg" => "error");
                $this->ajaxReturn($dataJson);
            }
            $software_model = D("Software");
            $data_article = array();
            $data_article["status"] = 2;
            $data_article["last_update_time"] = time();
            $software_model->updateSoftware($src_category,$data_article);
            $dataJson = array("flag" => 1,"msg" => "ok");
            $this->ajaxReturn($dataJson);
        }
    }

    public function downloadSoftware(){
        $cid = I("get.cid");
        if(empty($cid) || $cid < 0){
            $this->redirect("请求的资源不存在",U("Home/Software/index"));
        }
        $model_software = D("Software");
        $list = $model_software->getSoftware($cid);
        foreach($list as $k => $v){
            $file_path = C(SOFTWARE_UPLOAD_BASE_PATH) . $v["path_software"];
            if(!file_exists($file_path)){ //检查文件是否存在
                $this->error("请求的资源不存在",U("Home/Software/index"));
            }
            $file_name=basename($file_path);
            //$file_type=explode('.',$file_path);
            //$file_type=$file_type[count($file_type)-1];
            $file_name=$file_name;
            $file_type=fopen($file_path,'r'); //打开文件
            //输入文件标签
            header("Content-type: application/octet-stream");
            header("Accept-Ranges: bytes");
            header("Accept-Length: ".filesize($file_path));
            header("Content-Disposition: attachment; filename=".$file_name);
            //输出文件内容
            echo fread($file_type,filesize($file_path));
            fclose($file_type);
            break;
        }
    }

    public function uploadSoftware(){
        $software_name = I("post.software_name");
        $software_cid = I("post.software_cid");
        $software_key_words = I("post.software_key_words");
        $wiki_software = I("post.wiki_software");
        $config = array(
            'maxSize'    =>    1024 * 1024 * 10,
            'rootPath'   =>    C(SOFTWARE_UPLOAD_BASE_PATH),//'./Uploads/software/',
            'savePath'   =>    '',
            'saveName'   =>    array('uniqid',''),
            'exts'       =>    array('exe', 'rar', 'zip', 'tar', 'tar.gz'),
            'autoSub'    =>    true,
            'subName'    =>    array('date','Ymd'),
        );
        $upload = new \Think\Upload($config);// 实例化上传类
        // 上传文件
        $info   =   $upload->upload();
        if(!$info) {// 上传错误提示错误信息
            $this->error($upload->getError(),U('Home/Software/index'));
        }else{// 上传成功
            $model_software = D("Software");
            foreach($info as $file){
                $datas = array();
                $datas["path_software"] = $file['savepath'].$file['savename'];
                $datas["title_software"] = $software_name;
                $datas["key_words_software"] = $software_key_words;
                $datas["wiki_software"] = $wiki_software;
                $datas["status"] = 1;
                $datas["category_id"] = $software_cid;
                $datas["user_id"] = session("user_id");
                $now_time = time();
                $datas["create_category_time"] = $now_time;
                $datas["last_update_time"] = $now_time;
                $datas["last_visit_time"] = $now_time;
                $check = $model_software->addSoftware($datas);
                if(!empty($check)){
                    $this->success('上传成功！',U('Home/Software/index','',false).'/cid/'.$software_cid);
                }else{
                    $this->error("上传失败",U('Home/Software/index','',false).'/cid/'.$software_cid);
                }
            }
            $this->error("上传失败",U('Home/Software/index','',false).'/cid/'.$software_cid);
        }
    }

    public function moveSoftwareCategory(){
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
                $tmp = $src_cid[$i];
                $list = $category_model->getCategoryById($tmp);
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
                $cur_dst_id = $category_model->addMultiCategory($src_data,3);
                if(empty($cur_dst_id)){
                    $dataJson = array("flag" => 0,"msg" => "error");
                    $this->ajaxReturn($dataJson);
                }
                $dst_array[] = $cur_dst_id;
                //将原先软件分类标记为删除
                $update_category_data = array();
                $update_category_data["status"] = 2;
                $update_category_data["last_update_time"] = time();
                $category_model->updateCategory($tmp,$update_category_data);
            }

            for($i = 0; $i < count($dst_array);$i++){
                $tmp = $dst_array[$i];
                $this->moveCategoryRecursive($src_cid[$i],$tmp);
            }

            $dataJson = array("flag" => 1,"msg" => "ok");
            $this->ajaxReturn($dataJson);
        }
    }

    private function moveCategoryRecursive($src_cid,$dst_cid){
        $src_data = array();
        $category_model = D("Categorys");
        $list = $category_model->getSonsCategoryByUserID($src_cid,get_user_id(),3);
        //$self_list = $category_model->getCategoryById($src_cid);
        //获取当前软件分类的软件列表
        $software_model = D("Software");
        $article_list = $software_model->getSoftwareByCidAndUserID($src_cid,get_user_id());
        if(is_array($article_list) && count($article_list) > 0){
            foreach($article_list as $k => $v){
                $v["category_id"] = $dst_cid;
                $now_time = time();
                $v["create_category_time"] = $now_time;
                $v["last_update_time"] = $now_time;
                $v["last_visit_time"] = $now_time;
                $software_model->addSoftware($v);
                //将原先软件标记为删除
                $update_article_data = array();
                $update_article_data["status"] = 2;
                $update_article_data["last_update_time"] = time();
                $software_model->updateSoftware($v["id"],$update_article_data);
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
                $cur_dst_id = $category_model->addMultiCategory($src_data,3);
                //将原先软件分类标记为删除
                $update_category_data = array();
                $update_category_data["status"] = 2;
                $update_category_data["last_update_time"] = time();
                $category_model->updateCategory($v["id"],$update_category_data);
                $this->moveCategoryRecursive($v["id"],$cur_dst_id);
            }
        }
    }

    public function moveSoftware(){
        if(IS_POST){
            $src_cid = I("post.src_cid");
            $dst_cid = I("post.dst_cid");

            if($src_cid == $dst_cid){
                $dataJson = array("flag" => 0,"msg" => "不能复制自己节点");
                $this->ajaxReturn($dataJson);
            }
            $software_model = D("Software");
            $list = $software_model->getSoftware($src_cid);
            if(is_array($list) && count($list) > 0){
                $data = $list[0];
                $data["category_id"] = $dst_cid;
                $software_model->addSoftware($data);
                //将原软件标记为删除
                $update_article_data = array();
                $update_article_data["status"] = 2;
                $update_article_data["last_update_time"] = time();
                $software_model->updateSoftware($list[0]["id"],$update_article_data);
            }

            $dataJson = array("flag" => 1,"msg" => "OK");
            $this->ajaxReturn($dataJson);
        }
    }

    public function renameSoftwareCategory(){
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

    public function renameSoftware(){
        if(IS_POST){
            $name = I("post.category_name");
            $src_category = I("post.cid");
            //$dst_category = I("post.dst_category");

            if(empty($src_category) || empty($name)){
                $dataJson = array("flag" => 0,"msg" => "error");
                $this->ajaxReturn($dataJson);
            }
            $software_model = D("Software");
            $data_software = array();
            $data_software["title_software"] = $name;
            $data_software["last_update_time"] = time();
            $software_model->updateSoftware($src_category,$data_software);

            $dataJson = array("flag" => 1,"msg" => "OK");
            $this->ajaxReturn($dataJson);
        }
    }

    public function openSoftwareCategory(){
        if(IS_POST){
            $cid = I("post.cid");
            $category_model = D("Categorys");
            $list = $category_model->getSonsCategoryByUserID($cid,get_user_id(),3);
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
            $this->redirect('Home/Software/index/cid/'.$cid);
        }
    }

    public function openSoftware(){
        if(IS_POST){
            $dataJson = array("flag" => 1,"msg" => "ok");
            $this->ajaxReturn($dataJson);
        }else{
            $id = I("get.aid");
            if($id < 1){
                $this->error("Software不存在",U('Home/Software/index'));
            }
            $software_model = D("Software");
            $list = $software_model->getSoftware($id);
//            if(is_array($list) && count($list) > 0){
//                $article_info = array();
//                $article_info["id"] = $id;
//                $article_info["title"] = $list[0]["fav_title"];
//                $article_info["content"] = $list[0]["fav_url"];
//                $this->assign("article_info",$article_info);
//                $this->redirect($list[0]["fav_url"]);
//            }
//
//            $this->display("details");
        }
    }

    public function readSoftwareCategoryTrees(){
        if(IS_POST){
            $cid = -1;
            $model_category = D("Categorys");
            $list = $model_category->getSonsCategoryByUserID($cid,get_user_id(),3);
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
            $software_model = D("Software");
            unset($list);
            $list = $software_model->getSoftwareByCidAndUserID($cid,get_user_id());
            $article_data = array();
            foreach($list as $k => $v){
                $temp = array();
                $temp["path_article"] = $v["path_software"];
                $temp["file_name"] = $v["title_software"];
                $temp["title_article"] = $v["title_software"];
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