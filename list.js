var apprenant;
const url_link = window.location.search;
const url_param = new URLSearchParams(url_link);
var pro = url_param.get("pro");


var list = document.getElementById("Liste_apprenants");
connexion = new XMLHttpRequest();
connexion.open("GET","recuperer.php?pro2="+pro+"");
connexion.send();
connexion.onload=function(){
    
    if(connexion.readyState===XMLHttpRequest.DONE && connexion.status == 200){
        apprenant=JSON.parse(connexion.responseText);
        apprenant.forEach(element => {
            var container_1 = document.createElement("div");
            container_1.className="container_1";
            var cercl_img = document.createElement("div");
            cercl_img.className="cercl_img";
            var image_ap =document.createElement("img");
            image_ap.src=element.Photo;
            var nom_prenom =document.createElement("div");
            nom_prenom.className="nom_prenom";
            var nom = document.createElement("p");
            nom.innerHTML="Nom : "+element.NomApprenant;
            var prenom = document.createElement("p");
            prenom.innerHTML = "Prenom :"+element.PrenomApprenant;
            var Telelephone= document.createElement("p");
            Telelephone.innerHTML ="Telephone :"+element.Tel;
            var icon_info = document.createElement("div");
            icon_info.className="icon_info";
            var a = document.createElement("a");
            var img = document.createElement("img");
            img.src="icon/info-solid.svg";
            
            a.href="detail.html?info="+element.idApprenant+"";
            a.appendChild(img);
            container_1.appendChild(cercl_img);
            nom_prenom.appendChild(nom);
            nom_prenom.appendChild(prenom);
            nom_prenom.appendChild(Telelephone);
            container_1.appendChild(nom_prenom);
            icon_info.appendChild(a);
            cercl_img.appendChild(image_ap);
            container_1.appendChild(icon_info);
            list.appendChild(container_1);
            a.addEventListener("click",e=>{
                sessionStorage.setItem("promo",pro);
            });
            
        });
    }
}