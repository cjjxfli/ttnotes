<?php
/**
 * Created by PhpStorm.
 * User: xfli
 * Date: 2018/5/20
 * Time: 16:29
 */
namespace Admin\Controller;

class BakeController extends AdminController {

    public function downloadFile() {
        $path = C('ROOT_MYSQL_PATH');
        // 检查文件是否存在
        $file_name = $path . C('DB_NAME') . '-' . date("Y-m-d", time()) . '.sql';
        if (!file_exists($file_name)) {
            echo "数据备份文件不存在！" . $file_name;
            exit;
        }
        ob_end_clean();
        header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Length: ' . filesize($file_name));
        header('Content-Disposition: attachment; filename=' . basename($file_name));
        readfile($file_name);
    }

    public function bakeDb(){
        $this->display();
    }

    public function bakeWebsite(){
        $this->display();
    }

    public function exportDatabase(){
        header("Content-type:text/html;charset=utf-8");
        $path = C('ROOT_MYSQL_PATH');
        $model = M();
        //查询所有表
        $sql = "show tables";
        $result = $model->query($sql);
//        print_r($result);
//        echo "运行中，请耐心等待...<br/>";
        $info = "-- ----------------------------\r\n";
        $info .= "-- 日期：" . date("Y-m-d H:i:s", time()) . "\r\n";
        $info .= "-- MySQL - 5.1.73 : Database - " . C('DB_NAME') . "\r\n";
        $info .= "-- ----------------------------\r\n\r\n";
        $info .= "CREATE DATAbase IF NOT EXISTS `" . C('DB_NAME') . "` DEFAULT CHARACTER SET utf8 ;\r\n\r\n";
        $info .= "USE `" . C('DB_NAME') . "`;\r\n\r\n";
        // 检查目录是否存在
        if (is_dir($path)) {
            //echo '目录存在';
            // 检查目录是否可写
            if (is_writable($path)) {
                //echo '目录可写';exit;
            } else {
                echo '目录不可写';
                exit;
                //chmod($path,0777);
            }
        } else {
        //echo '目录不存在';exit;
        // 新建目录
        mkdir($path, 0777, true);
        //chmod($path,0777);
        }
        // 检查文件是否存在
        $file_name = $path . C('DB_NAME') . '-' . date("Y-m-d", time()) . '.sql';
        if (file_exists($file_name)) {
            echo "数据备份文件已存在！" . $file_name;
            exit;
        }
        file_put_contents($file_name, $info, FILE_APPEND);
        foreach ($result as $k => $v) {
            //查询表结构
            //echo "v=" . $v . "\r\n";
            $val = $v['Tables_in_' . C('DB_NAME')];
            $sql_table = "show create table " . $val;
            //echo $sql_table;
            $res = $model->query($sql_table);
            $info_table = "-- ----------------------------\r\n";
            $info_table .= "-- Table structure for `" . $val . "`\r\n";
            $info_table .= "-- ----------------------------\r\n\r\n";
            $info_table .= "DROP TABLE IF EXISTS `" . $val . "`;\r\n\r\n";
            $info_table .= $res[0]['create table'] . ";\r\n\r\n";
            //查询表数据
            $info_table .= "-- ----------------------------\r\n";
            $info_table .= "-- Data for the table `" . $val . "`\r\n";
            $info_table .= "-- ----------------------------\r\n\r\n";
            file_put_contents($file_name, $info_table, FILE_APPEND);
            $sql_data = "select * from " . $val;
            $data = $model->query($sql_data);
            //print_r($data);exit;
            $count = count($data);
            //print_r($count);exit;
            if ($count < 1) continue;
            foreach ($data as $key => $value) {
                $sqlStr = "INSERT INTO `" . $val . "` VALUES (";
                foreach ($value as $v_d) {
                    $v_d = str_replace("'", "\\'", $v_d);
                    $sqlStr .= "'" . $v_d . "', ";
                }
                //需要特别注意对数据的单引号进行转义处理
                //去掉最后一个逗号和空格
                $sqlStr = substr($sqlStr, 0, strlen($sqlStr) - 2);
                $sqlStr .= ");\r\n";
                file_put_contents($file_name, $sqlStr, FILE_APPEND);
            }
            $info = "\r\n";
            file_put_contents($file_name, $info, FILE_APPEND);
        }
        echo "OK!";
    }
}