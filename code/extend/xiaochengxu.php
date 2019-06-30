<?php 
namespace app\extend;

use WXBizMsgCrypt;

include_once "wechtsdk/WXBizMsgCrypt.php";
class xiaochengxu
{
    public function userAuthSlogin()
    {
        $APPID="wx0cf77da4a4ca6b48";
        $AppSecret="7acf973066d3ce9c23c5f25624ec345a";
        $content = file_get_contents('php://input');
        $content=json_decode($content, true);
        $utoken=$content["utoken"];
        if (!empty($utoken)&&S($utoken)) {
            $result["success"]=1;
            $result['utoken']=$utoken;
            echo json_encode($result);
            exit();
        }
        $code=$content["code"];
        $encryptedData=$content["encryptedData"];
        $iv = $content['iv'];
        /*获取session_key*/
        $url = "https://api.weixin.qq.com/sns/jscode2session?appid=" . $APPID . "&secret=" . $AppSecret . "&js_code=" . $code . "&grant_type=authorization_code";
        $arr = $this->vget($url); // 一个使用curl实现的get方法请求
    
        $WxData = new WXBizDataCrypt($s_result['appid'], $s_result['session_key']);
        /*解密用户数据*/
        $errCode = $WxData->decryptData($encryptedData, $iv, $user_data);
        $wxap_key = md5(uniqid(md5(microtime(true)), true));
        $result=array();
        if ($errCode==0) {
            $user_data=json_decode($user_data, true);
            $result["success"]=1;
            $result['utoken']=$wxap_key;
            $user_id = $this->wxUserAdd($user_data);
            if ($user_id < 1 || empty($user_id)) {
                $result["success"]=-1;
                $result['errCode']=0;
                $result['msg']="获取用户信息出错！";
                echo json_encode($result);
                exit();
            }
            $user_data['uid']=$user_id;
            S($wxap_key, $user_data, 7200);
            echo json_encode($result);
            exit();
        } else {
            $result["success"]=-1;
            $result['errCode']=$errCode;
            $result['msg']="获取用户信息出错！";
            echo json_encode($result);
            exit();
        }
    }


    public function vget($url){
        $info=curl_init();
        curl_setopt($info,CURLOPT_RETURNTRANSFER,true);
        curl_setopt($info,CURLOPT_HEADER,0);
        curl_setopt($info,CURLOPT_NOBODY,0);
        curl_setopt($info,CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($info,CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($info,CURLOPT_URL,$url);
        $output= curl_exec($info);
        curl_close($info);
        return $output;
      }
}