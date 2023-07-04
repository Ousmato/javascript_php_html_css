<?php

$dosier = "img_apprenant/";
$conn_mysql;

// Vérifie si toutes les variables nécessaires sont présentes dans la requête POST
if(isset($_POST["nom"]) && isset($_POST["prenom"]) && isset($_POST["telephone"]) && isset($_POST["email"]) && isset($_POST["age"])
 && isset($_POST["promotion"]) && isset($_POST["naissance"]) && isset($_POST["annee_certification"])
   && isset($_FILES["image"])){
    
    // Extraction des données de la requête POST et assignation aux variables correspondantes
    $nom = $_POST['nom'];
    $prenom = $_POST['prenom'];
    $telephone = $_POST['telephone'];
    $email = $_POST['email'];
    $age = $_POST['age'];
    $promotion = $_POST['promotion'];
    $naissance = $_POST['naissance'];
    $annee_certification = $_POST['annee_certification'];

    try{
        // Connexion à la base de données MySQL
        $conn_mysql = new PDO("mysql:host=localhost;dbname=portail_odk","root", "");
        $conn_mysql->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Construction du chemin de destination de l'image
        $cheminPhoto = strtolower($dosier.$nom.".".pathinfo($_FILES["image"]["name"],PATHINFO_EXTENSION));

        // Déplacement de l'image téléchargée vers le dossier de destination
        if(move_uploaded_file($_FILES["image"]["tmp_name"],$cheminPhoto)){
            $photo = "http://localhost/Inscription/".$cheminPhoto;
            
            
            // Préparation et exécution de la requête SQL d'insertion des données de l'apprenant
            $query = $conn_mysql->prepare("INSERT INTO apprenants(idApprenant, NomApprenant, PrenomApprenant, Email, Age,
            Tel, Date_naissance, Promotion, Annee_certification, Matricule, Photo, idAdmin) 
            VALUES(:idApprenant, :NomApprenant, :PrenomApprenant,
            :Email, :Age, :Tel, :Date_naissance, :Promotion, :Annee_certification, :Matricule, :Photo, :idAdmin)");

            // Génération d'un matricule unique pour l'apprenant
            $matricule = $promotion.mt_rand(1111, 9999);
            $idApprenant = null;
            $idAdmin = 1;

            // Attribution des valeurs aux paramètres de la requête et exécution de la requête
            $query->execute([
                ":idApprenant"=>$idApprenant,
                ":NomApprenant"=>$nom,
                ":PrenomApprenant"=>$prenom,
                ":Email"=>$email,
                ":Age"=>$age,
                ":Tel"=>$telephone,
                ":Date_naissance"=>$naissance,
                ":Promotion"=>$promotion,
                ":Annee_certification"=>$annee_certification,
                ":Matricule"=>$matricule,
                ":Photo"=>$photo,
                ":idAdmin"=>$idAdmin
            ]);

            // Affichage d'un message de succès
            echo "l'enregistrement éffectuée";
        }else{
            // Affichage d'un message d'erreur si le déplacement de l'image a échoué
            echo "erreur d'enregistrement";
        }
        
    }catch(PDOException $e){
         // Affichage d'un message d'erreur en cas de problème de connexion à la base de données
        echo "connection failed: " . $e->getMessage();
        die();
    }
  }else{
    // Affichage d'un message d'erreur si des données requises sont manquantes
    echo "erruer d";
  }

?>