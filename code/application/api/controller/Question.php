<?php
namespace app\api\controller;

class Question
{
    public function GetList(){
        $data["list"]=[];
        $item1["ProblemTitle"]="题目1";
        $answers1["Id"]=1;
        $answers1["OptionsContent"]="题目1-答案1";

        $answers2["Id"]=2;
        $answers2["OptionsContent"]="题目1-答案2";

        $answers3["Id"]=3;
        $answers3["OptionsContent"]="题目1-答案3";

        $answers4["Id"]=4;
        $answers4["OptionsContent"]="题目1-答案5";
       
        $item1["answers"][]= $answers1;
        $item1["answers"][]= $answers2;
        $item1["answers"][]= $answers3;
        $item1["answers"][]= $answers4;


        $item2["ProblemTitle"]="题目2";
        $answers5["Id"]=5;
        $answers5["OptionsContent"]="题目2-答案1";

        $answers6["Id"]=6;
        $answers6["OptionsContent"]="题目2-答案2";

        $answers7["Id"]=7;
        $answers7["OptionsContent"]="题目2-答案3";

        $answers8["Id"]=8;
        $answers8["OptionsContent"]="题目2答案4";
       
        $item2["answers"][]= $answers5;
        $item2["answers"][]= $answers6;
        $item2["answers"][]= $answers7;
        $item2["answers"][]= $answers8;




        $item3["ProblemTitle"]="题目3";
        $answers9["Id"]=9;
        $answers9["OptionsContent"]="题目3-答案1";

        $answers10["Id"]=10;
        $answers10["OptionsContent"]="题目3-答案2";

        $answers11["Id"]=11;
        $answers11["OptionsContent"]="题目3-答案3";

        $answers12["Id"]=12;
        $answers12["OptionsContent"]="题目3-答案5";
       
        $item3["answers"][]= $answers9;
        $item3["answers"][]= $answers10;
        $item3["answers"][]= $answers11;
        $item3["answers"][]= $answers12;



        $item4["ProblemTitle"]="题目4";
        $answers13["Id"]=13;
        $answers13["OptionsContent"]="题目4-答案1";

        $answers14["Id"]=14;
        $answers14["OptionsContent"]="题目4-答案2";

        $answers15["Id"]=15;
        $answers15["OptionsContent"]="题目4-答案3";

        $answers16["Id"]=16;
        $answers16["OptionsContent"]="题目4-答案5";
       
        $item4["answers"][]= $answers13;
        $item4["answers"][]= $answers14;
        $item4["answers"][]= $answers15;
        $item4["answers"][]= $answers16;




        $data["list"][]=$item1;
        $data["list"][]=$item2;
        $data["list"][]=$item3;
        $data["list"][]=$item4;
        $data["success"]=true;
        echo json_encode($data);

    }


    public  function UserAnswer(){
        $data["success"]=true;
        $data["integral"]=90;
        $data["msg"]="感谢参与";

        echo json_encode($data);
        
        
    }
}


