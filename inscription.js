// Attacher un événement "click" à l'élément avec l'ID "profile"
document.getElementById("profile").addEventListener("click",e=>{
    // Simuler un clic sur l'élément avec l'ID "file"
    document.getElementById("file").click();

     // Créer un lecteur de fichiers
    const reader = new FileReader();

    // Récupérer les références vers les éléments du formulaire
    const fileInput = document.getElementById("file");
    const imag = document.getElementById("profile");

    // Attacher un événement "change" à l'élément avec l'ID "file"
    fileInput.addEventListener("change", e =>{
        // Récupérer le premier fichier sélectionné
        const f=e.target.files[0];

        // Lire le contenu du fichier en tant qu'URL de données
        reader.readAsDataURL(f);
    });
    // Attacher un événement "load" au lecteur de fichiers
    reader.onload = e =>{
        // Définir la source de l'image du profil avec l'URL de données du fichier
        imag.src = e.target.result;
    }
    });

// Définir la fonction "onSubmit"
function onSubmit(){
    // Récupérer les références vers les champs du formulaire
    var nom= document.getElementById("nom");
    var prenom = document.getElementById("prenom");
    var telephone = document.getElementById("telephone");
    var email = document.getElementById("email");
    var age = document.getElementById("age");
    var promotion = document.getElementById("promotion");
    var naissance = document.getElementById("naissance");
    var annee_certification = document.getElementById("annee_certification");
    var file = document.getElementById("file");
    
    // Vérifier si aucun fichier n'est sélectionné
    if(file.value==""){
        // Mettre en surbrillance l'image du profil en rouge
        document.getElementById("profile").style="border: 1px solid red;";
         // Jouer un son d'erreur
        var audio = new Audio();
        audio.src = "son/Windows error.mp3"; 
        audio.play();
            // Retourner pour empêcher l'envoi du formulaire
            return;
        
    }

    // Vérifier le champ du nom
    if(nom.value==""||(nom.value.length<2)){
         // Afficher un message d'erreur à côté du champ du nom
        document.getElementById("codeErreur_nom").innerHTML="Non valide";
        // Mettre en surbrillance le champ du nom en rouge
        document.getElementById("nom").style="border: 1px solid red;";
        // Jouer un son d'erreur
        var audio = new Audio();
        audio.src = "son/Windows error.mp3";
        audio.play();
        return;
    }

    if(prenom.value==""||(prenom.value.length<2)){
        document.getElementById("codeErreur_prenom").innerHTML="Non valide";
        document.getElementById("prenom").style="border: 1px solid red;";
        return;
    }

    if(telephone.value==""||(telephone.value.length<8) || (telephone.value.length>8)){
        document.getElementById("codeErreur_tel").innerHTML="Non valide";
        document.getElementById("telephone").style="border: 1px solid red;";
        var audio = new Audio();
        audio.src = "son/Windows error.mp3";
        audio.play();
        return;
    }

    //var expressionReguliere = /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
    if(email.value==""){
        document.getElementById("codeErreur_mail").innerHTML="Non valide";
        document.getElementById("email").style="border: 1px solid red;";
        var audio = new Audio();
        audio.src = "son/Windows error.mp3";
        audio.play();
        return;
    }

    if(age.value==""||(age.value.length<2) || (age.value.length>2) ){
        document.getElementById("codeErreur_age").innerHTML="Non valide";
        document.getElementById("age").style="border: 1px solid red;";
        var audio = new Audio();
        audio.src = "son/Windows error.mp3";
        audio.play();
        return;
    }

    if(promotion.value == ""|| (promotion.value.length<2 || promotion.value.length > 2) ){
        document.getElementById("codeErreur_prom").innerHTML="Non valide";
        document.getElementById("promotion").style="border: 1px solid red;";
        var audio = new Audio();
        audio.src = "son/Windows error.mp3";
        audio.play();
        return;
    }
  
  if (((new Date().getFullYear()-new Date(naissance.value).getFullYear()))!=age.value) {
        document.getElementById("codeErreur_naissance").innerHTML="Non valide";
        document.getElementById("naissance").style="border: 1px solid red;";
        var audio = new Audio();
        audio.src = "son/Windows error.mp3";
        audio.play();
        return;
  }

    if(annee_certification.value=""||(annee_certification.value.length<4)|| (annee_certification.value.length>4)){
        document.getElementById("codeErreur_annee").innerHTML="Non valide";
        document.getElementById("annee_certification").style="border: 1px solid red;";
        var audio = new Audio();
        audio.src = "son/Windows error.mp3";
        audio.play();
        return;
    }

    var audio = new Audio();
        audio.src = "son/success.mp3";
        audio.play();

        // Créer une instance de requête XMLHttpRequest
    connexion = new XMLHttpRequest();

    // Ouvrir une connexion POST vers le script PHP "inscription.php"
    connexion.open("POST","inscription.php");

    // Créer un objet FormData et ajouter les valeurs des champs du formulaire
    formData = new FormData();
    formData = new FormData();
    formData.append(nom.name,nom.value);
    formData.append(prenom.name,prenom.value);
    formData.append(telephone.name,telephone.value);
    formData.append(email.name,email.value);
    formData.append(age.name,age.value);
    formData.append(promotion.name,promotion.value);
    formData.append(naissance.name,naissance.value);
    formData.append(annee_certification.name,annee_certification.value);
    
    // Ajouter le fichier sélectionné à l'objet FormData
    formData.append(file.name,file.files[0]);
    
    // Envoyer les données du formulaire via la requête XMLHttpRequest
    connexion.send(formData);

    // Écouter l'événement "load" de la requête XMLHttpRequest
    connexion.onload = function(){

        // Vérifier si la requête est terminée avec succès (statut 200)
        if(connexion.readyState === XMLHttpRequest.DONE && connexion.status == 200){
            
             // Réinitialiser le formulaire
            document.getElementById("form").reset();

            // Réinitialiser l'image du profil
            document.getElementById("profile").src="image/png-transparent-user-profile-computer-icons-login-consultant-others-removebg-preview (1).png";
            
            // Afficher une boîte de dialogue avec la réponse du serveur
            alert(connexion.responseText);
        }else{
            // Afficher une boîte de dialogue d'erreur
            alert("error");
        }
    } 
}
