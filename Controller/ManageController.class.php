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

    
     public function encn_init(){
     	$name=I("name");
     	$ret;

     	if(!empty($name))
     	{
     		$param_head["remark"]=$name;
        	$res_head=M("doctor_dictionary")->where($param_head)->find();

        	if(count($res_head)>0)
        	{
        		$id=$res_head["id"];

        		unset($param_head);
        		$param_head["index"]=$id;
        		$res_head=M("doctor_encn")->where($param_head)->find();
        		if(count($res_head)>0)//存在,返回
	        		{
	        			$ret["status"]="OK";
                        // $res_head["json"]=unescape($res_head["json"]);
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
        	//remark 外部取名
        	//name 内部取名，用于明确是哪一部分的
            // $info=escape($info);
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

        	// var_dump($res_head);
        	if($res_head>0)
        		$ret["status"]="OK";
        	else
        		$ret["status"]="Save Error";

        }	

        $this->ajaxReturn($ret);
    }
}