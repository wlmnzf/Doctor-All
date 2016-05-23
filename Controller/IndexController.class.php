<?php
namespace Doctor\Controller;
use Think\Controller;
class IndexController extends Controller {

    public function get_encn()
    {
        $encn_res=M()->query("SELECT (select name from think_doctor_dictionary  where id=think_doctor_encn.index) as name,(select remark from think_doctor_dictionary  where id=think_doctor_encn.index) as remark,json FROM think_doctor_encn");
        // cookie('encn',json_encode($encn_res));
        // $encn_res=unescape($encn_res["json"]);
        $cnt=count($encn_res);
        // for($i=0;$i<$cnt;$i++)
        // {
        //     $encn_res[$i]["json"]=unescape($encn_res[$i]["json"]);
        // }
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
    	// $encn_res=M()->query("SELECT (select name from think_doctor_dictionary  where id=think_doctor_encn.index) as name,(select remark from think_doctor_dictionary  where id=think_doctor_encn.index) as remark,json FROM think_doctor_encn");
    	//cookie('name','value');  
    	// var_dump($encn_res);
        // cookie('encn',null);
    	// cookie('encn',json_encode($encn_res));
        // $this->assign("encn_json",json_encode($encn_res));
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