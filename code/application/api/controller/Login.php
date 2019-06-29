<?php

namespace app\api\controller;


class Login
{
    public  function LoginIn()
    {

        $data["ticket"] = "111";
        $data["integral"] = "1";
        return json_encode($data);
    }


    public  function login()
    {

        $data["staus"] = 300;
        $data["msg"] = "错误";
        $data["data"] = "";
        if (request()->instance()->isPost()) {
            $res = 0;
            $post = request()->instance()->param();
            $member = model("Member");

            $memberData =  $member->where(["phone" => $post["phone"]])->field('id,phone,realname,company')->find();

            if (empty($memberData)) {
                $res =  $member->save($post);
                $post["id"] = $member->id;
                $data["staus"] = 200;
                $data["msg"] = "登录成功";
                $data["data"] = $post;
            } else {
                $post["id"] = $res;
                $data["staus"] = 200;
                $data["msg"] = "登录成功";
                $data["data"] = $memberData;
            }
        }
        return  json_encode($data);
    }
}
