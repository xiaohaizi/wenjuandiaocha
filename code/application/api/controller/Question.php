<?php

namespace app\api\controller;

class Question
{
    public function GetList()
    {
        $data["list"] = [];

        $question = model("Question");
        $answer = model("Answers");
        $question_bank_id = 8;
        $q_list = $question->where(["question_bank_id" => $question_bank_id])->field("id as qid,title as  qtitle")->orderRaw("RAND()")->limit(10)->select();
        $q_ids=array_column(  $q_list,"qid");
        $an_list = $answer->where(["question_bank_id" => $question_bank_id,"question_id"=>array("in",$q_ids)])->field("id ,content,question_id,is_right")->order("id  desc")->select();

        foreach ($q_list as  $q_key => $q_item) {
            $question_items = [];
            $question_items["ProblemTitle"] = $q_item["qtitle"];
            $question_items["qid"] = $q_item["qid"];
            foreach ($an_list as  $a_key => $an_item) {
                if ($an_item["question_id"] == $q_item["qid"]) {
                    $an_item_arr = [];
                    $an_item_arr["Id"] = $an_item["id"];
                    $an_item_arr["OptionsContent"] = $an_item["content"];
                    $an_item_arr["flag"] = $an_item["is_right"];
                    $an_item_arr["question_id"] = $an_item["question_id"];
                    $question_items["answers"][] = $an_item_arr;
                }
            }
            $data["list"][] = $question_items;
        }


        $data["success"] = true;
        echo json_encode($data);
    }


    public  function UserAnswer()
    {
        $data["success"] = true;
        $data["integral"] = 90;
        $data["status"] = 300;
        $data["msg"] = "操作错误";
        $post = input("param.");
        $phone =   $post["phone"];
        $member = model("Member");
        $answer_model = model("Answers");
        $record_model = model("Record");
        $member_info = $member->where(["phone" => $phone])->find();
        $result =$post["result"];// '[{"question_id":10,"answer_id":39},{"question_id":9,"answer_id":36},{"question_id":7,"answer_id":26},{"question_id":6,"answer_id":22},{"question_id":5,"answer_id":19},{"question_id":4,"answer_id":16},{"question_id":3,"answer_id":10},{"question_id":2,"answer_id":5},{"question_id":1,"answer_id":4}]';
        $result_arr = json_decode($result, true);
        $question_ids = array_column($result_arr, "question_id");
        $answers = array_column($result_arr, "answer_id", "question_id");
        $map["question_id"] = array("in", $question_ids);
        $map["is_right"] = 1;
        $answer_list =  $answer_model->where($map)->select();
        $error_count = 0;
        $right_count = 0;
        foreach ($answer_list as $a_item) {
            //echo $a_item["id"]."----------".$answers[$a_item["question_id"]]."<br/>";
            if ($a_item["id"] == $answers[$a_item["question_id"]]) {
                $right_count =   $right_count + 1;
            } else {
                $error_count = $error_count + 1;
            }
        }
        $recordData["question_bank_id"] = $answer_list[0]["question_bank_id"];
        $recordData["score"] = $right_count * 10;
        $recordData["member_id"] = $member_info["id"];
        $recordData["answer_info"] = $result;
        $recordData["error_count"] = $error_count;
        $recordData["right_count"] = $right_count;
        $res =  $record_model->save($recordData);
        if (!empty($res)) {
            $data["success"] = true;
            $data["integral"] = 90;
            $data["status"] = 200;
            $data["msg"] = "感谢参与";
            $data["record_id"] = $record_model->id;
        }
        echo json_encode($data);

        die;
    }


    public function record(){
        $record_id = input("param.record_id");
        $phone = input("param.phone");
        $record_model = model("Record");
        $member = model("Member");
     
        $data["status"] = 300;
        $data["msg"] = "暂无信息";
        $member_info = $member->where(["phone" => $phone])->find();
        $record_info= $record_model->where(["id"=>$record_id,"member_id"=>$member_info->id])->field("id ,score,create_time,error_count,right_count")->find();
        if(!empty($record_info)){
            $data["status"] = 200;
            $data["msg"] = "感谢参与";
            $data["data"]=   $record_info;
        }
        echo json_encode($data);
        die;
    }


    /**
     * 
     *
     * @return void
     */
    public  function  GetHistoryList(){
        $phone = input("param.phone");
        $record_model = model("Record");
        $member = model("Member");

        $data["status"] = 300;
        $data["msg"] = "暂无信息";
        $member_info = $member->where(["phone" => $phone])->find();
       // $record_list= $record_model->where(["member_id"=>$member_info->id])->field("id ,score,create_time,error_count,right_count")->select();
        $data["status"] = 200;
        $data["msg"] = "答题记录信息";
        $record_list = $record_model->where(["member_id"=>$member_info->id])->field("id ,score,create_time,error_count,right_count")->order("id desc")->paginate(15);
              
        foreach( $record_list as $key=>$item){
            $record_list[$key]["create_time"]=substr( $item["create_time"],0,10);
        }
        $data["data"] =   $record_list;
        echo json_encode($data);
        die;


    }
}
