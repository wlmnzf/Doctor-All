<?php
	return array(
    'URL_MODEL'		=>	2, // 如果你的环境不支持PATHINFO 请设置为3
    'DB_TYPE'		=>	'mysql',
    'DB_HOST'		=>	'qdm168150110.my3w.com',
    'DB_NAME'		=>	'qdm168150110_db',
    'DB_USER'		=>	'qdm168150110',
    'DB_PWD'		=>	'wlm94929',
    'DB_PORT'		=>	'3306',
    'DB_PREFIX'		=>	'think_',
	
    
    /* 模板相关配置 */
    'TMPL_PARSE_STRING' => array(
        // '__STATIC__' => __ROOT__ . '/Public/static',
        // '__ADDONS__' => __ROOT__ . '/Public/' . MODULE_NAME . '/Addons',
        '__IMG__'    => __ROOT__ . '/Application/' . MODULE_NAME.'/View/img',
        '__CSS__'    => __ROOT__ . '/Application/' . MODULE_NAME.'/View/css',
        '__JS__'     => __ROOT__ . '/Application/' . MODULE_NAME.'/View/js',
		// '__MOBILE__'     => __ROOT__ . '/Application/' . MODULE_NAME . '/View/Mobile',
		// '__Mt__'     => __ROOT__ . '/Application/' . MODULE_NAME . '/View/Mt',
    ),
);