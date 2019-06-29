<?php

namespace app\index\controller;

class Questionblank extends BaseCon
{
    public function index()
    {
        $question = model("QuestionBank");

        $data_list = $question->order("create_time  desc")->paginate(15);
        $data["data_list"] = $data_list;
        $page = $data_list->render();
        $data["page"] = $page;

        $this->assign($data);
        return view();
    }



    public  function add()
    {
        if (request()->instance()->isPost()) {
            $data["status"] = 300;
            $data["msg"] = "错误";
            $post = request()->instance()->post();
            $question = model("QuestionBank");
            $res =  $question->save($post);
            if (empty($res)) {
                $data["status"] = 200;
                $data["msg"] = "添加成功";
            }
            echo json_encode($data);
            die;
        }
        return view();
    }



    public  function delete()
    {
        $id =   input('param.id');
        $data["status"] = 300;
        $data["msg"] = "错误";
        $question = model("QuestionBank");
        $res = $question->where(["id" => $id])->delete();
        if (!empty($res)) {
            $data["status"] = 200;
            $data["msg"] = "删除成功";
        }

        echo json_encode($data);
        die;
    }


    public  function stop()
    {
        $data["status"] = 300;
        $data["msg"] = "操作错误";
        $id =   input('param.id');
        $status = input('param.status');
        $question = model("QuestionBank");
        $res = $question->where('id',   $id)->update(['is_delete' => $status]);

        if (!empty($res)) {
            $data["status"] = 200;
            $data["msg"] = "操作成功";
        }

        echo json_encode($data);
        die;
    }
}
