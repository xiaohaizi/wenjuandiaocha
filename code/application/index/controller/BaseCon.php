<?php

namespace app\index\controller;

use think\Controller;

class BaseCon extends Controller
{
    public function _initialize()
    {
        parent::_initialize();

    }



      /**
     *  数据分页
     */
    public function page($where = [], $page_count = 15, $_tableName = "", $order = "", $_with = "", $group = "", $filed = "*")
    {

        if (empty($_tableName)) {
            $_tableName = $this->tableName;
        }

        $model = model($_tableName);
        if (!empty($where)) {
            $model = $model->where($where);
        }
        if (!empty($group)) {
            $model = $model->group($group);
        }
        if (!empty($_with)) {
            $model = $model->with($_with);
        }
        if (empty($order)) {
            $order = "id desc";
        }
        $data = [];
        if (empty($_tableName)) {
            return $data;
        }     
        $data_list = $model->field($filed)->order($order)->paginate($page_count);
        
        $data["data_list"] = $data_list;
        $page = $data_list->render();
        $data["page"] = $page;
        $this->assign($data);
        return $data;

    }
}