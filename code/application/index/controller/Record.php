<?php

namespace app\index\controller;

class Record extends BaseCon
{
    public $tableName="Record";


    public  function index(){

        $this->page([],15,$this->tableName,"id desc","Member");

        return  view();        
    }


    public  function rank(){

        $record_model = model("Record");
        
        $data_list=  $record_model->where("1=1")->with("Member")->field("MAX(score) as mscore, member_id,create_time")->group("member_id")->order("mscore desc, id asc")->paginate(15);
    
        $data["data_list"] = $data_list;
        $page = $data_list->render();
        $data["page"] = $page;
        $data["current_page"]=intval(json_decode( json_encode($data_list),true)["current_page"]);
        if($data["current_page"]>0){
            $data["current_page"]=$data["current_page"]-1;
        }
        $this->assign($data);
       return view();

    }
}