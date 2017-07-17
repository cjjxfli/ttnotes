-- -------------------------------------------------
-- @date 2016-12-23
-- @author xfli
-- @notes 基础数据表
-- -------------------------------------------------

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ------------------------------------
-- 用户表
-- ------------------------------------
DROP TABLE IF EXISTS `notes_users`;
CREATE TABLE `notes_users` (
  `id` int(11) NOT NULL COMMENT '用户表主键id',
  `user_login` varchar(255) NOT NULL DEFAULT '' COMMENT '用户名',
  `user_pass` varchar(255) NOT NULL DEFAULT '' COMMENT '登录密码',
  `user_email` varchar(255) NOT NULL DEFAULT '' COMMENT '登录邮箱',
  `avatar` varchar(255) NOT NULL DEFAULT '' COMMENT '用户头像，相对于upload/avatar目录',
  `last_login_ip` varchar(255) NOT NULL DEFAULT '' COMMENT '最后登录ip',
  `last_login_time` datetime  NOT NULL DEFAULT 0  COMMENT '最后登录时间',
  `create_time` datetime  NOT NULL DEFAULT 0  COMMENT '注册时间',
  `last_login_address` varchar(255) NOT NULL DEFAULT '' COMMENT '用户最后登录地址',
  `user_status` int(11) NOT NULL DEFAULT 1 COMMENT '用户状态 0：禁用； 1：正常 ；2：未验证',
  `email_token` varchar(255) NOT NULL DEFAULT '' COMMENT '邮箱激活token',
  `status` tinyint(4) NOT NULL DEFAULT 0 COMMENT '注册状态，0未激活，1已激活，2已停用，3待审核，4已审核',
  `email_send_time` int(11) NOT NULL DEFAULT 0 COMMENT '邮件发送时间',
  `email_expired_time` int(11) NOT NULL DEFAULT 79800 COMMENT '邮件激活超时时间，默认为24小时，超时后，需要重新注册',
  `find_back_email_expired_time` int(11) NOT NULL DEFAULT 7200 COMMENT '通过邮箱找回密码的超时时间，默认2小时',
  PRIMARY KEY (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ------------------------------------
-- 目录表
-- ------------------------------------
DROP TABLE IF EXISTS `notes_categorys`;
CREATE TABLE `notes_categorys`(
	`id` int(11) NOT NULL COMMENT '目录表主键id',
	`name_category` varchar(255) NOT NULL DEFAULT '' COMMENT '目录名称',
	`sub_categorys_count` int(11) NOT NULL DEFAULT 0 COMMENT '子目录个数',
	`files_include` int(11) NOT NULL DEFAULT 0 COMMENT '当前目录文件个数',
	`create_category_time` int(11) NOT NULL DEFAULT 0 COMMENT '目录创建时间',
	`last_update_time` int(11) NOT NULL DEFAULT 0 COMMENT '最后一次目录更新时间',
	`last_visit_time` int(11) NOT NULL DEFAULT 0 COMMENT '上一次目录访问时间',
	`status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '1为已发布，2为删除',
	`is_root` tinyint(4) NOT NULL DEFAULT 0 COMMENT '是否是根节点，1为根节点',
	`is_leaf` tinyint(4) NOT NULL DEFAULT 0 COMMENT '是否是叶子节点，1为叶子节点',
	`category_type` tinyint(4) NOT NULL DEFAULT 1 COMMENT '目录类型，1为笔记本目录，2为收藏夹目录，3为下载分类',
	`user_id` int(11) NOT NULL DEFAULT 0 COMMENT '用户表外键id',
	PRIMARY KEY(`id`),
	FOREIGN KEY (`user_id`) REFERENCES notes_users(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ------------------------------------
-- 目录文件树(父子关系)表
-- ------------------------------------
DROP TABLE IF EXISTS `notes_files_tree`;
CREATE TABLE `notes_files_tree`(
	`ancestor_id` int(11) NOT NULL DEFAULT 0 COMMENT '目录祖先节点',
	`descendant_id` int(11) NOT NULL DEFAULT 0 COMMENT '目录后代节点',
	`depth` int(11) NOT NULL DEFAULT 0 COMMENT '到子节点的深度',
	PRIMARY KEY(ancestor_id,descendant_id),
	FOREIGN KEY (ancestor_id) REFERENCES notes_categorys(id),
	FOREIGN KEY (descendant_id) REFERENCES notes_categorys(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ------------------------------------
-- 文章表
-- ------------------------------------
DROP TABLE IF EXISTS `notes_articles`;
CREATE TABLE `notes_articles`(
	`id` int(11) NOT NULL COMMENT '文章表主键id',
	`category_id` int(11) NOT NULL COMMENT '目录表id',
	`ref_article_url` varchar(255) NOT NULL DEFAULT '' COMMENT '文章引用原文链接地址',
	`path_article` varchar(255) NOT NULL DEFAULT '' COMMENT '文章在本系统的存储路径',
	`encode_contents` text NOT NULL DEFAULT '' COMMENT '文章内容',
	`title_article` varchar(255) NOT NULL DEFAULT '' COMMENT '文章标题',
	`key_words_article` varchar(255) NOT NULL DEFAULT '' COMMENT '文章关键字',
	`abstract_article` varchar(255) NOT NULL DEFAULT '' COMMENT '文章摘要',
	`author_article` varchar(255) NOT NULL DEFAULT '' COMMENT '文章作者',
	`old_author_article` varchar(255) NOT NULL DEFAULT '' COMMENT '被引用的原作者',
	`create_category_time` int(11) NOT NULL DEFAULT 0 COMMENT '目录创建时间',
	`last_update_time` int(11) NOT NULL DEFAULT 0 COMMENT '最后一次目录更新时间',
	`last_visit_time` int(11) NOT NULL DEFAULT 0 COMMENT '上一次目录访问时间',
	`status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '1为已发布，2为删除',
	`user_id` int(11) NOT NULL DEFAULT 0 COMMENT '用户表外键id',
	PRIMARY KEY(`id`),
	FOREIGN KEY (`user_id`) REFERENCES notes_users(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- ------------------------------------
-- 收藏夹表
-- ------------------------------------
DROP TABLE IF EXISTS `notes_favorites`;
CREATE TABLE `notes_favorites`(
	`id` int(11) NOT NULL COMMENT '收藏夹表主键id',
	`category_id` int(11) NOT NULL COMMENT '目录表id',
	`fav_title` varchar(255) NOT NULL DEFAULT '' COMMENT '收藏title',
	`fav_url` varchar(255) NOT NULL DEFAULT '' COMMENT '收藏url',
	`fav_hot` tinyint(4) NOT NULL DEFAULT 0 COMMENT '热点收藏',
	`create_category_time` int(11) NOT NULL DEFAULT 0 COMMENT '目录创建时间',
	`last_update_time` int(11) NOT NULL DEFAULT 0 COMMENT '最后一次目录更新时间',
	`last_visit_time` int(11) NOT NULL DEFAULT 0 COMMENT '上一次目录访问时间',
	`fav_status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '收藏状态，1正常，2删除',
	`user_id` int(11) NOT NULL DEFAULT 0 COMMENT '用户表外键id',
	PRIMARY KEY (`id`),
	FOREIGN KEY (`user_id`) REFERENCES notes_users(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ------------------------------------
-- 软件表
-- ------------------------------------
DROP TABLE IF EXISTS `notes_software`;
CREATE TABLE `notes_software`(
	`id` int(11) NOT NULL COMMENT '软件表主键id',
	`category_id` int(11) NOT NULL COMMENT '目录表id',
	`path_software` varchar(255) NOT NULL DEFAULT '' COMMENT '软件在本系统的存储路径',
	`title_software` varchar(255) NOT NULL DEFAULT '' COMMENT '软件标题',
	`key_words_software` varchar(255) NOT NULL DEFAULT '' COMMENT '软件关键词',
	`wiki_software` text NOT NULL DEFAULT '' COMMENT '软件说明',
	`create_category_time` int(11) NOT NULL DEFAULT 0 COMMENT '目录创建时间',
	`last_update_time` int(11) NOT NULL DEFAULT 0 COMMENT '最后一次目录更新时间',
	`last_visit_time` int(11) NOT NULL DEFAULT 0 COMMENT '上一次目录访问时间',
	`status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '软件状态，1正常，2删除',
	`user_id` int(11) NOT NULL DEFAULT 0 COMMENT '用户表外键id',
	PRIMARY KEY (`id`),
	FOREIGN KEY (`user_id`) REFERENCES notes_users(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;