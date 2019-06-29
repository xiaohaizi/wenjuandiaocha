<?php

namespace app\index\controller;

class Question extends BaseCon
{
    public $tableName="Question";

    public  function index(){

        $this->page();
        return view();
    }


    public  function add(){
        if (request()->instance()->isPost()) {

            $data["status"] = 300;
            $data["msg"] = "操作失败";
            $post = input("param.");
            $q_data["title"]= $post["title"];
            $q_data["question_bank_id"]=$post["question_bank_id"];
            $q_data["sort"]=$post["sort"];         
            //answer_title   answer_right
           $answer_titles = $post["answer_title"];
           $answer_rights =[];
           if(!empty($post["answer_right"])){
            $answer_rights = $post["answer_right"];
           }
        
            $question = model("Question");
            $answer_list=[];
            $res =  $question->save($q_data);
            if (!empty($res)) {
                $answers = model("Answers");
                $data["status"] = 200;
                $data["msg"] = "添加成功";
           
                foreach($answer_titles as  $key=>$item){
                    $an_item["question_id"]= $question->id;
                    $an_item["question_bank_id"]=intval($post["question_bank_id"]);
                    $an_item["is_right"]=0;
                    if(!empty( $answer_rights[$key])){
                        $an_item["is_right"]=intval($answer_rights[$key]);
                    }                  
                    $an_item["content"]=$answer_titles[$key];
                    $answer_list[]=$an_item;                 
                }
                if(!empty($answer_list))
                {
                    $answers ->saveAll($answer_list);
                }
              
            }
            echo json_encode($data);
            die;
        }
        $questionBank = model("QuestionBank");
        $qb_list= $questionBank->where(["is_delete"=>0])->order("id desc")->field("id,title")->select();
        
        $data["qb_list"]=$qb_list;
        $this->assign($data);
        return view();
  
    }


    public  function  delete(){
        $id =   input('param.id');
        $data["status"] = 300;
        $data["msg"] = "操作失败";
        $question = model("Question");
        $res = $question->where(["id" => $id])->delete();
        if (!empty($res)) {
            $answer= model("Answers");
            $answer->where(["question_id"=>$id])->delete();
            $data["status"] = 200;
            $data["msg"] = "删除成功";
        }

        echo json_encode($data);
        die;
    }
}