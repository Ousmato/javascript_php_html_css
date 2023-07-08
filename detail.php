<?php
if($_SERVER["REQUEST_METHOD"] === "GET"){
    $detaille=$_GET["detail"];

    try{
        $con_mysql=new PDO("mysql:host=localhost;dbname=portail_odk","root","");
        $con_mysql->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $request=$con_mysql->query ("SELECT * FROM apprenants WHERE idApprenant=  '" . $detaille . "'");

        $detail_apprenant =$request->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($detail_apprenant);

    }catch(PDOException $e){
        die("connection failed: " . $e->getMessage());

    }
}
?>