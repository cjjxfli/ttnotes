# ttnotes
基于thinkphp3开发的个人云笔记

pc首页示例图：
![pc首页](https://github.com/cjjxfli/ttnotes/blob/master/docs/img/pc-index.png)

手机首页示例图：
![web首页](https://github.com/cjjxfli/ttnotes/blob/master/docs/img/wap-index.png)

安装方法：

1.将整个工程代码拷贝到待部署目录

2.配置Apache虚拟目录

3.配置数据库，sql文件参见doc目录

4.配置Application/Common/config.php

配置项：

    'DB_TYPE'   => 'mysqli', // 数据库类型
    'DB_HOST'   => '127.0.0.1', // 服务器地址
    'DB_NAME'   => 'ttnotes_db', // 数据库名
    'DB_USER'   => 'root', // 用户名
    'DB_PWD'    => '123456',  // 密码
    'DB_PORT'   => '3306', // 端口
    'DB_PREFIX' => '', // 数据库表前缀
    'LOG_RECORD'=>true,  // 进行日志记录
    'LOG_RECORD_LEVEL'       =>   array('EMERG','ALERT','CRIT','ERR','WARN','NOTIC','INFO','DEBUG','SQL'),
    
    
    //***********************************邮件服务器**********************************
    'THINK_EMAIL' => array(
        'SMTP_HOST'   => 'smtp.exmail.qq.com', //SMTP服务器
        'SMTP_PORT'   => '465', //SMTP服务器端口
        'SMTP_USER'   => '', //SMTP服务器用户名
        'SMTP_PASS'   => '', //SMTP服务器密码
        'FROM_EMAIL'  => '', //发件人EMAIL
        'FROM_NAME'   => '', //发件人名称
        'REPLY_EMAIL' => '', //回复EMAIL（留空则为发件人EMAIL）
        'REPLY_NAME'  => '', //回复名称（留空则为发件人名称）
    ),
    
5.在浏览器打开如：127.0.0.1/index.php，访问正常则OK。
