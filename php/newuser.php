<?php

    $clientTime = $_GET['clientTime'];
    if($clientTime){

        $con = mysql_connect("localhost", "root", "v4SedDEVesTrHp3B");

        if($con){

            mysql_select_db("mysql", $con);

            $serverTime = time();

            $sql = "INSERT INTO `analytics`(`clientTime`, `serverTime`) VALUES ('$clientTime','$serverTime')";
            echo $sql;
            $result = mysql_query($sql);
            if($result){
                echo "success";
            }
            else{
                echo "error";
            }
        }
        else{
            die('Could not connect: ' . mysql_error());
        }

    }



//    $sql = "insert into "
/*
    $sql = "SELECT * FROM `analytics`";
    $result = mysql_query($sql);

    while($row = mysql_fetch_array($result)){
        echo $row['id'];
        echo $row['newusercount'];
    }
    echo "select db result====";
    echo $result;
//    mysql_query("INSERT INTO analytics()", $con);
*/
?>