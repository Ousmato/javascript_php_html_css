<?php
if($_SERVER["REQUEST_METHOD"] === "GET") {
    try{
        // Établissement de la connexion à la base de données MySQL
        $conn_mysql = new PDO("mysql:host=localhost;dbname=portail_odk","root", "");
        $conn_mysql->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Exécution de la requête SQL pour récupérer les données des apprenants
        $request = $conn_mysql->query("SELECT * FROM apprenants");
        $request->execute();

        // Récupération des résultats sous forme d'un tableau associatif
        $liste_apprenant = $request->fetchAll(PDO::FETCH_ASSOC);

        // Conversion du tableau en format JSON et envoi de la réponse
        echo json_encode($liste_apprenant);
    
    }catch(PDOException $e){
        
         // Gestion des erreurs de connexion à la base de données
        die("connection failed: " . $e->getMessage());
    }
}
?>