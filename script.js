// Récupérer le pseudo
let pseudo = localStorage.getItem("pseudo");

// Vérifier la connexion
if (pseudo == null) {

    window.location.href = "connexion.html";

} else {

    document.getElementById("pseudo-display").innerHTML = pseudo;

}


// Points du joueur
let points = 150;


// Tableau du panier
let panier = [];


// Afficher les points
document.getElementById("points-display").innerHTML = points;


// Ajouter une carte
function ajouterPanier(id, nom, prix) {

    let carte = {

        id: id,
        nom: nom,
        prix: prix

    };

    panier.push(carte);

    alert(nom + " ajouté au panier !");

    afficherPanier();

}


// Afficher le panier
function afficherPanier() {

    let contenu = "";

    let total = 0;

    for (let i = 0; i < panier.length; i++) {

        contenu += "<div class='carte'>";

        contenu += "<h3>" + panier[i].nom + "</h3>";

        contenu += "<p>Prix : " + panier[i].prix + " points</p>";

        contenu += "<button onclick='retirerPanier(" + i + ")'>Retirer</button>";

        contenu += "</div>";

        total = total + panier[i].prix;

    }

    if (panier.length == 0) {

        contenu = "<p>Ton panier est vide.</p>";

    }

    document.getElementById("panier").innerHTML = contenu;

    document.getElementById("total").innerHTML = total;

}




// Valider le panier
function validerPanier() {

    let total = 0;

    for (let i = 0; i < panier.length; i++) {

        total = total + panier[i].prix;

    }

    if (panier.length == 0) {

        alert("Ton panier est vide !");

    } else if (points >= total) {

        points = points - total;

        document.getElementById("points-display").innerHTML = points;

        alert("Commande validée !");

        panier = [];

        afficherPanier();

    } else {

        alert("Tu n'as pas assez de points !");

    }

}


// Déconnexion
function deconnexion() {

    localStorage.removeItem("pseudo");

    window.location.href = "connexion.html";

}


// Afficher le panier au démarrage
afficherPanier();