<?php

namespace app\index\controller;

class Answers extends BaseCon
{
    public $tableName="Answers";



    public  function detail(){
        $question_id=input("param.question_id");
        $answer= model("Answers");
       $data["data_list"]= $answer->where(["question_id"=>$question_id])->with("Question")->select();

        $this->assign($data);
       return view();

    }
}
