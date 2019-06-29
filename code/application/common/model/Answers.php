<?php
namespace  app\common\model;

use think\Db;
use think\Model;
class Answers extends Model {

    public function Question()
    {
        return $this->hasOne('Question','id','question_id')->field('id,title,q_type');
        
    }
}