<?php
namespace Doctor\Controller;
use Think\Controller;
class RecruitmentController extends Controller {
    public function hr(){
        $this->show();
    }

    public function detail_hr($id){
    	
    	$content = $this->fetch('job'.$id);
        $this->show($content);
    }
}