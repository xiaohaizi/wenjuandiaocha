<?php
namespace app\api\controller;

class Login
{
    public  function LoginIn(){
        
        $data["ticket"]="111";
        $data["integral"]="1";
        return json_encode($data);
    }


    public  function login(){

        $data=request()->instance()->param();


        
          return  json_encode($data);
    }
}