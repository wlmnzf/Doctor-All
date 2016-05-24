<?php
namespace Doctor\Controller;
use Think\Controller;

class ManageController extends Controller {
	 

    public function head(){
        $this->show();
    }
    public function content(){
        $this->show();
    }
     public function footer(){
        $this->show();
    }

    
    //后台管理页面的初始化，主要就是返回数据库里存在的字典信息
    //doctor_dictionary 数据字典
    //think_doctor_encn 中英文字典
     public function encn_init(){
     	$name=I("name");
     	$ret;

     	if(!empty($name))
     	{
            //找出remark为$name的代号
     		$param_head["remark"]=$name;
        	$res_head=M("doctor_dictionary")->where($param_head)->find();
            
            //用代号去中英文字典里搜寻中英文字典数据
        	if(count($res_head)>0)
        	{
        		$id=$res_head["id"];
        		unset($param_head);
        		$param_head["index"]=$id;
        		$res_head=M("doctor_encn")->where($param_head)->find();
        		if(count($res_head)>0)//存在,返回
	        		{
	        			$ret["status"]="OK";
	        			$ret["info"]=($res_head);
	        		}
 				else
	 				{
	 					$ret["status"]="empty";
	 				}
        	}
        	else
        	{
        		$ret["status"]="param error";
        	}
     	}
     	else
     	{
     		$ret["status"]="invalid information";
     	}


     	$this->ajaxReturn($ret);

     }

     public function encn_save(){
     	$name=I("name");
     	$info=(I("info"));
     	$ret;
        
        if(empty($info))
        {
        	$ret["status"]="invalid infomation";
        }
        else
        {
        	//数据库doctor_dictionary内
        	//remark 外部取名（可以自定义）
        	//name 内部取名（代号），用于明确是哪一部分的（不会变的）
            //$info=escape($info);
        	$param_head["remark"]=$name;
        	$res_head=M("doctor_dictionary")->where($param_head)->find();
        	
        	if(count($res_head)>0)
        	{
        		$id=$res_head["id"];
        		unset($param_head);
        		$param_head["index"]=$id;
        		$res_head=M("doctor_encn")->where($param_head)->find();
        		if(count($res_head)>0)//存在,覆盖
	        		{
	        			if($res_head["json"]!=$info)
	        			{
		        			$res_head["json"]=$info;
	 						$res_head=M("doctor_encn")->where("id=".$res_head["id"]."")->save($res_head);
	 					}	
	 					else
	 					{
	 						$res_head=1;
	 					}
	        		}
 				else
	 				{
	 					$res_head["index"]=$id;
	 					$res_head["json"]=$info;
 						$res_head=M("doctor_encn")->add($res_head);	
	 				}
        	}
        	else
        	{
        		$ret["status"]="param error";
        	}


        	if($res_head>0)
        		$ret["status"]="OK";
        	else
        		$ret["status"]="Save Error";

        }	

        $this->ajaxReturn($ret);
    }
}