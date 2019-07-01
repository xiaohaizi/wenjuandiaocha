<?php

namespace app\api\controller;

use think\Controller;

class Answer extends Controller
{
    public  function error_info(){
        $phone=input("param.phone");
        $record_id=input("param.record_id");
        $data["status"]=300;
        $data["msg"]="暂无数据";
        if(empty($phone)){
            echo json_encode($data);
            die;
        }
        if(empty($record_id)){
            echo json_encode($data);
            die;
        }
        $record_model = model("Record");
        $member = model("Member");
        $questionModel = model("Question");
        $member_info = $member->where(["phone" => $phone])->find();
        if(empty($member_info)){
            echo json_encode($data);
            die;
        }

        $record_info = $record_model->where(["id" => $record_id, "member_id" => $member_info->id])->find();
        if(empty($record_info)){
            echo json_encode($data);
            die;
        }
        $question_info=json_decode($record_info->answer_info,true);

        
        $q_ids=array_column( $question_info,"question_id");
        $answer_ids=array_column( $question_info,"answer_id","question_id");
        $q_map["id"]=array("in",$q_ids);
        $q_list= $questionModel->where($q_map)->with("Answer")->order("id desc")->select();

        foreach($q_list as $q_key=>$q_item){
            $user_answer_ids=[];
           // array_merge($user_answer_ids,$answer_ids[$q_item["id"]]);
       
           if(!is_array($answer_ids[$q_item["id"]])){
            $user_answer_ids[]= $answer_ids[$q_item["id"]];
           }else {
            $user_answer_ids= $answer_ids[$q_item["id"]];
           }
           
            $q_list[$q_key]["user_answer"]=$answer_ids[$q_item["id"]];
            $q_list[$q_key]["right_answer"]=array_column($q_item["Answer"],"id");
            $q_list[$q_key]["choose_abc"]="";
                foreach($q_item["Answer"] as $an_item){
                   
                    if( in_array($an_item["id"], $user_answer_ids)){
                       $an_title= trim($an_item["content"]);
                       $an_title=preg_replace('# #','',$an_title);
                        $q_list[$q_key]["choose_abc"]= $q_list[$q_key]["choose_abc"].",".mb_substr($an_title,0,1);
                    }
                }
                $q_list[$q_key]["choose_abc"]=ltrim(rtrim( trim($q_list[$q_key]["choose_abc"]),","),",");
        }

        $data["status"]=300;
        $data["msg"]="暂无数据";
        $data["data"]=$q_list;
        echo  json_encode($data);
        die;
       // $q_ids=

    }
}