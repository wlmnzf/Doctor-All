<?php
namespace Doctor\Controller;
use Think\Controller;
class GlobalController extends Controller {

    public function head(){
        $this->show();
    }
    public function footer(){
        $this->show();
    }
}