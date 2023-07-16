var detaille;
const url_link = window.location.search;
const url_param = new URLSearchParams(url_link);
var info = url_param.get("info");

var list_detail=document.getElementById("detail_apprenant");
connexion=new XMLHttpRequest();
connexion.open("GET", "detail.php?detail="+info+"");
connexion.send();
connexion.onload=function(){

    if(connexion.readyState===XMLHttpRequest.DONE && connexion.status==200){
        
        detaille=JSON.parse(connexion.responseText);
        detaille.forEach(element => {
            var container = document.createElement("div");
            container.className="container";
            var container_1 = document.createElement("div");
            container_1.className="container_1";
            var cercl_img = document.createElement("div");
            cercl_img.className="cercl_img";
            var image_ap =document.createElement("img");
            image_ap.src=element.Photo;
            var nom_prenom =document.createElement("div");
            nom_prenom.className="nom_prenom";
            var matricule = document.createElement("p");
            matricule.innerHTML="Matricule : "+element.Matricule;
            var nom = document.createElement("p");
            nom.innerHTML="Nom : "+element.NomApprenant;
            var prenom = document.createElement("p");
            prenom.innerHTML = "Prenom : "+element.PrenomApprenant;
            var Telelephone= document.createElement("p");
            Telelephone.innerHTML ="Telephone :"+element.Tel;
            var email = document.createElement("p");
            email.innerHTML="Email : "+element.Email;
            var age = document.createElement("p");
            age.innerHTML="Age : "+element.Age;
            var promotion = document.createElement("p");
            promotion.innerHTML="Promotion : "+element.Promotion;
            var annee_certicat=document.createElement("p");
            annee_certicat.innerHTML="Année de certification : "+element.Annee_certification;
            var icon_info = document.createElement("div");
            icon_info.className="icon_info";
            var a = document.createElement("a");
            a.href="list.html?pro="+sessionStorage.getItem("promo");
            
            var img = document.createElement("img");
            img.src="icon/arrow-rotate-left-solid.svg";
            a.appendChild(img);
            container_1.appendChild(cercl_img);
            nom_prenom.appendChild(matricule);
            nom_prenom.appendChild(prenom);
            nom_prenom.appendChild(nom);
            nom_prenom.appendChild(Telelephone);
            nom_prenom.appendChild(email);
            nom_prenom.appendChild(age);
            nom_prenom.appendChild(promotion);
            nom_prenom.appendChild(annee_certicat);
            container_1.appendChild(nom_prenom);
            icon_info.appendChild(a);
            cercl_img.appendChild(image_ap);
            container_1.appendChild(icon_info);
            list_detail.appendChild(container_1);
            
            
        });
    }
        
    
}
