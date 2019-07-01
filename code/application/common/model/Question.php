<?php
namespace  app\common\model;

use think\Db;
use think\Model;
class Question extends Model {

    public function Answer()
    {
        return $this->hasMany('Answers','question_id','id')->field('id,content,is_right,question_id');
        
    }

}