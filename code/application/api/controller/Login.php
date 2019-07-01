<?php

namespace app\api\controller;


class Login
{
    public  function LoginIn()
    {
        $APPID = "wx0cf77da4a4ca6b48";
        $AppSecret = "7acf973066d3ce9c23c5f25624ec345a";
        $code = input("param.code");
        $url = "https://api.weixin.qq.com/sns/jscode2session?appid=" . $APPID . "&secret=" . $AppSecret . "&js_code=" . $code . "&grant_type=authorization_code";
        $arr = $this->vget($url); // 一个使用curl实现的get方法请求
        $arr = json_decode($arr, true);
        
        $data["id"] = 0;
        $data["success"] = true;
        $data["phone"] = "";
        $data["company"] = "";
        $data["realname"] = "";
        $data["wechat_openid"] = "";
        if (!empty($arr)) {
            $data["wechat_openid"] = trim($arr["openid"]);

            $member = model("Member");
            $info =  $member->where(["wechat_openid" =>  trim($arr["openid"])])->find();

            if (!empty($info)) {
                $data["id"] = $info->id;
                $data["phone"] = $info->phone;
                $data["company"] = $info->company;
                $data["realname"] = $info->realname;
            }
        }

        return json_encode($data);
    }

    public function vget($url)
    {
        $info = curl_init();
        curl_setopt($info, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($info, CURLOPT_HEADER, 0);
        curl_setopt($info, CURLOPT_NOBODY, 0);
        curl_setopt($info, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($info, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($info, CURLOPT_URL, $url);
        $output = curl_exec($info);
        curl_close($info);
        return $output;
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
            $open_id=$post["wechat_openid"];
            $memberData =  $member->where(["phone" => $post["phone"]])->field('id,phone,realname,company,wechat_openid')->find();
           
           if(strlen($open_id)<11){
            $open_id="";
            $post["wechat_openid"]="";
           }
           $post["phone"]=trim($post["phone"]);
          
            if (empty($memberData)) {
                $member->where(["wechat_openid" => $open_id])->setField(["wechat_openid"=>""]);
                $res =  $member->save($post);
                $post["id"] = $member->id;
                $data["staus"] = 200;
                $data["msg"] = "登录成功";
                $data["data"] = $post;
            } else {
                if($memberData->wechat_openid!=$open_id&&strlen($open_id)>10){   
                    $member->where(["wechat_openid" => $open_id])->setField(["wechat_openid"=> ""]);              
                    $member->where(["phone" => $post["phone"]])->setField(["wechat_openid"=> $open_id]);      
                }                
                $member->where(["phone" =>$post["phone"]])->setField(["realname"=>trim($post["realname"]),"company"=>trim($post["company"])]);
                $post["id"] = $res;
                $data["staus"] = 200;
                $data["msg"] = "登录成功";
                $data["data"] = $memberData;
            }
        }
        return  json_encode($data);
    }
}
