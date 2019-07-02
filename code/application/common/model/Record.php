<?php

namespace  app\common\model;

use think\Db;
use think\Model;

class Record extends Model
{
    public function Member()
    {
        return $this->hasOne('Member','id','member_id')->field('id,phone,realname,company');        
    }
   

 }
