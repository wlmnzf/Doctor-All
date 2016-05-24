<?php
namespace Doctor\Controller;
use Think\Controller;
class IndexController extends Controller {


/**
 * @function [获取字典数据，并返回]
 * @return [json 字典数据]
 */
    public function get_encn()
    {
        $encn_res=M()->query("SELECT (select name from think_doctor_dictionary  where id=think_doctor_encn.index) as name,(select remark from think_doctor_dictionary  where id=think_doctor_encn.index) as remark,json FROM think_doctor_encn");
        $cnt=count($encn_res);
        if(IS_POST)
        {
           $this->ajaxReturn(json_encode($encn_res));
        }
        else
        {
           return json_encode($encn_res);
        }
    }


    public function index(){
        $langSetting=I("lang");
        if(empty($langSetting))
        {
             $langSetting=cookie('targetlang');
        }
       
        if(empty($langSetting))
        {
            cookie('targetlang',"cn");
        }
        else
        {
            cookie('targetlang',$langSetting);
        }

        $this->show();
    }



    public function partner(){
        $this->show();
    }
}