<?php
namespace Doctor\Controller;
use Think\Controller;
class NewsController extends Controller {
    public function newscenter1(){
        $this->show();
    }
	public function newscenter2(){
        $this->show();
    }
	public function newscenter3(){
        $this->show();
    }
   public function newsdetail($id){
   		$content = $this->fetch("newsdetail_".$id);
        $this->show($content);
    } 

}