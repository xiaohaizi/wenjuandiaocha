<?php
namespace app\api\controller;

class Index
{
    public  function LoginIn(){
        
        $data["ticket"]="111";
        $data["integral"]="1";
        return $data;
    }
}